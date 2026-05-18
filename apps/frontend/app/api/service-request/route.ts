import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";
import {
  serviceRequestFormSchema,
  type ServiceRequestFormValues,
} from "@/app/services/serviceRequestFormSchema";

const FALLBACK_SERVICE_REQUEST_CHANNEL_ID = "C0B2A63CTM4";

function buildContactFields(values: ServiceRequestFormValues) {
  return [
    { type: "mrkdwn", text: `*first name:* ${values.firstName}` },
    { type: "mrkdwn", text: `*last name:* ${values.lastName}` },
    { type: "mrkdwn", text: `*work email:* ${values.workEmail}` },
    { type: "mrkdwn", text: `*phone:* ${values.phoneNumber}` },
    { type: "mrkdwn", text: `*company:* ${values.companyName}` },
    { type: "mrkdwn", text: `*address:* ${values.companyAddress}` },
  ];
}

function buildServiceFields(values: ServiceRequestFormValues) {
  return [
    { type: "mrkdwn", text: `*service:* ${values.serviceTitle}` },
    { type: "mrkdwn", text: `*price:* ${values.servicePrice || "Not provided"}` },
    { type: "mrkdwn", text: `*timeline:* ${values.serviceTimeline || "To be confirmed"}` },
    { type: "mrkdwn", text: `*payment terms:* ${values.paymentTerms || "Not provided"}` },
  ];
}

function getMissingSlackConfigMessage(keys: string[]) {
  return `Slack is not configured. Missing ${keys.join(", ")}.`;
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const parsedBody = serviceRequestFormSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    const firstIssue = parsedBody.error.issues[0];
    return NextResponse.json(
      {
        message: firstIssue?.message ?? "Invalid form submission.",
      },
      { status: 400 },
    );
  }

  const slackToken = process.env.SLACK_BOT_TOKEN;
  const slackChannelId = process.env.SLACK_SERVICE_REQUEST_CHANNEL_ID ?? FALLBACK_SERVICE_REQUEST_CHANNEL_ID;

  if (!slackToken || !slackChannelId) {
    const missingKeys = [!slackToken ? "SLACK_BOT_TOKEN" : null].filter(
      (value): value is string => Boolean(value),
    );

    logInternalError({
      context: "api/service-request:missing-slack-config",
      details: {
        hasSlackToken: Boolean(slackToken),
        hasSlackChannelId: Boolean(slackChannelId),
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: getMissingSlackConfigMessage(missingKeys),
          publicMessage: "We could not send your request right now. Please try again shortly.",
        }),
      },
      { status: 500 },
    );
  }

  const values = parsedBody.data;
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const userAgent = requestHeaders.get("user-agent") || "unknown";
  const rateLimitKey = `${ipAddress}:${values.workEmail.toLowerCase()}`;

  if (!rateLimit(rateLimitKey, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      {
        message: "Too many service requests. Please wait a minute and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
  }

  if (values.website) {
    return NextResponse.json({
      message: "Your request has been sent. We will reply shortly.",
    });
  }

  const slackResponse = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${slackToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      channel: slackChannelId,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `Service request from ${values.firstName} ${values.lastName}`,
          },
        },
        {
          type: "section",
          fields: buildServiceFields(values),
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*offer summary:* ${values.serviceSummary || "Not provided"}\n*offer link:* ${values.serviceLink}`,
          },
        },
        {
          type: "section",
          fields: buildContactFields(values),
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*project note:* ${values.notes || "No additional notes provided."}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*ip:* ${ipAddress}\n*user agent:* ${userAgent}`,
          },
        },
      ],
    }),
    cache: "no-store",
  });

  const slackPayload = (await slackResponse.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;

  if (!slackResponse.ok || !slackPayload?.ok) {
    const message =
      slackPayload?.error === "channel_not_found"
        ? "Slack channel not found. Check SLACK_SERVICE_REQUEST_CHANNEL_ID and make sure the Slack app is a member of that channel."
        : slackPayload?.error
          ? `Slack rejected the service request: ${slackPayload.error}`
          : "Slack rejected the service request.";

    logInternalError({
      context: "api/service-request:slack-post-failed",
      error: slackPayload,
      details: {
        status: slackResponse.status,
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: message,
          publicMessage: "We could not send your request right now. Please try again shortly.",
        }),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Your request has been sent. We will reply shortly.",
  });
}
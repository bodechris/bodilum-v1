import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/app/contact/contactFormSchema";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";
import { rateLimit } from "@/lib/rateLimit";

function buildSlackFields(values: ContactFormValues) {
  return [
    { type: "mrkdwn", text: `*first name:* ${values.firstName}` },
    { type: "mrkdwn", text: `*last name:* ${values.lastName}` },
    { type: "mrkdwn", text: `*email:* ${values.email}` },
    { type: "mrkdwn", text: `*company:* ${values.company || "Not provided"}` },
    { type: "mrkdwn", text: `*message:* ${values.message}` },
  ];
}

function getMissingSlackConfigMessage(keys: string[]) {
  return `Slack is not configured. Missing ${keys.join(", ")}.`;
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const parsedBody = contactFormSchema.safeParse(rawBody);

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
  const slackChannelId = process.env.SLACK_CONTACT_CHANNEL_ID;

  if (!slackToken || !slackChannelId) {
    const missingKeys = [
      !slackToken ? "SLACK_BOT_TOKEN" : null,
      !slackChannelId ? "SLACK_CONTACT_CHANNEL_ID" : null,
    ].filter((value): value is string => Boolean(value));

    logInternalError({
      context: "api/contact:missing-slack-config",
      details: {
        hasSlackToken: Boolean(slackToken),
        hasSlackChannelId: Boolean(slackChannelId),
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: getMissingSlackConfigMessage(missingKeys),
          publicMessage: "We could not send your message right now. Please try again shortly.",
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
  const rateLimitKey = `${ipAddress}:${values.email.toLowerCase()}`;

  if (!rateLimit(rateLimitKey, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      {
        message: "Too many contact requests. Please wait a minute and try again.",
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
      message: "Your message has been sent. We will reply shortly.",
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
            text: `Contact form submission from ${values.firstName} ${values.lastName}`,
          },
        },
        {
          type: "section",
          fields: buildSlackFields(values),
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
        ? "Slack channel not found. Check SLACK_CONTACT_CHANNEL_ID and make sure the Slack app is a member of that channel."
        : slackPayload?.error
          ? `Slack rejected the message: ${slackPayload.error}`
          : "Slack rejected the message.";

    logInternalError({
      context: "api/contact:slack-post-failed",
      error: slackPayload,
      details: {
        status: slackResponse.status,
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: message,
          publicMessage: "We could not send your message right now. Please try again shortly.",
        }),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Your message has been sent. We will reply shortly.",
  });
}
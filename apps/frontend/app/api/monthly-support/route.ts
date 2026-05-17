import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import {
  monthlySupportRequestFormSchema,
  type MonthlySupportRequestFormValues,
} from "@/app/monthly-support/monthlySupportFormSchema";

const FALLBACK_MONTHLY_SUPPORT_CHANNEL_ID = "C0B2A63CTM4";

function buildPrimaryFields(values: MonthlySupportRequestFormValues) {
  return [
    { type: "mrkdwn", text: `*business:* ${values.businessName}` },
    { type: "mrkdwn", text: `*industry:* ${values.industry}` },
    { type: "mrkdwn", text: `*brands/accounts:* ${values.brandCount}` },
    { type: "mrkdwn", text: `*expected requests:* ${values.expectedRequestsPerMonth}` },
    { type: "mrkdwn", text: `*budget:* ${values.budgetRange}` },
    { type: "mrkdwn", text: `*urgency:* ${values.urgency}` },
  ];
}

function buildContactFields(values: MonthlySupportRequestFormValues) {
  return [
    { type: "mrkdwn", text: `*email:* ${values.email}` },
    { type: "mrkdwn", text: `*whatsapp:* ${values.whatsapp}` },
    { type: "mrkdwn", text: `*website/social:* ${values.websiteOrSocialLink}` },
  ];
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const parsedBody = monthlySupportRequestFormSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    const firstIssue = parsedBody.error.issues[0];
    return NextResponse.json(
      { message: firstIssue?.message ?? "Invalid form submission." },
      { status: 400 },
    );
  }

  const slackToken = process.env.SLACK_BOT_TOKEN;
  const slackChannelId =
    process.env.SLACK_MONTHLY_SUPPORT_CHANNEL_ID ??
    process.env.SLACK_SERVICE_REQUEST_CHANNEL_ID ??
    FALLBACK_MONTHLY_SUPPORT_CHANNEL_ID;

  if (!slackToken || !slackChannelId) {
    return NextResponse.json(
      {
        message:
          "Slack is not configured. Set SLACK_BOT_TOKEN and SLACK_MONTHLY_SUPPORT_CHANNEL_ID.",
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
      { message: "Too many monthly support requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  if (values.website) {
    return NextResponse.json({ message: "Your request has been sent. We will reply shortly." });
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
            text: `Monthly support request from ${values.businessName}`,
          },
        },
        {
          type: "section",
          fields: buildPrimaryFields(values),
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*support types:* ${values.supportTypes.join(", ")}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*monthly needs:* ${values.monthlyDesignNeeds}`,
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
        ? "Slack channel not found. Check SLACK_MONTHLY_SUPPORT_CHANNEL_ID and make sure the Slack app is a member of that channel."
        : slackPayload?.error
          ? `Slack rejected the monthly support request: ${slackPayload.error}`
          : "Slack rejected the monthly support request.";

    return NextResponse.json({ message }, { status: 502 });
  }

  return NextResponse.json({
    message: "Your custom monthly support request has been sent. We will reply shortly.",
  });
}
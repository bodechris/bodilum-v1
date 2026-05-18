import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";
import { rateLimit } from "@/lib/rateLimit";

const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
  website: z.string().trim().max(0, "Invalid submission").optional().or(z.literal("")),
  source: z.string().trim().max(80).optional().default("footer"),
});

const fallbackNewsletterChannelId = "C0B35QRT6CQ";

function getMissingSlackConfigMessage(keys: string[]) {
  return `Slack is not configured. Missing ${keys.join(", ")}.`;
}

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const parsedBody = newsletterSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    const firstIssue = parsedBody.error.issues[0];
    return NextResponse.json(
      {
        message: firstIssue?.message ?? "Invalid newsletter submission.",
      },
      { status: 400 },
    );
  }

  const slackToken = process.env.SLACK_BOT_TOKEN;
  const slackChannelId = process.env.SLACK_NEWSLETTER_CHANNEL_ID ?? fallbackNewsletterChannelId;

  if (!slackToken || !slackChannelId) {
    const missingKeys = [!slackToken ? "SLACK_BOT_TOKEN" : null].filter(
      (value): value is string => Boolean(value),
    );

    logInternalError({
      context: "api/newsletter:missing-slack-config",
      details: {
        hasSlackToken: Boolean(slackToken),
        hasSlackChannelId: Boolean(slackChannelId),
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: getMissingSlackConfigMessage(missingKeys),
          publicMessage: "We could not process your signup right now. Please try again shortly.",
        }),
      },
      { status: 500 },
    );
  }

  const values = parsedBody.data;

  if (values.website) {
    return NextResponse.json({
      message: "You have been added to the Bodilum updates list.",
    });
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  const userAgent = requestHeaders.get("user-agent") || "unknown";
  const rateLimitKey = `${ipAddress}:${values.email.toLowerCase()}:newsletter`;

  if (!rateLimit(rateLimitKey, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      {
        message: "Too many signup attempts. Please wait a minute and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
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
            text: "New Bodilum newsletter signup",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*email:* ${values.email}`,
            },
            {
              type: "mrkdwn",
              text: `*source:* ${values.source}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*ip:* ${ipAddress}\n*user agent:* ${userAgent}`,
          },
        },
      ],
      text: `New Bodilum newsletter signup: ${values.email}`,
    }),
    cache: "no-store",
  });

  const slackPayload = (await slackResponse.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;

  if (!slackResponse.ok || !slackPayload?.ok) {
    const message =
      slackPayload?.error === "channel_not_found"
        ? "Slack channel not found. Check SLACK_NEWSLETTER_CHANNEL_ID and make sure the Slack app is a member of that channel."
        : slackPayload?.error
          ? `Slack rejected the newsletter signup: ${slackPayload.error}`
          : "Slack rejected the newsletter signup.";

    logInternalError({
      context: "api/newsletter:slack-post-failed",
      error: slackPayload,
      details: {
        status: slackResponse.status,
      },
    });

    return NextResponse.json(
      {
        message: getPublicErrorMessage({
          internalMessage: message,
          publicMessage: "We could not process your signup right now. Please try again shortly.",
        }),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "You have been added to the Bodilum updates list.",
  });
}
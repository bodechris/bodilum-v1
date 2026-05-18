import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getPayPalSubscriptionByInternalId,
  markPayPalSubscriptionApproved,
} from "@/lib/paypalSubscriptionStore";
import { getPayPalAccessToken, getPayPalBaseUrl } from "@/lib/paypal";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";

const subscriptionDetailsSchema = z.object({
  subscriptionId: z.string().trim().min(1),
  internalSubscriptionId: z.string().trim().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedParams = subscriptionDetailsSchema.safeParse({
      subscriptionId: searchParams.get("subscriptionId"),
      internalSubscriptionId: searchParams.get("internalSubscriptionId") || undefined,
    });

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: parsedParams.error.issues[0]?.message || "Invalid subscription lookup." },
        { status: 400 },
      );
    }

    const { subscriptionId, internalSubscriptionId } = parsedParams.data;
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          id?: string;
          status?: string;
          plan_id?: string;
          status_update_time?: string;
          subscriber?: { email_address?: string; name?: { given_name?: string; surname?: string } };
          custom_id?: string;
          plan_overridden?: boolean;
          start_time?: string;
          status_change_note?: string;
          name?: string;
          description?: string;
          details?: Array<{ description?: string }>;
        }
      | null;

    if (!response.ok || !payload?.id) {
      const internalMessage =
        payload?.details?.[0]?.description || "Could not load PayPal subscription details.";

      logInternalError({
        context: "api/paypal/subscription-details:paypal-lookup-failed",
        error: payload,
        details: {
          status: response.status,
          subscriptionId,
          internalSubscriptionId,
        },
      });

      return NextResponse.json(
        {
          error: getPublicErrorMessage({
            internalMessage,
            publicMessage:
              "We could not confirm your PayPal subscription right now. Please contact us if this continues.",
          }),
        },
        { status: 502 },
      );
    }

    if (internalSubscriptionId) {
      markPayPalSubscriptionApproved({
        internalSubscriptionId,
        paypalSubscriptionId: payload.id,
      });
    }

    const storedSubscription = internalSubscriptionId
      ? getPayPalSubscriptionByInternalId(internalSubscriptionId)
      : null;

    return NextResponse.json({
      subscriptionId: payload.id,
      status: payload.status || null,
      subscriberEmail: payload.subscriber?.email_address || null,
      subscriberName:
        [payload.subscriber?.name?.given_name, payload.subscriber?.name?.surname].filter(Boolean).join(" ") || null,
      planId: payload.plan_id || null,
      planKey: storedSubscription?.planKey || null,
      planTitle: storedSubscription?.planTitle || null,
      amountUsd: storedSubscription?.amountUsd ?? null,
      startTime: payload.start_time || null,
    });
  } catch (error) {
    logInternalError({
      context: "api/paypal/subscription-details:unhandled",
      error,
    });

    return NextResponse.json(
      {
        error: getPublicErrorMessage({
          internalMessage:
            error instanceof Error ? error.message : "Could not load PayPal subscription details.",
          publicMessage:
            "We could not confirm your PayPal subscription right now. Please contact us if this continues.",
        }),
      },
      { status: 500 },
    );
  }
}
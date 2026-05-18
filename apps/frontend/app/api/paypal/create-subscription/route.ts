import { NextResponse } from "next/server";
import { z } from "zod";
import {
  attachPayPalSubscriptionId,
  savePayPalSubscription,
} from "@/lib/paypalSubscriptionStore";
import {
  getPayPalAccessToken,
  getPayPalBaseUrl,
  getPayPalBrandName,
  getSiteUrl,
} from "@/lib/paypal";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";

const PLAN_DEFINITIONS = {
  "brand-care": {
    title: "Brand Care",
    priceUsd: 499,
    envKey: "PAYPAL_PLAN_ID_BRAND_CARE",
  },
  "campaign-support": {
    title: "Campaign Support",
    priceUsd: 999,
    envKey: "PAYPAL_PLAN_ID_CAMPAIGN_SUPPORT",
  },
  "creative-partner": {
    title: "Creative Partner",
    priceUsd: 1999,
    envKey: "PAYPAL_PLAN_ID_CREATIVE_PARTNER",
  },
} as const;

const planKeys = Object.keys(PLAN_DEFINITIONS) as Array<keyof typeof PLAN_DEFINITIONS>;

const createSubscriptionSchema = z.object({
  planKey: z.enum(planKeys),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => null);
    const parsedBody = createSubscriptionSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.issues[0]?.message || "Invalid subscription payload." },
        { status: 400 },
      );
    }

    const { planKey } = parsedBody.data;
    const planDefinition = PLAN_DEFINITIONS[planKey];
    const planId = process.env[planDefinition.envKey];

    if (!planId) {
      return NextResponse.json(
        {
          error: getPublicErrorMessage({
            internalMessage: `PayPal plan ID is missing. Set ${planDefinition.envKey} in apps/frontend/.env.local.`,
            publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
          }),
        },
        { status: 500 },
      );
    }

    const internalSubscriptionId = `BOD-SUB-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    savePayPalSubscription({
      internalSubscriptionId,
      planKey,
      planTitle: planDefinition.title,
      amountUsd: planDefinition.priceUsd,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        plan_id: planId,
        custom_id: internalSubscriptionId,
        application_context: {
          brand_name: getPayPalBrandName(),
          user_action: "SUBSCRIBE_NOW",
          return_url: `${getSiteUrl()}/payment/subscription/success?internalSubscriptionId=${internalSubscriptionId}`,
          cancel_url: `${getSiteUrl()}/payment/subscription/cancelled?internalSubscriptionId=${internalSubscriptionId}`,
        },
      }),
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          id?: string;
          details?: Array<{ description?: string }>;
          links?: Array<{ rel?: string; href?: string }>;
        }
      | null;

    if (!response.ok || !payload?.id) {
      const internalMessage =
        payload?.details?.[0]?.description || "Could not create PayPal subscription.";

      logInternalError({
        context: "api/paypal/create-subscription:paypal-create-failed",
        error: payload,
        details: {
          status: response.status,
          planKey,
        },
      });

      return NextResponse.json(
        {
          error: getPublicErrorMessage({
            internalMessage,
            publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
          }),
        },
        { status: 502 },
      );
    }

    attachPayPalSubscriptionId(internalSubscriptionId, payload.id);

    const approveUrl = payload.links?.find((link) => link.rel === "approve")?.href;

    if (!approveUrl) {
      return NextResponse.json(
        {
          error: getPublicErrorMessage({
            internalMessage: "PayPal approval link is missing from the subscription response.",
            publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
          }),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      internalSubscriptionId,
      paypalSubscriptionId: payload.id,
      approveUrl,
    });
  } catch (error) {
    logInternalError({
      context: "api/paypal/create-subscription:unhandled",
      error,
    });

    return NextResponse.json(
      {
        error: getPublicErrorMessage({
          internalMessage:
            error instanceof Error ? error.message : "Could not create PayPal subscription.",
          publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
        }),
      },
      { status: 500 },
    );
  }
}
import { NextResponse } from "next/server";
import { z } from "zod";
import { designDirectionData } from "@/app/design-direction/designDirectionData";
import { designRequestCheckoutSchema } from "@/app/design-direction/designRequestCheckoutSchema";
import {
  attachPayPalOrderId,
  savePayPalOrder,
  type StoredPayPalOrder,
} from "@/lib/paypalOrderStore";
import {
  getPayPalAccessToken,
  getPayPalBaseUrl,
  getPayPalBrandName,
  getSiteUrl,
} from "@/lib/paypal";
import { getPublicErrorMessage, logInternalError } from "@/lib/publicError";

const createOrderSchema = z.object({
  offerType: z.string().trim().min(1),
  offerName: z.string().trim().min(1),
  directionSlug: z.string().trim().min(1),
  directionTitle: z.string().trim().min(1),
  selectedDesignIndexes: z.array(z.number().int().nonnegative()).default([]),
  selectedMedia: z.array(z.string()).default([]),
  customerDetails: designRequestCheckoutSchema,
  userLocalValue: z.number().nonnegative().optional(),
  userCurrency: z.string().trim().min(1).optional(),
  customerNotes: z.string().trim().max(2000).default(""),
});

function getDirectionSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function parseUsdPrice(price: string) {
  const parsedPrice = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => null);
    const parsedBody = createOrderSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.issues[0]?.message || "Invalid order payload." },
        { status: 400 },
      );
    }

    const body = parsedBody.data;
    const direction = designDirectionData.find(
      (item) => getDirectionSlug(item.title) === body.directionSlug,
    );

    if (!direction) {
      return NextResponse.json({ error: "Design direction not found." }, { status: 404 });
    }

    const offer = direction.offers?.find((item) => item.name === body.offerName);

    if (!offer) {
      return NextResponse.json({ error: "Offer not found for this design direction." }, { status: 404 });
    }

    const pricePerUnitUsd = parseUsdPrice(offer.price);

    if (!pricePerUnitUsd) {
      return NextResponse.json({ error: "Offer price is not configured." }, { status: 400 });
    }

    const isSingleDesignOffer = offer.name === "single-design-customisation";
    const allowedDesignIndexes = new Set(offer.singleDesignGallery ?? []);

    if (isSingleDesignOffer && !body.selectedDesignIndexes.length) {
      return NextResponse.json(
        { error: "Select at least one design before continuing to PayPal." },
        { status: 400 },
      );
    }

    if (
      isSingleDesignOffer &&
      body.selectedDesignIndexes.some((index) => !allowedDesignIndexes.has(index))
    ) {
      return NextResponse.json(
        { error: "One or more selected designs are invalid for this direction." },
        { status: 400 },
      );
    }

    if (!isSingleDesignOffer && body.selectedDesignIndexes.length) {
      return NextResponse.json(
        { error: "This offer does not accept individual design selections." },
        { status: 400 },
      );
    }

    const selectedMedia = isSingleDesignOffer
      ? body.selectedDesignIndexes
          .map((index) => direction.media?.[index])
          .filter((item): item is string => typeof item === "string" && item.length > 0)
      : [];
    const amountUsd = isSingleDesignOffer
      ? body.selectedDesignIndexes.length * pricePerUnitUsd
      : pricePerUnitUsd;
    const internalOrderId = `BOD-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const storedOrder: StoredPayPalOrder = {
      internalOrderId,
      offerType: body.offerType,
      offerName: offer.name,
      directionSlug: body.directionSlug,
      directionTitle: direction.title,
      selectedDesignIndexes: body.selectedDesignIndexes,
      selectedMedia,
      customerDetails: {
        firstName: body.customerDetails.firstName,
        lastName: body.customerDetails.lastName,
        workEmail: body.customerDetails.workEmail,
        phoneNumber: body.customerDetails.phoneNumber || null,
        companyAddress: body.customerDetails.companyAddress || null,
        additionalNotes: body.customerDetails.additionalNotes || "",
      },
      userLocalValue: body.userLocalValue ?? null,
      userCurrency: body.userCurrency ?? null,
      customerNotes: body.customerNotes,
      amountUsd,
      currency: "USD",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    savePayPalOrder(storedOrder);

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: internalOrderId,
            custom_id: internalOrderId,
            description: `${body.directionTitle} - ${isSingleDesignOffer ? `${body.selectedDesignIndexes.length} selected design(s)` : offer.title}`,
            amount: {
              currency_code: "USD",
              value: amountUsd.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: amountUsd.toFixed(2),
                },
              },
            },
            items: [
              {
                name: body.directionTitle,
                description: offer.title,
                quantity: "1",
                category: "DIGITAL_GOODS",
                unit_amount: {
                  currency_code: "USD",
                  value: amountUsd.toFixed(2),
                },
              },
            ],
          },
        ],
        application_context: {
          brand_name: getPayPalBrandName(),
          user_action: "PAY_NOW",
          return_url: `${getSiteUrl()}/payment/success?internalOrderId=${internalOrderId}`,
          cancel_url: `${getSiteUrl()}/payment/cancelled?internalOrderId=${internalOrderId}`,
        },
      }),
      cache: "no-store",
    });

    const paypalOrder = (await response.json().catch(() => null)) as
      | {
          id?: string;
          details?: Array<{ description?: string }>;
          links?: Array<{ rel?: string; href?: string }>;
        }
      | null;

    if (!response.ok || !paypalOrder?.id) {
      const internalMessage =
        paypalOrder?.details?.[0]?.description || "Could not create PayPal order.";

      logInternalError({
        context: "api/paypal/create-order:paypal-create-failed",
        error: paypalOrder,
        details: {
          status: response.status,
          directionSlug: body.directionSlug,
          offerName: body.offerName,
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

    attachPayPalOrderId(internalOrderId, paypalOrder.id);

    const approveUrl = paypalOrder.links?.find((link) => link.rel === "approve")?.href;

    if (!approveUrl) {
      return NextResponse.json(
        {
          error: getPublicErrorMessage({
            internalMessage: "PayPal approval link is missing from the order response.",
            publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
          }),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      internalOrderId,
      paypalOrderId: paypalOrder.id,
      approveUrl,
    });
  } catch (error) {
    logInternalError({
      context: "api/paypal/create-order:unhandled",
      error,
    });

    return NextResponse.json(
      {
        error: getPublicErrorMessage({
          internalMessage: error instanceof Error ? error.message : "Could not create PayPal order.",
          publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
        }),
      },
      { status: 500 },
    );
  }
}
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getPayPalOrderByInternalId,
  getPayPalOrderByOrderId,
  markPayPalOrderPaid,
} from "@/lib/paypalOrderStore";
import { getPayPalAccessToken, getPayPalBaseUrl } from "@/lib/paypal";

const captureOrderSchema = z.object({
  orderId: z.string().trim().min(1),
  internalOrderId: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => null);
    const parsedBody = captureOrderSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.issues[0]?.message || "Invalid capture payload." },
        { status: 400 },
      );
    }

    const { orderId, internalOrderId } = parsedBody.data;
    const storedOrder =
      (internalOrderId ? getPayPalOrderByInternalId(internalOrderId) : null) ||
      getPayPalOrderByOrderId(orderId);

    if (storedOrder?.status === "paid") {
      return NextResponse.json({
        internalOrderId: storedOrder.internalOrderId,
        paypalOrderId: storedOrder.paypalOrderId,
        paypalCaptureId: storedOrder.paypalCaptureId,
        amountUsd: storedOrder.amountUsd,
        currency: storedOrder.currency,
        directionTitle: storedOrder.directionTitle,
        offerName: storedOrder.offerName,
        selectedDesignIndexes: storedOrder.selectedDesignIndexes,
        selectedMedia: storedOrder.selectedMedia,
        status: storedOrder.status,
      });
    }

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const capturePayload = (await response.json().catch(() => null)) as
      | {
          details?: Array<{ issue?: string; description?: string }>;
          purchase_units?: Array<{
            payments?: {
              captures?: Array<{ id?: string }>;
            };
          }>;
        }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            capturePayload?.details?.[0]?.description || "Could not capture the PayPal order.",
        },
        { status: 502 },
      );
    }

    const paypalCaptureId =
      capturePayload?.purchase_units?.[0]?.payments?.captures?.[0]?.id;
    const paidOrder = storedOrder
      ? markPayPalOrderPaid({
          internalOrderId: storedOrder.internalOrderId,
          paypalOrderId: orderId,
          paypalCaptureId,
        })
      : null;

    return NextResponse.json({
      internalOrderId: paidOrder?.internalOrderId || internalOrderId || null,
      paypalOrderId: orderId,
      paypalCaptureId,
      amountUsd: paidOrder?.amountUsd || null,
      currency: paidOrder?.currency || "USD",
      directionTitle: paidOrder?.directionTitle || null,
      offerName: paidOrder?.offerName || null,
      selectedDesignIndexes: paidOrder?.selectedDesignIndexes || [],
      selectedMedia: paidOrder?.selectedMedia || [],
      status: paidOrder?.status || "paid",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not capture PayPal order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
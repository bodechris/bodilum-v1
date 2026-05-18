export type StoredPayPalOrderCustomerDetails = {
  firstName: string;
  lastName: string;
  workEmail: string;
  phoneNumber: string | null;
  companyAddress: string | null;
  additionalNotes: string;
};

export type StoredPayPalOrder = {
  internalOrderId: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  offerType: string;
  offerName: string;
  directionSlug: string;
  directionTitle: string;
  selectedDesignIndexes: number[];
  selectedMedia: string[];
  customerDetails: StoredPayPalOrderCustomerDetails;
  userLocalValue: number | null;
  userCurrency: string | null;
  customerNotes: string;
  amountUsd: number;
  currency: "USD";
  status: "pending" | "paid";
  createdAt: string;
  paidAt?: string;
};

declare global {
  var __bodilumPayPalOrders: Map<string, StoredPayPalOrder> | undefined;
}

function getOrderStore() {
  if (!globalThis.__bodilumPayPalOrders) {
    globalThis.__bodilumPayPalOrders = new Map<string, StoredPayPalOrder>();
  }

  return globalThis.__bodilumPayPalOrders;
}

export function savePayPalOrder(order: StoredPayPalOrder) {
  getOrderStore().set(order.internalOrderId, order);
  return order;
}

export function getPayPalOrderByInternalId(internalOrderId: string) {
  return getOrderStore().get(internalOrderId) ?? null;
}

export function getPayPalOrderByOrderId(paypalOrderId: string) {
  for (const order of getOrderStore().values()) {
    if (order.paypalOrderId === paypalOrderId) {
      return order;
    }
  }

  return null;
}

export function attachPayPalOrderId(internalOrderId: string, paypalOrderId: string) {
  const order = getPayPalOrderByInternalId(internalOrderId);

  if (!order) {
    return null;
  }

  const updatedOrder = {
    ...order,
    paypalOrderId,
  } satisfies StoredPayPalOrder;

  savePayPalOrder(updatedOrder);
  return updatedOrder;
}

export function markPayPalOrderPaid(params: {
  internalOrderId: string;
  paypalOrderId: string;
  paypalCaptureId?: string;
}) {
  const order = getPayPalOrderByInternalId(params.internalOrderId);

  if (!order) {
    return null;
  }

  const updatedOrder = {
    ...order,
    paypalOrderId: params.paypalOrderId,
    paypalCaptureId: params.paypalCaptureId,
    status: "paid",
    paidAt: new Date().toISOString(),
  } satisfies StoredPayPalOrder;

  savePayPalOrder(updatedOrder);
  return updatedOrder;
}
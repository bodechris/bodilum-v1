export type StoredPayPalSubscription = {
  internalSubscriptionId: string;
  paypalSubscriptionId?: string;
  planKey: string;
  planTitle: string;
  status: "pending" | "approved";
  createdAt: string;
};

declare global {
  var __bodilumPayPalSubscriptions: Map<string, StoredPayPalSubscription> | undefined;
}

function getSubscriptionStore() {
  if (!globalThis.__bodilumPayPalSubscriptions) {
    globalThis.__bodilumPayPalSubscriptions = new Map<string, StoredPayPalSubscription>();
  }

  return globalThis.__bodilumPayPalSubscriptions;
}

export function savePayPalSubscription(subscription: StoredPayPalSubscription) {
  getSubscriptionStore().set(subscription.internalSubscriptionId, subscription);
  return subscription;
}

export function attachPayPalSubscriptionId(internalSubscriptionId: string, paypalSubscriptionId: string) {
  const subscription = getSubscriptionStore().get(internalSubscriptionId);

  if (!subscription) {
    return null;
  }

  const updatedSubscription = {
    ...subscription,
    paypalSubscriptionId,
  } satisfies StoredPayPalSubscription;

  savePayPalSubscription(updatedSubscription);
  return updatedSubscription;
}

export function markPayPalSubscriptionApproved(params: {
  internalSubscriptionId: string;
  paypalSubscriptionId: string;
}) {
  const subscription = getSubscriptionStore().get(params.internalSubscriptionId);

  if (!subscription) {
    return null;
  }

  const updatedSubscription = {
    ...subscription,
    paypalSubscriptionId: params.paypalSubscriptionId,
    status: "approved",
  } satisfies StoredPayPalSubscription;

  savePayPalSubscription(updatedSubscription);
  return updatedSubscription;
}
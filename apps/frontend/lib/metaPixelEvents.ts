type MetaEventPrimitive = string | number | boolean;

export type MetaEventParams = Record<string, MetaEventPrimitive | null | undefined>;

declare global {
  interface Window {
    fbq?: (
      command: "init" | "track" | "trackCustom" | "consent",
      eventNameOrPixelId: string,
      params?: MetaEventParams,
    ) => void;
  }
}

export function trackMetaEvent(eventName: string, params?: MetaEventParams) {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("track", eventName, params ?? {});
}

export function trackMetaCustomEvent(eventName: string, params?: MetaEventParams) {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("trackCustom", eventName, params ?? {});
}

export function trackMetaPageView() {
  trackMetaEvent("PageView");
}
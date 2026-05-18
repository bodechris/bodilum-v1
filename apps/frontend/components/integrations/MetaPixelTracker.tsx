"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMetaEvent, trackMetaPageView } from "@/lib/metaPixelEvents";

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function getViewContentPayload(pathname: string) {
  if (pathname === "/design-direction") {
    return {
      content_name: "Bodilum Design Directions",
      content_category: "Premade Design",
    };
  }

  if (pathname.startsWith("/design-direction/")) {
    const slug = pathname.split("/").filter(Boolean).at(-1);

    return {
      content_name: slug ? humanizeSlug(slug) : "Design Direction",
      content_category: "Premade Design",
    };
  }

  if (pathname === "/monthly-support") {
    return {
      content_name: "Monthly Support",
      content_category: "Subscription Offer",
    };
  }

  if (pathname === "/pricing") {
    return {
      content_name: "Pricing",
      content_category: "Commercial Intent",
    };
  }

  if (pathname.startsWith("/services/")) {
    const segments = pathname.split("/").filter(Boolean);
    const slug = segments.at(-1);

    return {
      content_name: slug ? humanizeSlug(slug) : "Bodilum Service",
      content_category: "Design Service",
    };
  }

  return null;
}

export function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams.toString();
    const currentUrl = search ? `${pathname}?${search}` : pathname;

    if (!pathname || lastTrackedUrlRef.current === currentUrl) {
      return;
    }

    lastTrackedUrlRef.current = currentUrl;
    trackMetaPageView();

    const viewContentPayload = getViewContentPayload(pathname);

    if (viewContentPayload) {
      trackMetaEvent("ViewContent", viewContentPayload);
    }
  }, [pathname, searchParams]);

  return null;
}
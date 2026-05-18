# Meta Tracking

This frontend now sends a mix of standard Meta Pixel events and Bodilum-specific custom events.

## Environment

Set the pixel id in `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_META_PIXEL_ID=YOUR_PIXEL_ID
```

The pixel bootstrap is mounted in `app/layout.tsx`, and route-aware client tracking runs through `components/integrations/MetaPixelTracker.tsx`.

## Standard Events

These are the events currently sent to Meta using `fbq("track", ...)`.

| Event | Trigger | Primary file |
| --- | --- | --- |
| `PageView` | Every client-side route view | `components/integrations/MetaPixelTracker.tsx` |
| `ViewContent` | Design-direction pages, service pages, monthly support, pricing | `components/integrations/MetaPixelTracker.tsx` |
| `Lead` | Successful contact, service request, or monthly support request submission | `app/contact/ContactForm.tsx`, `app/services/ServiceRequestDrawerContent.tsx`, `app/monthly-support/page.tsx` |
| `Contact` | Successful contact form submission | `app/contact/ContactForm.tsx` |
| `Subscribe` | Successful newsletter signup from the footer form | `components/ui/MainFooterV0.tsx` |
| `InitiateCheckout` | Successful PayPal handoff for one-time orders or subscriptions | `app/design-direction/DesignRequestDrawerContent.tsx`, `app/monthly-support/page.tsx` |
| `Purchase` | PayPal success after order capture or subscription confirmation | `app/payment/success/page.tsx`, `app/payment/subscription/success/page.tsx` |

## Custom Events

These are sent using `fbq("trackCustom", ...)` to expose higher-intent behavior for reporting and retargeting.

| Event | Trigger | Params |
| --- | --- | --- |
| `DesignDirectionRequestStarted` | User opens the design-direction request drawer | `direction_name`, `source_path` |
| `DesignOfferSelected` | User selects a specific offer inside the design-direction drawer | `direction_name`, `offer_name`, `offer_type`, `value`, `currency` |
| `ServiceRequestStarted` | User opens a service request drawer from a service card | `service_name`, `service_path` |
| `CheckoutCancelled` | User returns from a cancelled PayPal order or subscription flow | `checkout_type` |

## Funnel View

For Bodilum paid traffic, the core funnel is:

1. `PageView`
2. `ViewContent`
3. `DesignDirectionRequestStarted` or `ServiceRequestStarted`
4. `DesignOfferSelected` where applicable
5. `Lead` or `InitiateCheckout`
6. `Purchase`

`CheckoutCancelled` is the recovery signal for abandoned payment handoff.

## Testing

Use Meta Events Manager Test Events while performing these flows on the live site:

1. Visit the homepage and a service or design-direction page.
2. Open a design request drawer.
3. Select an offer inside the drawer.
4. Submit a contact or service request form successfully.
5. Start a PayPal checkout.
6. Complete or cancel the PayPal flow.

Expected results:

- Standard events should appear as processed in Meta.
- Custom events should appear in Test Events with the parameter values listed above.

## Source Files

- `app/layout.tsx`
- `components/integrations/MetaPixel.tsx`
- `components/integrations/MetaPixelTracker.tsx`
- `lib/metaPixelEvents.ts`
- `app/contact/ContactForm.tsx`
- `components/ui/MainFooterV0.tsx`
- `app/services/ServiceRequestDrawerContent.tsx`
- `app/services/SingleServiceV0.tsx`
- `app/design-direction/DesignDirectionRequestButton.tsx`
- `app/design-direction/DesignRequestDrawerContent.tsx`
- `app/monthly-support/page.tsx`
- `app/payment/success/page.tsx`
- `app/payment/cancelled/page.tsx`
- `app/payment/subscription/success/page.tsx`
- `app/payment/subscription/cancelled/page.tsx`
- `app/api/paypal/create-subscription/route.ts`
- `app/api/paypal/subscription-details/route.ts`

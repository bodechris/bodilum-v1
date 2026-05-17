"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalAppStates } from "@bod/utils/contexts/GlobalAppVarProvider";
import SvgIcons from "@/assets/SvgIcons";
import LocalizedServicePrice from "../services/LocalizedServicePrice";
import { ServiceDrawerPayload } from "../services/ServiceSectionDrawerContext";
import useWindowResize from "@bod/utils/hooks/useWindowResize";

type DesignRequestDrawerContentProps = {
  service?: ServiceDrawerPayload | null;
  onClose?: () => void;
};

type OfferPreview = {
  id: number;
  name: string;
  title: string;
  usdPrice: string;
  timeline: string;
  description: string;
  image: string;
  businessOutcomes: string[];
  details: string[];
  bestFor: string;
  singleDesignGallery: number[];
  singleDesignImages: string[];
};

type OfferFilterId = string;

type OfferFilterOption = {
  id: OfferFilterId;
  label: string;
  offerIds: number[];
};

const OFFER_FILTER_ORDER = [
  { id: "single-design-customisation", label: "Customise Single Design" },
  { id: "brand-core-sprint", label: "Brand Core Sprint" },
  { id: "brand-applications", label: "Brand Applications" },
  { id: "social-media-sets", label: "Social Media Sets" },
  { id: "print-media-sets", label: "Print Media Sets" },
  { id: "full-brand-identity", label: "Full Brand Identity" },
  { id: "premium-web", label: "Premium Web" },
  { id: "corporate-presentation", label: "Corporate Presentation" },
  { id: "others", label: "others" },
] as const satisfies ReadonlyArray<{ id: OfferFilterId; label: string }>;

const CONTROLLED_OFFER_NAMES = new Set<OfferFilterId>([
  "single-design-customisation",
  "brand-core-sprint",
  "brand-applications",
  "social-media-sets",
  "print-media-sets",
  "full-brand-identity",
  "premium-web",
  "corporate-presentation",
]);

function getDefaultActiveFilters(filters: OfferFilterOption[]) {
  return filters.slice(0, 2).map((filter) => filter.id);
}

function parsePriceValue(price: string) {
  const parsedPrice = Number(price.replace(/[^\d.]/g, ""));

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

function formatUserLocalValue(price: number, exchangeRate: number, currencyCode: string) {
  const localValue = currencyCode === "USD"
    ? price
    : Math.round((price * exchangeRate) / 500) * 500;

  return localValue;
}

function formatCurrencyValue(value: number, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DesignRequestDrawerContent({ service, onClose }: DesignRequestDrawerContentProps) {
  const { currencyCode, usdExchangeRate } = useGlobalAppStates();
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [activeFilterIds, setActiveFilterIds] = useState<OfferFilterId[]>([]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [selectedSingleDesignSlots, setSelectedSingleDesignSlots] = useState<number[]>([]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const screenDim = useWindowResize();

  const offerPreviews: OfferPreview[] = (service?.offers ?? []).map((offer, index) => ({
    id: index + 1,
    name: offer.name,
    title: offer.title,
    usdPrice: offer.price,
    timeline: offer.timeline,
    description: offer.description,
    image: offer.coverImg,
    businessOutcomes: offer.businessOutcomes,
    details: offer.deliverables,
    bestFor: offer.bestFor,
    singleDesignGallery: offer.singleDesignGallery ?? [],
    singleDesignImages: offer.singleDesignImages ?? [],
  }));

  const offerFilterOptions: OfferFilterOption[] = OFFER_FILTER_ORDER.map((filter) => {
    const offerIds = offerPreviews
      .filter((offer) =>
        filter.id === "others"
          ? !CONTROLLED_OFFER_NAMES.has(offer.name)
          : offer.name === filter.id,
      )
      .map((offer) => offer.id);

    return {
      id: filter.id,
      label: filter.label,
      offerIds,
    };
  }).filter((filter) => filter.offerIds.length > 0);

  useEffect(() => {
    setSelectedOfferId(null);
    setActiveFilterIds(getDefaultActiveFilters(offerFilterOptions));
    setActiveGalleryIndex(null);
    setSelectedSingleDesignSlots([]);
    setIsSubmittingOrder(false);
    setOrderError(null);
  }, [service?.title]);

  useEffect(() => {
    setSelectedSingleDesignSlots([]);
    setIsSubmittingOrder(false);
    setOrderError(null);
  }, [selectedOfferId]);

  if (!service) {
    return (
      <DrawerContentShell>
        <EmptyState>
          <p>Choose a design direction to see the request flow.</p>
        </EmptyState>
      </DrawerContentShell>
    );
  }

  const selectedOffer = offerPreviews.find((offer) => offer.id === selectedOfferId) ?? null;
  const visibleOfferIds = offerFilterOptions.filter((filter) => activeFilterIds.includes(filter.id)).flatMap((filter) => filter.offerIds);
  const visibleOffers = offerPreviews.filter((offer) => visibleOfferIds.includes(offer.id));
  const singleDesignImages =
    selectedOffer?.name === "single-design-customisation" ? selectedOffer.singleDesignImages : [];
  const selectedSingleDesignIndexes =
    selectedOffer?.name === "single-design-customisation"
      ? selectedSingleDesignSlots
          .map((slotIndex) => selectedOffer.singleDesignGallery[slotIndex])
          .filter((designIndex): designIndex is number => typeof designIndex === "number")
      : [];
  const selectedSingleDesignMedia =
    selectedOffer?.name === "single-design-customisation"
      ? selectedSingleDesignSlots
          .map((slotIndex) => singleDesignImages[slotIndex])
          .filter((image): image is string => typeof image === "string" && image.length > 0)
      : [];
  const selectedSingleDesignCount = selectedSingleDesignSlots.length;
  const baseOfferPrice = selectedOffer ? parsePriceValue(selectedOffer.usdPrice) : 0;
  const finalPrice =
    selectedOffer?.name === "single-design-customisation"
      ? baseOfferPrice * Math.max(selectedSingleDesignCount, 0)
      : baseOfferPrice;
  const localUnitValue = formatUserLocalValue(baseOfferPrice, usdExchangeRate, currencyCode);
  const finalLocalValue =
    selectedOffer?.name === "single-design-customisation"
      ? localUnitValue * Math.max(selectedSingleDesignCount, 0)
      : localUnitValue;
  const formattedLocalTotal = formatCurrencyValue(finalLocalValue, currencyCode);
  const orderDisabled =
    selectedOffer?.name === "single-design-customisation" ? selectedSingleDesignCount === 0 : !selectedOffer;
  const galleryImages = Array.from(
    new Set(
      [selectedOffer?.image, ...singleDesignImages, ...(service.previewImages ?? [])].filter(
        (image): image is string => typeof image === "string" && image.length > 0,
      ),
    ),
  );
  const visibleGalleryImages = galleryImages.slice(0, 6);

  const toggleFilter = (filterId: OfferFilterId) => {
    setActiveFilterIds((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((currentFilterId) => currentFilterId !== filterId)
        : [...currentFilters, filterId],
    );
  };

  const toggleSingleDesignSelection = (slotIndex: number) => {
    setSelectedSingleDesignSlots((currentSlots) =>
      currentSlots.includes(slotIndex)
        ? currentSlots.filter((currentSlot) => currentSlot !== slotIndex)
        : [...currentSlots, slotIndex],
    );
  };

  const handleOrderDesign = async () => {
    if (!selectedOffer || orderDisabled) {
      return;
    }

    setIsSubmittingOrder(true);
    setOrderError(null);

    const directionSlug = service.link.split("/").filter(Boolean).at(-1) ?? "";
    const orderPayload = {
      offerType: selectedOffer.name,
      offerName: selectedOffer.name,
      directionSlug,
      directionTitle: service.title,
      selectedDesignIndexes: selectedSingleDesignIndexes,
      selectedMedia: selectedSingleDesignMedia,
      userLocalValue: finalLocalValue,
      userCurrency: currencyCode,
      customerNotes: "",
    };

    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });
      const payload = (await response.json().catch(() => null)) as
        | { approveUrl?: string; internalOrderId?: string; error?: string }
        | null;

      if (!response.ok || !payload?.approveUrl) {
        throw new Error(payload?.error || "Could not start the PayPal checkout.");
      }

      if (payload.internalOrderId) {
        sessionStorage.setItem(
          `bodilum-paypal-order:${payload.internalOrderId}`,
          JSON.stringify({
            directionTitle: service.title,
            offerTitle: selectedOffer.title,
            selectedDesignIndexes: selectedSingleDesignIndexes,
            selectedMedia: selectedSingleDesignMedia,
            finalPrice,
            userLocalValue: finalLocalValue,
            userCurrency: currencyCode,
          }),
        );
      }

      onClose?.();
      window.location.assign(payload.approveUrl);
    } catch (error) {
      setOrderError(
        error instanceof Error ? error.message : "Could not start the PayPal checkout.",
      );
      setIsSubmittingOrder(false);
    }
  };

  const closeGallery = () => setActiveGalleryIndex(null);

  const showPreviousGalleryImage = () => {
    setActiveGalleryIndex((currentIndex) => {
      if (currentIndex === null || !galleryImages.length) {
        return currentIndex;
      }

      return (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    });
  };

  const showNextGalleryImage = () => {
    setActiveGalleryIndex((currentIndex) => {
      if (currentIndex === null || !galleryImages.length) {
        return currentIndex;
      }

      return (currentIndex + 1) % galleryImages.length;
    });
  };

  return (
    <DrawerContentShell>
      <ContextBlock>
        {selectedOffer ? (
          <button className="context-block__back" type="button" onClick={() => setSelectedOfferId(null)}>
            <span className="context-block__back-icon" aria-hidden="true">
              <SvgIcons name="FaArrowLeft" reactIconUrl='fa' />
            </span>
            {/* <span>Back to offers</span> */}
          </button>
        ) : null}

        {
            screenDim && screenDim[0] && screenDim[0] >= 768 ? 
            <div className="context-block__content">
                <p>{service.summary ?? service.description}</p>

                {!selectedOffer ? (
                    <div className="context-block__filters" role="group" aria-label="Offer categories">
                    {offerFilterOptions.map((filter) => (
                        <label key={filter.id} className="context-block__filter-option">
                        <input
                            type="checkbox"
                            checked={activeFilterIds.includes(filter.id)}
                            onChange={() => toggleFilter(filter.id)}
                        />
                        <span>{filter.label}</span>
                        </label>
                    ))}
                    </div>
                ) : null}
            </div> : null
        }

      </ContextBlock>

      <DrawerScreensViewport>
        {selectedOffer ? (
          <DrawerScreen>
            <OfferDetailCard>
              <span className="offer-detail__eyebrow">Offer detail</span>
              <h3>{selectedOffer.title}</h3>
              <div className="offer-detail__price">
                {formatCurrencyValue(localUnitValue, currencyCode)}
              </div>
              <p className="offer-detail__timeline">Delivery: {selectedOffer.timeline}</p>

              <div className="offer-detail__section offer-detail__section--priority">
                <h4>Business outcomes</h4>
                <ul>
                  {selectedOffer.businessOutcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <p className="offer-detail__description">{selectedOffer.description}</p>

              <div className="offer-detail__section">
                <h4>What this offer covers</h4>
                <ul>
                  {selectedOffer.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="offer-detail__section offer-detail__note">
                <h4>Best for</h4>
                <p>{selectedOffer.bestFor}</p>
              </div>

              {selectedOffer.name === "single-design-customisation" && singleDesignImages.length ? (
                <div className="offer-detail__section offer-detail__single-design-list">
                  <div className="offer-detail__gallery-head">
                    <h4>Available designs to customise</h4>
                    <p>Select one or more designs from this direction.</p>
                  </div>

                  <div className="offer-detail__single-design-grid">
                    {singleDesignImages.map((image, index) => {
                      const isSelected = selectedSingleDesignSlots.includes(index);

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          className={`offer-detail__single-design-item${isSelected ? " is-selected" : ""}`}
                          onClick={() => toggleSingleDesignSelection(index)}
                          aria-pressed={isSelected}
                        >
                          <img src={image} alt={`${selectedOffer.title} design ${index + 1}`} />
                          <span>{isSelected ? `Design ${index + 1} selected` : `Design ${index + 1}`}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedSingleDesignSlots.length ? (
                    <p className="offer-detail__single-design-summary">
                      {selectedSingleDesignSlots.length} design{selectedSingleDesignSlots.length > 1 ? "s" : ""} selected.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {selectedOffer.name !== "single-design-customisation" && galleryImages.length ? (
                <div className="offer-detail__section">
                  <div className="offer-detail__gallery-head">
                    <h4>Direction preview</h4>
                    <p>Tap any image to open the full gallery.</p>
                  </div>
                  <div className="offer-detail__gallery-grid">
                    {visibleGalleryImages.map((image, index) => {
                      const imageIndex = galleryImages.indexOf(image);

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          className="offer-detail__gallery-thumb"
                          onClick={() => setActiveGalleryIndex(imageIndex)}
                        >
                          <img src={image} alt={`${selectedOffer.title} preview ${index + 1}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              
            </OfferDetailCard>
          </DrawerScreen>
        ) : (
          <DrawerScreen>
            <OffersListCard>
              <div className="offers-list__grid">
                {visibleOffers.map((offer) => (
                  <button
                    key={offer.id}
                    className="offer-preview"
                    type="button"
                    onClick={() => setSelectedOfferId(offer.id)}
                  >
                    <div className="offer-preview__content">
                      <div className="offer-preview__topline">
                        <span className="offer-preview__index">Offer {offer.id}</span>
                        <span className="offer-preview__timeline">{offer.timeline}</span>
                      </div>
                      <h4>{offer.title}</h4>
                      <div className="offer-preview__price">
                        <LocalizedServicePrice price={offer.usdPrice} />
                      </div>
                      <p className="offer-preview__description">{offer.description}</p>
                    </div>
                    {offer.image ? (
                      <div className="offer-preview__image-wrap">
                        <img src={offer.image} alt={offer.title} className="offer-preview__image" />
                      </div>
                    ) : null}
                  </button>
                ))}

                {!visibleOffers.length ? (
                  <EmptyState>
                    <p>Select at least one offer type to display matching sprint offers.</p>
                  </EmptyState>
                ) : null}
              </div>
            </OffersListCard>
          </DrawerScreen>
        )}
      </DrawerScreensViewport>

      {selectedOffer ? (
        <DrawerFooter>
          <div className="drawer-footer__meta">
            <span className="drawer-footer__label">Design Request Total</span>
            <div className="drawer-footer__price">{formattedLocalTotal}</div>
            {selectedOffer.name === "single-design-customisation" ? (
              <p className="drawer-footer__note">
                {selectedSingleDesignCount > 0
                  ? `${selectedSingleDesignCount} design${selectedSingleDesignCount > 1 ? "s" : ""} selected. PayPal will charge ${finalPrice.toFixed(2)} USD.`
                  : "Select at least one design to continue. PayPal will charge in USD."}
              </p>
            ) : (
              <p className="drawer-footer__note">Ready to place your order for this offer. PayPal will charge ${finalPrice.toFixed(2)} USD.</p>
            )}
            {orderError ? <p className="drawer-footer__error">{orderError}</p> : null}
          </div>

          <button
            type="button"
            className="drawer-footer__action"
            onClick={handleOrderDesign}
            disabled={orderDisabled || isSubmittingOrder}
          >
            {isSubmittingOrder
              ? "Redirecting to PayPal..."
              : selectedOffer.name === "single-design-customisation" && selectedSingleDesignCount > 0
              ? `Order ${selectedSingleDesignCount} design${selectedSingleDesignCount > 1 ? "s" : ""}`
              : "Order design"}
          </button>
        </DrawerFooter>
      ) : null}

      {activeGalleryIndex !== null && galleryImages[activeGalleryIndex] ? (
        <GalleryOverlay role="dialog" aria-modal="true" aria-label="Offer gallery">
          <button type="button" className="gallery-overlay__backdrop" onClick={closeGallery} aria-label="Close gallery" />
          <div className="gallery-overlay__content">
            <button type="button" className="gallery-overlay__close" onClick={closeGallery} aria-label="Close gallery">
              Close
            </button>

            <div className="gallery-overlay__stage">
              <button
                type="button"
                className="gallery-overlay__nav"
                onClick={showPreviousGalleryImage}
                aria-label="Show previous image"
              >
                Prev
              </button>

              <div className="gallery-overlay__image-wrap">
                <img
                  src={galleryImages[activeGalleryIndex]}
                  alt={`${selectedOffer?.title ?? service.title} gallery image ${activeGalleryIndex + 1}`}
                  className="gallery-overlay__image"
                />
              </div>

              <button
                type="button"
                className="gallery-overlay__nav"
                onClick={showNextGalleryImage}
                aria-label="Show next image"
              >
                Next
              </button>
            </div>

            <div className="gallery-overlay__footer">
              <span>
                {activeGalleryIndex + 1} / {galleryImages.length}
              </span>
              <div className="gallery-overlay__thumbs">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`gallery-overlay__thumb${index === activeGalleryIndex ? " is-active" : ""}`}
                    onClick={() => setActiveGalleryIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GalleryOverlay>
      ) : null}
    </DrawerContentShell>
  );
}

const sharedCardStyles = `
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 1.5rem;
  background: #fff;
  padding: 1rem;

  @media (min-width: 48rem) {
    padding: 1.25rem;
  }
`;

const DrawerContentShell = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 1rem;
  color: #111;
  width: 100%;
  height: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
`;

const ContextBlock = styled.div`
  ${sharedCardStyles}
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;

  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;

  .context-block__back {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 2.75rem;
    padding: 0.55rem 0.95rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 17, 17, 0.12);
    background: #fff;
    color: #111;
    font-weight: 700;
  }

  .context-block__back-icon {
    width: 1.1rem;
    height: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .context-block__back-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .context-block__content {
    display: grid;
    gap: 1rem;
    min-width: 0;
    flex: 1;
  }

  .context-block__filters {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.65rem 1rem;

    @media (min-width: 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 64rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .context-block__filter-option {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #222;
  }

  .context-block__filter-option input {
    margin: 0;
    width: 1rem;
    height: 1rem;
    accent-color: #111;
    flex: 0 0 auto;
  }

  .context-block__filter-option span {
    line-height: 1.35;
  }

  p {
    color: #666;
    line-height: 1.65;
  }
`;

const OfferIntroCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 0.6rem;

  .offer-intro__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const OffersListCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 1rem;

//   padding: 0 !important;
//   border: none !important;
//   border-radius: 0 !important;

  .offers-list__header {
    display: grid;
    gap: 0.35rem;
  }

  .offers-list__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  .offers-list__grid {
    display: grid;
    gap: 0.85rem;
  }

  .offer-preview {
    display: grid;
    gap: 0.65rem;
    width: 100%;
    padding: 1rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(17, 17, 17, 0.08);
    background: #fcfcfb;
    min-width: 0;
    text-align: left;
    transition: box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease;

    cursor: pointer;

    @media (min-width: 48rem) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
      align-items: stretch;
      gap: 1rem;
    }
  }

  .offer-preview:hover {
    box-shadow: 0 18px 34px rgba(17, 17, 17, 0.08);
    border-color: rgba(17, 17, 17, 0.16);
    background: #fff;
  }

  .offer-preview__content {
    display: grid;
    gap: 0.65rem;
    min-width: 0;
    align-content: start;
  }

  .offer-preview__topline {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .offer-preview__image-wrap {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    overflow: hidden;
    background: #f5f5f5;

    @media (min-width: 48rem) {
      height: 100%;
      min-height: 15rem;
      aspect-ratio: auto;
    }
  }

  .offer-preview__image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .offer-preview__index,
  .offer-preview__timeline {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #767676;
  }

  h4 {
    font-size: 1.1rem;
    line-height: 1.2;
    font-weight: 800;
    color: #111;
  }

  .offer-preview__price {
    font-size: clamp(1.2rem, 2vw, 1.55rem);
    line-height: 1.15;
    font-weight: 800;
    color: #111;
  }

  .offer-preview__price .price-meta {
    display: flex;
  }

  .offer-preview__price .price-badge {
    padding: 0;
    background: transparent;
    border-radius: 0;
    color: inherit;
    font: inherit;
  }

  .offer-preview__description {
    color: #555;
    line-height: 1.6;
  }

  .offer-preview__guidance {
    padding: 0.85rem 0.95rem;
    border-radius: 1rem;
    background: #f7f3ea;
    color: #4f4431;
    line-height: 1.55;
  }
`;

const DrawerScreensViewport = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  overflow-anchor: none;
  scroll-behavior: auto;
  scrollbar-gutter: stable;
`;

const DrawerScreen = styled.div`
  min-width: 0;
  width: 100%;
  display: grid;
  gap: 1rem;
  padding-right: 0.25rem;
`;

const OfferDetailCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 0.85rem;

//   padding: 0 !important;
//   border: none !important;
//   border-radius: 0 !important;

  .offer-detail__image-wrap {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1.15rem;
    overflow: hidden;
    background: #f5f5f5;
  }

  .offer-detail__image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .offer-detail__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.35rem, 2.3vw, 2rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  .offer-detail__price {
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  .offer-detail__price .price-meta {
    display: flex;
  }

  .offer-detail__price .price-badge {
    padding: 0;
    background: transparent;
    border-radius: 0;
    color: inherit;
    font: inherit;
  }

  .offer-detail__timeline {
    color: #4f4f4f;
    font-weight: 600;
  }

  .offer-detail__description,
  .offer-detail__note p {
    color: #666;
    line-height: 1.65;
  }

  .offer-detail__section {
    display: grid;
    gap: 0.7rem;
    padding: 1rem;
    border-radius: 1.15rem;
    background: #fcfcfb;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }

  .offer-detail__note {
    background: #f7f3ea;
  }

  .offer-detail__section--priority {
    background: #f7f3ea;
    border-color: rgba(17, 17, 17, 0.06);
  }

  .offer-detail__gallery-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .offer-detail__gallery-head p {
    color: #666;
    font-size: 0.92rem;
  }

  .offer-detail__gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;

    @media (min-width: 48rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .offer-detail__single-design-list {
    gap: 0.85rem;
  }

  .offer-detail__single-design-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;

    @media (min-width: 48rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .offer-detail__single-design-item {
    display: grid;
    gap: 0.55rem;
    padding: 0.5rem;
    border: 1px solid rgba(17, 17, 17, 0.08);
    border-radius: 1rem;
    background: #fff;
    text-align: left;
    cursor: pointer;
    transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
  }

  .offer-detail__single-design-item.is-selected {
    border-color: rgba(17, 17, 17, 0.24);
    box-shadow: 0 14px 28px rgba(17, 17, 17, 0.08);
    background: #f7f3ea;
  }

  .offer-detail__single-design-item img {
    width: 100%;
    aspect-ratio: 4 / 3;
    display: block;
    object-fit: cover;
    border-radius: 1rem;
    background: #f3f3f3;
  }

  .offer-detail__single-design-item span {
    font-size: 0.9rem;
    font-weight: 700;
    color: #222;
  }

  .offer-detail__single-design-summary {
    color: #4f4431;
    font-weight: 600;
  }

  .offer-detail__gallery-thumb {
    padding: 0;
    border: 0;
    border-radius: 1rem;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: #f3f3f3;
    cursor: pointer;
  }

  .offer-detail__gallery-thumb img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  h4 {
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 800;
    color: #111;
  }

  ul {
    display: grid;
    gap: 0.6rem;
    padding-left: 1rem;
    color: #444;
    line-height: 1.55;
  }
`;

const EmptyState = styled.div`
  ${sharedCardStyles}
  color: #666;
`;

const DrawerFooter = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);

  @media (min-width: 48rem) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }

  .drawer-footer__meta {
    display: grid;
    gap: 0.2rem;
    min-width: 0;
  }

  .drawer-footer__label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #767676;
  }

  .drawer-footer__price {
    font-size: clamp(1.3rem, 2.5vw, 1.85rem);
    font-weight: 800;
    color: #111;
  }

  .drawer-footer__price .price-meta {
    display: flex;
  }

  .drawer-footer__price .price-badge {
    padding: 0;
    background: transparent;
    border-radius: 0;
    color: inherit;
    font: inherit;
  }

  .drawer-footer__note {
    color: #666;
    line-height: 1.5;
  }

  .drawer-footer__error {
    color: #a11a1a;
    line-height: 1.5;
  }

  .drawer-footer__action {
    min-height: 3.25rem;
    padding: 0.9rem 1.3rem;
    border: 0;
    border-radius: 999px;
    background: #111;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .drawer-footer__action:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .drawer-footer__action:not(:disabled):hover {
    transform: translateY(-1px);
  }
`;

const GalleryOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 1rem;

  .gallery-overlay__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(10, 10, 10, 0.82);
  }

  .gallery-overlay__content {
    position: relative;
    z-index: 1;
    width: min(100%, 70rem);
    max-height: calc(100vh - 2rem);
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1.5rem;
    background: rgba(18, 18, 18, 0.96);
    color: #fff;
  }

  .gallery-overlay__close,
  .gallery-overlay__nav,
  .gallery-overlay__thumb {
    cursor: pointer;
  }

  .gallery-overlay__close,
  .gallery-overlay__nav {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.08);
    color: inherit;
    border-radius: 999px;
    padding: 0.7rem 1rem;
    font-weight: 700;
  }

  .gallery-overlay__close {
    justify-self: end;
  }

  .gallery-overlay__stage {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;

    @media (max-width: 47.99rem) {
      grid-template-columns: 1fr;
    }
  }

  .gallery-overlay__image-wrap {
    border-radius: 1.25rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    min-height: 18rem;
  }

  .gallery-overlay__image {
    width: 100%;
    max-height: 68vh;
    display: block;
    object-fit: contain;
    background: #111;
  }

  .gallery-overlay__footer {
    display: grid;
    gap: 0.75rem;
  }

  .gallery-overlay__thumbs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
    gap: 0.65rem;
  }

  .gallery-overlay__thumb {
    padding: 0;
    border: 2px solid transparent;
    border-radius: 0.9rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
  }

  .gallery-overlay__thumb.is-active {
    border-color: #fff;
  }

  .gallery-overlay__thumb img {
    width: 100%;
    height: 100%;
    display: block;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

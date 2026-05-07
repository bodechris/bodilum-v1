'use client';

import React from 'react';
import { useGlobalAppStates } from '@bod/utils/contexts/GlobalAppVarProvider';

type LocalizedServicePriceProps = {
  price?: string;
};

function LocalizedServicePrice({ price }: LocalizedServicePriceProps) {
  const {
    country,
    currencyCode,
    currencySymbol,
    formatUsdPrice,
    isExchangeRateLoading,
  } = useGlobalAppStates();

  if (!price) {
    return null;
  }

  const showPriceLoader = currencyCode !== 'USD' && isExchangeRateLoading;
  const geoLabel = `${country} · ${currencyCode} · ${currencySymbol}`;

  if (showPriceLoader) {
    return (
      <div className="price-meta" aria-live="polite" aria-busy="true">
        <span className="price-badge price-badge--loading">
          <span className="price-loader" aria-hidden="true" />
          Loading your local price...
        </span>
        {/* <span className="price-context">{geoLabel}</span> */}
      </div>
    );
  }

  const formattedPrice = formatUsdPrice(price).replace('>=', 'Starting at ');

  return (
    <div className="price-meta">
      <span className="price-badge">{formattedPrice}</span>
      {/* <span className="price-context">{geoLabel}</span> */}
    </div>
  );
}

export default LocalizedServicePrice;
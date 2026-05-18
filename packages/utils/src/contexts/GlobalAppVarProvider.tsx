'use client';

import { getCountryForTimezone } from 'countries-and-timezones';
import countryToCurrency, {
  type Countries,
  type Currencies,
} from 'country-to-currency';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

const DEFAULT_COUNTRY: Countries = 'US';
const DEFAULT_CURRENCY: Currencies = 'USD';
const DEFAULT_CURRENCY_SYMBOL = '$';
type GeoState = {
  country: Countries;
  currencyCode: Currencies;
  currencySymbol: string;
};

type GlobalAppState = {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  country: Countries;
  currencyCode: Currencies;
  currencySymbol: string;
  usdExchangeRate: number;
  isExchangeRateLoading: boolean;
  formatUsdPrice: (price?: string) => string;
};

const DEFAULT_GEO_STATE: GeoState = {
  country: DEFAULT_COUNTRY,
  currencyCode: DEFAULT_CURRENCY,
  currencySymbol: DEFAULT_CURRENCY_SYMBOL,
};

function normalizeCountryCode(value?: string): Countries | undefined {
  if (!value) {
    return undefined;
  }

  const normalizedCountryCode = value.trim().toUpperCase();

  if (normalizedCountryCode in countryToCurrency) {
    return normalizedCountryCode as Countries;
  }

  return undefined;
}

function resolveCountryFromLocale(): Countries | undefined {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const locales = navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const locale of locales) {
    const localeRegionMatch = locale.match(/[-_]([A-Za-z]{2})$/);
    const fallbackCountry = normalizeCountryCode(localeRegionMatch?.[1]);

    if (fallbackCountry) {
      return fallbackCountry;
    }
  }

  return undefined;
}

function resolveCountryFromTimeZone(): Countries | undefined {
  if (typeof Intl === 'undefined') {
    return undefined;
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!timeZone) {
    return undefined;
  }

  const country = getCountryForTimezone(timeZone);

  return normalizeCountryCode(country?.id);
}

function resolveGeoState(countryCode?: string): GeoState {
  const country = normalizeCountryCode(countryCode)
    ?? resolveCountryFromTimeZone()
    ?? resolveCountryFromLocale()
    ?? DEFAULT_COUNTRY;
  const currencyCode = countryToCurrency[country] ?? DEFAULT_CURRENCY;
  const currencySymbol = getSymbolFromCurrency(currencyCode) ?? DEFAULT_CURRENCY_SYMBOL;

  return {
    country,
    currencyCode,
    currencySymbol,
  };
}

function getPriceRoundingIncrement(value: number): number {
  if (value >= 10000) {
    return 500;
  }

  if (value >= 1000) {
    return 50;
  }

  if (value >= 100) {
    return 10;
  }

  if (value >= 10) {
    return 5;
  }

  return 1;
}

function formatPriceString(price: string, rate: number, currencyCode: Currencies): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  });

  return price.replace(/\d+(?:\.\d+)?/g, (value) => {
    const convertedValue = Number(value) * rate;
    const roundingIncrement = getPriceRoundingIncrement(convertedValue);
    const roundedValue = Math.max(
      Math.round(convertedValue / roundingIncrement) * roundingIncrement,
      roundingIncrement,
    );

    return formatter.format(roundedValue);
  });
}

const GlobalAppStateContext = createContext<GlobalAppState | undefined>(undefined);

type GlobalAppVarProviderProps = PropsWithChildren<{
  initialCountryCode?: string;
}>;

export function GlobalAppVarProvider({
  children,
  initialCountryCode,
}: GlobalAppVarProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [geoState] = useState<GeoState>(() => resolveGeoState(initialCountryCode));
  const [usdExchangeRate, setUsdExchangeRate] = useState(1);
  const [isExchangeRateLoading, setIsExchangeRateLoading] = useState(
    geoState.currencyCode !== DEFAULT_CURRENCY,
  );

  useEffect(() => {
    if (geoState.currencyCode === DEFAULT_CURRENCY) {
      setUsdExchangeRate(1);
      setIsExchangeRateLoading(false);
      return;
    }

    const abortController = new AbortController();

    async function loadExchangeRate() {
      setIsExchangeRateLoading(true);

      try {
        const response = await fetch(`/api/forex?currency=${geoState.currencyCode}`, {
          signal: abortController.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Unable to load exchange rate.');
        }

        const payload = (await response.json()) as { rate?: number };

        if (typeof payload.rate === 'number' && Number.isFinite(payload.rate) && payload.rate > 0) {
          setUsdExchangeRate(payload.rate);
          return;
        }

        throw new Error('Invalid exchange rate response.');
      } catch {
        if (!abortController.signal.aborted) {
          setUsdExchangeRate(1);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsExchangeRateLoading(false);
        }
      }
    }

    void loadExchangeRate();

    return () => {
      abortController.abort();
    };
  }, [geoState.currencyCode]);

  const value = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      country: geoState.country,
      currencyCode: geoState.currencyCode,
      currencySymbol: geoState.currencySymbol,
      usdExchangeRate,
      isExchangeRateLoading,
      formatUsdPrice: (price?: string) => {
        if (!price) {
          return '';
        }

        const rate = geoState.currencyCode === DEFAULT_CURRENCY
          ? 1
          : usdExchangeRate;

        return formatPriceString(price, rate, geoState.currencyCode);
      },
    }),
    [geoState, isExchangeRateLoading, isSignedIn, usdExchangeRate],
  );

  return (
    <GlobalAppStateContext.Provider value={value}>
      {children}
    </GlobalAppStateContext.Provider>
  );
}

export function useGlobalAppStates() {
  const context = useContext(GlobalAppStateContext);

  if (!context) {
    throw new Error('useGlobalAppStates must be used within GlobalAppVarProvider');
  }

  return context;
}
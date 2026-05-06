'use client'

import React from 'react'
import MainHeaderV0 from '@/components/ui/MainHeaderV0';
import MainFixedFooterV0 from '@/components/ui/MainFixedFooterV0';
import styled from 'styled-components';
import {
  GlobalAppVarProvider,
  useGlobalAppStates,
} from '@bod/utils/contexts/GlobalAppVarProvider';
import BxPanelV0 from '@/components/bx-panel/BxPanelV0';
import MainFooterV0 from '@/components/ui/MainFooterV0';

function GeoDebugBadge({ initialCountryCode }: { initialCountryCode?: string }) {
  const { country, currencyCode, currencySymbol } = useGlobalAppStates();
  const [timeZone] = React.useState(() => {
    if (typeof Intl === 'undefined') {
      return 'unknown';
    }

    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
  });

  return (
    <aside className="geo-debug-badge">
      <strong>Geo Debug</strong>
      <span>server hint: {initialCountryCode ?? 'none'}</span>
      <span>resolved country: {country}</span>
      <span>currency code: {currencyCode}</span>
      <span>currency symbol: {currencySymbol}</span>
      <span>browser timezone: {timeZone}</span>
    </aside>
  );
}

function AppFrontend({
  children,
  initialCountryCode,
}: {
  children: React.ReactNode;
  initialCountryCode?: string;
}) {
  return (
    <GlobalAppVarProvider initialCountryCode={initialCountryCode}>
      <AppFrontendWrapper>
          {/* <GeoDebugBadge initialCountryCode={initialCountryCode} /> */}
          <MainHeaderV0 />
          <main className="mainApp w-[95%]">
              {children}
              <BxPanelV0 />
          </main>
          <MainFixedFooterV0 />
          <MainFooterV0 />
      </AppFrontendWrapper>
    </GlobalAppVarProvider>
  )
}

export default AppFrontend;


const AppFrontendWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  
  background: #fff;
  background-image: url('/pg-bg-0.jpg');
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;

  position: relative;
  z-index: 0;

  .geo-debug-badge {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 220px;
    padding: 0.75rem 0.9rem;
    border: 1px solid rgba(34, 34, 34, 0.12);
    border-radius: 0.85rem;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
    color: #222;
    font-size: 0.8rem;
    line-height: 1.35;

    strong {
      font-size: 0.82rem;
    }
  }

  .mainApp {
    width: 100%;
    height: auto;
    margin-top: 80px;
    margin-bottom: 10rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }


  `
'use client'

import React from 'react'
import MainHeaderV0 from '@/components/ui/MainHeaderV0';
import MainFixedFooterV0 from '@/components/ui/MainFixedFooterV0';
import styled from 'styled-components';
import { GlobalAppVarProvider } from '@bod/utils/contexts/GlobalAppVarProvider';
import BxPanelV0 from '@/components/bx-panel/BxPanelV0';

function AppFrontend({ children }: { children: React.ReactNode }) {
  return (
    <GlobalAppVarProvider>
      <AppFrontendWrapper>
          <MainHeaderV0 />
          <main className="mainApp w-[95%]">
              {children}
              <BxPanelV0 />
          </main>
          <MainFixedFooterV0 />
          {/* <MainFooterV0 /> */}
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
  min-height: 100vh;
  
  background: #fff;
  background-image: url('/pg-bg-0.jpg');
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;

  position: relative;
  z-index: 0;

  .mainApp {
    width: 100%;
    height: auto;
    min-height: 100vh;
    margin-top: 80px;
    margin-bottom: 10rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }


  `
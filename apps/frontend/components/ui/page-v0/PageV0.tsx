'use client'

import React from 'react';
import styled from 'styled-components';

function PageV0({ children }: { children: React.ReactNode }) {
  return (
    <PageV0Wrapper>
        {children}
    </PageV0Wrapper>
  )
}

export default PageV0;

const PageV0Wrapper = styled.div`
  marging: 0 auto;
  width: 100%;
  min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-display), sans-serif !important;
    }
`;
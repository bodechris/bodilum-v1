import React from 'react';

import styled from 'styled-components';

function MainFooterV0() {
  return (
    <MainFooterV0Wrapper>
    </MainFooterV0Wrapper>
  )
}

export default MainFooterV0;

const MainFooterV0Wrapper = styled.footer`
  width: 100%;
  height: 70vh !important;
  min-height: 70vh !important;
  background: #222;
  display: flex;
  position: relative;
  z-index: 0;
  justify-content: center;
  align-items: center;
`;
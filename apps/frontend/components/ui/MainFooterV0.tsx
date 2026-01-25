import React from 'react';

import styled from 'styled-components';

function MainFooterV0() {
  return (
    <MainFooterV0Wrapper>
        <span>MainFooterV0</span>
    </MainFooterV0Wrapper>
  )
}

export default MainFooterV0;

const MainFooterV0Wrapper = styled.footer`
  width: 100%;
  height: 60px;
  background: lightgray;
  display: flex;
`;
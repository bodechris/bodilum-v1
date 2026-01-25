import React from 'react';
import styled from 'styled-components';

function MainFixedFooterV0() {
  return (
    <MainFixedFooterV0Wrapper>
        <div className="w-[95%] flex justify-between main-fixed-footer-holder">
            <div className="_left">left</div>
            <div className="_center">center</div>
            <div className="_right">right</div>
        </div>
    </MainFixedFooterV0Wrapper>
  )
}

export default MainFixedFooterV0;


const MainFixedFooterV0Wrapper = styled.footer`
  position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;

    .main-fixed-footer-holder {
    }
`;
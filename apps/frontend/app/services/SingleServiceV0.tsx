"use client";

import React from 'react';
import styled from 'styled-components';
import { SingleServiceProp } from './ServiceSectionPage';
import { useGlobalAppStates } from '@bod/utils/contexts/GlobalAppVarProvider';
import Link from 'next/link';

function SingleServiceV0({ title, description, link, price }: SingleServiceProp) {
  const { currencyCode, formatUsdPrice, isExchangeRateLoading } = useGlobalAppStates();
  const showPriceLoader = Boolean(price) && currencyCode !== 'USD' && isExchangeRateLoading;

  return (
    <SingleServiceV0Wrapper>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="service-price">
          {showPriceLoader ? <span className="service-price-loader" /> : formatUsdPrice(price)}
        </div>
        <Link href={link}>View</Link><button>Request this service</button>
    </SingleServiceV0Wrapper>
  )
}

export default SingleServiceV0;  
 
const SingleServiceV0Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #eee;
  border-radius: 20px;
  padding: 1rem;

    -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

    -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
    -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
    box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 

  .service-price {
    min-height: 1.75rem;
    display: flex;
    align-items: center;
  }

  .service-price-loader {
    width: 7.5rem;
    height: 1.1rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #ececec 0%, #f7f7f7 50%, #ececec 100%);
    background-size: 200% 100%;
    animation: price-loader 1.1s ease-in-out infinite;
  }

  @keyframes price-loader {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
`;
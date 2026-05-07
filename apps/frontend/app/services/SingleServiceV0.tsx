"use client";

import React from 'react';
import styled from 'styled-components';
import { SingleServiceProp } from './ServiceSectionPage';
import { useGlobalAppStates } from '@bod/utils/contexts/GlobalAppVarProvider';
import Link from 'next/link';

function SingleServiceV0({ title, description, link, price, thumbnail }: SingleServiceProp) {
  const { currencyCode, formatUsdPrice, isExchangeRateLoading } = useGlobalAppStates();
  const showPriceLoader = Boolean(price) && currencyCode !== 'USD' && isExchangeRateLoading;

  return (
    <SingleServiceV0Wrapper>
      <div className="service-thumbnail">
        <Link className="service-thumbnail-link" href={link}>
          <img src={thumbnail || "/images/design-1.webp"} alt={title} />

          <div className="service-price">
            {showPriceLoader ? <span className="service-price-loader" /> : formatUsdPrice(price)}
          </div>
        </Link>

        <div className="service-actions">          
          <button type="button">Request this service</button>
        </div>

      </div>
      <div className="service-info">

        <div className="info">
          <h3>{title}</h3>
          <p>{description.substring(0, 80)}...</p>
        </div>

        <div className="actions">
          <Link href={link}>See offer</Link>
        </div>
        
      </div>
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
  position: relative;

  overflow: hidden;

  -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
  -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
  -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
  transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

  -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
  -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
  box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 

  .service-thumbnail {
    flex: 4;
    width: 100%;
    height: auto;
    position: relative;
    display: flex;

    .service-thumbnail-link {
      width: 100%;
      min-height: 100%;
      position: relative;
      display: flex;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      position: absolute;
      top: 0; left: 0;
    }

    .service-price {
      min-height: 1.75rem;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0.5rem; left: 20px;

      border-radius: 20px;
      background: #fffc;
      backdrop-filter: blur(10px);

      box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
      padding: 0.25rem 0.75rem;

      font-size: clamp(12px, 2vw, 16px);
      font-weight: bolder;
    }

    .service-actions {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.5rem;
      position: absolute;
      bottom: 0.5rem; right: 20px;

      button {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        border: 0.5px solid #eee;
        background: #fff;
        font-size: clamp(10px, 2vw, 14px);
        font-weight: 500;
        color: #555;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bolder;

        &:hover {
          background: #222;
          color: #f7f7f7;
          border-color: #222;
        }
      }

    }
    
  }

  .service-info {
    flex: 1;
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    padding: 1.5rem;
    gap: 0.6rem;

    justify-content: space-between;

    font-size: clamp(12px, 2vw, 16px);

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      flex: 6;

      h3 {
        font-size: clamp(14px, 2.5vw, 17px);
        line-height: 1.0;
        font-weight: bolder;
      }
      p {
        color: #555;
        font-size: clamp(10px, 2vw, 14px);
        font-weight: 500;
      }
    }

    .actions {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      height: 100%;
      justify-content: center;

      a {
        display: inline-block;
        font-size: clamp(10px, 2vw, 14px);
        font-weight: bolder;
        color: #999;

        transition: all 0.3s ease;

        &:hover {
          text-decoration: underline;
          color: #111;
        }
      }

    }


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
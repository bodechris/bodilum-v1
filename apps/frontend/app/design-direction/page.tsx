import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import LocalizedServicePrice from '../services/LocalizedServicePrice';
import { designDirectionData } from './designDirectionData';


function DesignDirectionPage() {  

  return (
    <DesignDirectionWrapper>
      {
        designDirectionData.map((item) => (
          <DesignDirectionItem key={item.id} title={item.title} description={item.description} category={item.category || ''} thumbnails={item.thumbnails || []} layout={ item.layout || 'layout-1' } price={item.price} />
        ))
      }
    </DesignDirectionWrapper>
  )
}

export default DesignDirectionPage;

const DesignDirectionWrapper = styled.div`
  --design-card-height: 44rem;

  width: 95%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  grid-auto-rows: var(--design-card-height);
  gap: 2rem;
  padding: 1.25rem;
  margin: 5rem 0 10rem 0;

  @media all and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    gap: 3.125rem;
  }

`;
type DesignDirectionItemProps = PropsWithChildren<{
  key: number;
  title: string;
  description: string;
  category: string;
  thumbnails: string[];
  layout?: string;
  price?: string;
}>;
const DesignDirectionItem = ({ title, description, category, thumbnails, layout='layout-1', price }: DesignDirectionItemProps) => {
    return (
        <DesignDirectionItemWrapper>
          <Link className={`design-direction-preview-images ${layout}`} href={`/design-direction/${title.toLowerCase().replace(/\s/g, '-')}`}>
            {
              thumbnails.map((thumbnail, index) => (
                <div className="img-itm" key={index}><img src={thumbnail} alt={`${title} thumbnail ${index + 1}`} /></div>
              ))
            }
          </Link>
          <div className="info-price-panel">
            <div className="info-panel">
              <h3>{title}</h3>
              <p>{category}</p>
            </div>
            <div className="price-panel">
              <div className="price"><LocalizedServicePrice price={price} /></div>
            </div>
          </div>
          <div className="cta-panel">
            <Link href={`/design-direction/${title.toLowerCase().replace(/\s/g, '-')}`}><span>View Details</span></Link>
            <Link className="primary-btn" href={`/contact?subject=Inquiry about ${title} design direction`}><span>Request Design</span></Link>
          </div>
        </DesignDirectionItemWrapper>
    );
}

type DesignDirectionItemWrapperProps = {
}
const DesignDirectionItemWrapper = styled.div<DesignDirectionItemWrapperProps>`
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: var(--design-card-height);
  background-color: #fff;
  border: 3px solid #fff;
  border-radius: 30px;
  box-shadow: 0 20px 40px 40px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  .design-direction-preview-images {
    width: 100%;
    min-height: 0;
    height: 100%;
    max-height: none;
    flex: 1 1 auto;
    position: relative;
    display: grid;
    // border: 5px solid red;

    overflow: hidden !important;
    background: #fff;

    img, video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border: 2px solid #fff;
    }

    &.layout-1 {
      aspect-ratio: 1 / 1;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      
    }

    &.layout-1 .img-itm:nth-child(1) {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    &.layout-1 .img-itm:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }

    &.layout-1 .img-itm:nth-child(3) {
      grid-column: 2;
      grid-row: 2;
    }

    &.layout-1 .img-itm:nth-child(4) {
      grid-column: 2;
      grid-row: 3;
    }


    &.layout-2 {
      aspect-ratio: 1.22 / 1;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    &.layout-2 .img-itm:nth-child(1) {
      grid-column: 1 / span 3;
      grid-row: 1 / span 3;
    }

    &.layout-2 .img-itm:nth-child(2) {
      grid-column: 4 / span 3;
      grid-row: 1 / span 3;
    }

    &.layout-2 .img-itm:nth-child(3) {
      grid-column: 1 / span 2;
      grid-row: 4 / span 2;
    }

    &.layout-2 .img-itm:nth-child(4) {
      grid-column: 3 / span 2;
      grid-row: 4 / span 2;
    }

    &.layout-2 .img-itm:nth-child(5) {
      grid-column: 5 / span 2;
      grid-row: 4 / span 2;
    }



    &.layout-3 {
      aspect-ratio: 1 / 1;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: repeat(2, 1fr);
    }

    &.layout-3 .img-itm:nth-child(1) {
      grid-column: 1;
      grid-row: 1 / span 2;
    }

    &.layout-3 .img-itm:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }

    &.layout-3 .img-itm:nth-child(3) {
      grid-column: 2;
      grid-row: 2;
    }



    &.layout-4 {
      aspect-ratio: 1 / 1;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    &.layout-4 .img-itm {
      position: relative;
    }

    &.layout-4 .caption.top-right {
      top: 16px;
      right: 16px;
    }

    &.layout-4 .caption.bottom-left {
      left: 16px;
      bottom: 16px;
    }

    &.layout-4 .caption.bottom-center {
      left: 50%;
      bottom: 16px;
      transform: translateX(-50%);
    }

    &.layout-4 .caption.bottom-right {
      right: 16px;
      bottom: 16px;
    }




    &.layout-5 {
      aspect-ratio: 1.18 / 1;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: 2fr 1fr;
    }

    &.layout-5 .img-itm:nth-child(1) {
      grid-column: 1 / span 3;
      grid-row: 1;
    }

    &.layout-5 .img-itm:nth-child(2) {
      grid-column: 4 / span 3;
      grid-row: 1;
    }

    &.layout-5 .img-itm:nth-child(3) {
      grid-column: 1 / span 2;
      grid-row: 2;
    }

    &.layout-5 .img-itm:nth-child(4) {
      grid-column: 3 / span 2;
      grid-row: 2;
    }

    &.layout-5 .img-itm:nth-child(5) {
      grid-column: 5 / span 2;
      grid-row: 2;
    }

  }

  .info-price-panel {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex: 2;
    gap: 5px;

    
    
    .info-panel {
      flex: 2;
      font-size: clamp(10px, 2.5vw, 20px);
      font-weight: bolder;
      line-height: 1.0;
      letter-spacing: -0.02em;
      text-transform: capitalize;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      // background: pink;

      p {
        margin-top: 0.5rem;
        font-size: clamp(8px, 1.5vw, 14px);
        color: #ccc;
      }
    }
    .price-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      // background: skyblue;
      padding-right: 20px;

      .price {
        width: 100%;
        text-align: right;
        font-size: clamp(13px, 2vw, 18px);
        line-height: 1.2;
        font-weight: 500;
      }
    }
  }


  .cta-panel {
    width: 100%;
    display: flex;    
    flex: 3;
    background: #f7f7f7;
    flex-wrap: wrap;
    flex-direction: column;

    a {
      width: 100%;
      height: 100%;
      font-size: clamp(14px, 1.5vw, 16px);
      text-transform: uppercase;
      font-weight: bolder;
      color: #333;
      flex: 1;
      text-align: center;
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;

      min-height: 3.5rem;
      border-right: none;
      border-bottom: 0.5px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: #000;
        background: #e0e0e0;
      }

      &.primary-btn {
        background: #fff;
        color: #333;
        &:hover {
          background: #000;
          color: #fff;
        }
      }
    }
  }

  border-radius: 22px;

  .design-direction-preview-images {
    min-height: 0;
  }

  .info-price-panel {
    flex-direction: column;
    gap: 0;

    .info-panel,
    .price-panel {
      width: 100%;
      padding: 1rem 1rem 0;
    }

    .info-price-panel {
      .info-panel {
        p {
          margin-top: 0.35rem;
        }
      }

      .price-panel {
        align-items: flex-start;
        padding-bottom: 1rem;

        .price {
          text-align: left;
        }
      }
    }

  @media all and (min-width: 768px) {
    border-radius: 30px;

    .info-price-panel {
      flex-direction: row;
      gap: 5px;

      .info-panel {
        width: auto;
        padding: 20px;

        p {
          margin-top: 0.5rem;
        }
      }

      .price-panel {
        width: auto;
        align-items: flex-end;
        padding: 0 20px 0 0;

        .price {
          text-align: right;
        }
      }
    }

    .cta-panel {
      flex-direction: row;

      a {
        border-right: 0.5px solid #eee;
        border-bottom: none;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;
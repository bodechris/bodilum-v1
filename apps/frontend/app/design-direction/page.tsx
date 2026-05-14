import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import LocalizedServicePrice from '../services/LocalizedServicePrice';

type DesignDirectionDataType = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnails: string[];
  layout?: string;
  price?: string;
  timeline?: string;
  bestFor?: string;
  faqs?: { question: string; answer: string }[];
}
function DesignDirectionPage() {
  const designDirectionData: DesignDirectionDataType[] = [
    {
      id: 1,
      title: 'savanah nest brand identity',
      description: 'Description for Design Direction 1',
      category: 'Real Estate',
      layout: 'layout-5',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",
      thumbnails: [
        '/images/real-estate-savanah-nest/savanah-nest-img-8.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-9.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-10.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-11.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-12.webp',
      ]
    },
    {
      id: 2,
      title: 'moria beauty brand identity',
      description: 'Description for Design Direction 2',
      category: 'Beauty',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      thumbnails: [
        '/images/beauty-moria/mori-logo-bg-1.webp',
        '/images/beauty-moria/moria-img-1.webp',
        '/images/beauty-moria/moria-img-2.webp',
        '/images/beauty-moria/moria-img-3.webp',
        '/images/beauty-moria/moria-img-4.webp',
        '/images/beauty-moria/moria-img-5.webp',
        '/images/beauty-moria/moria-img-6.webp',
        '/images/beauty-moria/moria-img-7.webp',
        '/images/beauty-moria/moria-img-8.webp',
      ]
    },
    {
      id: 3,
      title: 'Yossi beauty brand identity',
      description: 'Description for Design Direction 3',
      category: 'Beauty',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      thumbnails: [
        '/images/beauty-yossi/yossi-img-3.webp',
        '/images/beauty-yossi/yossi-img-1.webp',
        '/images/beauty-yossi/yossi-img-5.webp',
        '/images/beauty-yossi/yossi-img-4.webp',
        '/images/beauty-yossi/yossi-img-6.webp',
        '/images/beauty-yossi/yossi-img-7.webp',
        '/images/beauty-yossi/yossi-img-8.webp',
        '/images/beauty-yossi/yossi-img-9.webp',
        '/images/beauty-yossi/yossi-img-10.webp',
        '/images/beauty-yossi/yossi-img-11.webp',
        '/images/beauty-yossi/yossi-img-12.webp',
      ]
    },
    {
      id: 4,
      title: 'Moveasi brand identity',
      description: 'Description for Design Direction 4',
      category: 'Tech & Saas',
      layout: 'layout-3',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      thumbnails: [
        '/images/tech-saas-moveasi/moveasi-img-4.webp',
        '/images/tech-saas-moveasi/moveasi-img-2.webp',
        '/images/tech-saas-moveasi/moveasi-img-3.webp',
        '/images/tech-saas-moveasi/moveasi-img-1.webp',
        '/images/tech-saas-moveasi/moveasi-img-5.webp',
        '/images/tech-saas-moveasi/moveasi-img-6.webp',
        '/images/tech-saas-moveasi/moveasi-img-7.webp',
        '/images/tech-saas-moveasi/moveasi-img-8.webp',
        '/images/tech-saas-moveasi/moveasi-img-9.webp',
        '/images/tech-saas-moveasi/moveasi-img-10.webp',
        '/images/tech-saas-moveasi/moveasi-img-11.webp',
        '/images/tech-saas-moveasi/moveasi-img-12.webp',
      ]
    },
    {
      id: 5,
      title: 'Mormon brand identity',
      description: 'Description for Design Direction 5',
      category: 'Real Estate',
      layout: 'layout-5',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",
      thumbnails: [
        '/images/real-estate-mormon/mormon-img-22.webp',
        '/images/real-estate-mormon/mormon-img-2.webp',
        '/images/real-estate-mormon/mormon-img-3.webp',
        '/images/real-estate-mormon/mormon-img-1.webp',
        '/images/real-estate-mormon/mormon-img-5.webp',
        '/images/real-estate-mormon/mormon-img-6.webp',
        '/images/real-estate-mormon/mormon-img-7.webp',
        '/images/real-estate-mormon/mormon-img-8.webp',
        '/images/real-estate-mormon/mormon-img-9.webp',
        '/images/real-estate-mormon/mormon-img-10.webp',
        '/images/real-estate-mormon/mormon-img-11.webp',
        '/images/real-estate-mormon/mormon-img-12.webp',
      ]
    },
    {
      id: 6,
      title: 'Fleoxx brand identity',
      description: 'Description for Design Direction 6',
      category: 'Tech & Saas',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      thumbnails: [
        '/images/tech-saas-fleoxx/fleoxx-img-1.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-13.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-9.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-10.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-11.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-12.webp',
      ]
    },
  ];

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
  width: 95%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-template-rows: 600px;
  gap: 50px;
  padding: 20px;
  margin: 5rem 0 10rem 0;

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
  height: 100%;
  background-color: #fff;
  border: 0.5px solid #f7f7f7;
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
    height: 100%;
    max-height: 500px;
    flex: 10;
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



    .layout-4 {
      aspect-ratio: 1 / 1;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    .layout-4 .item {
      position: relative;
    }

    .layout-4 .caption.top-right {
      top: 16px;
      right: 16px;
    }

    .layout-4 .caption.bottom-left {
      left: 16px;
      bottom: 16px;
    }

    .layout-4 .caption.bottom-center {
      left: 50%;
      bottom: 16px;
      transform: translateX(-50%);
    }

    .layout-4 .caption.bottom-right {
      right: 16px;
      bottom: 16px;
    }




    .layout-5 {
      aspect-ratio: 1.18 / 1;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: 2fr 1fr;
    }

    .layout-5 .item:nth-child(1) {
      grid-column: 1 / span 3;
      grid-row: 1;
    }

    .layout-5 .item:nth-child(2) {
      grid-column: 4 / span 3;
      grid-row: 1;
    }

    .layout-5 .item:nth-child(3) {
      grid-column: 1 / span 2;
      grid-row: 2;
    }

    .layout-5 .item:nth-child(4) {
      grid-column: 3 / span 2;
      grid-row: 2;
    }

    .layout-5 .item:nth-child(5) {
      grid-column: 5 / span 2;
      grid-row: 2;
    }

  }

  .info-price-panel {
    width: 100%;
    height: 100%;
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
    flex: 1;
    background: #f7f7f7;
    a {
      width: 100%;
      height: 100%;
      font-size: clamp(10px, 1.5vw, 14px);
      text-transform: uppercase;
      font-weight: bolder;
      color: #333;
      flex: 1;
      text-align: center;
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;

      border-right: 0.5px solid #eee;
      &:last-child {
        border-right: none;
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
`;
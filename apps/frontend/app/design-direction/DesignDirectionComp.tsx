import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { DesignDirectionDataType } from './designDirectionData';
import LocalizedServicePrice from '../services/LocalizedServicePrice';
import DesignDirectionRequestButton from './DesignDirectionRequestButton';

type DesignDirectionCompProps = PropsWithChildren & DesignDirectionDataType;
function DesignDirectionComp(props: DesignDirectionCompProps) {
    const { title, description, category, layout, price, timeline, bestFor, thumbnails, sections } = props;
  return (
    <DesignDirectionCompWrapper>
       <div className="design-card-header">
        <h1>{title}</h1>
        <p>{description}</p>
       </div>
       <div className="design-card-item cover">
        <div className="bg-cover">
            <img src={typeof sections?.cover?.mainImg === 'string' ? sections.cover.mainImg : ''} alt="Design Direction Cover"/>
        </div>
        <div className="cover-info">
            <div className="cover-info__item">
                <h4>Overview</h4>
                {
                    sections && sections.cover && sections.cover.overview && sections.cover.overview.length > 0 ? (
                        sections.cover.overview.map((sentence: string, index: number) => (
                            <p key={index}>{sentence}</p>
                        ))
                    ) : null
                }
            </div>
            <div className="cover-info__item">
                <h4>Highlights</h4>
                <ul>
                    {sections && sections.cover && sections.cover.highlights && sections.cover.highlights.length > 0 ? (
                        sections.cover.highlights.map((highlight: string, index: number) => (
                            <li key={index}>{highlight}</li>
                        ))
                    ) : null}
                </ul>
            </div>
            <div className="cover-info__item">
                <h4>Process</h4>
                <ul>
                    {sections && sections.cover && sections.cover.process && sections.cover.process.length > 0 ? (
                        sections.cover.process.map((step: string, index: number) => (
                            <li key={index}>{step}</li>
                        ))
                    ) : null}
                </ul>
            </div>
            <div className="cover-info__item">
                <h4>What you get</h4>
                <ul>
                    {sections && sections.cover && sections.cover.outcomes && sections.cover.outcomes.length > 0 ? (
                        sections.cover.outcomes.map((outcome: string, index: number) => (
                            <li key={index}>{outcome}</li>
                        ))
                    ) : null}
                </ul>
            </div>
        </div>

        <div className="cover-price-and-cta">
            <b>Customise this direction from</b>
            <div className="price">
                <LocalizedServicePrice price={price || ''} />
            </div>
            <DesignDirectionRequestButton className="cta-button" direction={props}>Request a custom design</DesignDirectionRequestButton>
        </div>

        <div className="all-designs-preview">
            <div className="designs-preview__grid masonry">
                <div className="masonry-item item-1"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[0] ? sections.cover.previewImgs[0] : ''} alt="Design 1"/></div>
                <div className="masonry-item item-2"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[1] ? sections.cover.previewImgs[1] : ''} alt="Design 2"/></div>
                <div className="masonry-item item-3"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[2] ? sections.cover.previewImgs[2] : ''} alt="Design 3"/></div>
                <div className="masonry-item item-4"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[3] ? sections.cover.previewImgs[3] : ''} alt="Design 4"/></div>
                <div className="masonry-item item-5"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[4] ? sections.cover.previewImgs[4] : ''} alt="Design 5"/></div>
                <div className="masonry-item item-6"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[5] ? sections.cover.previewImgs[5] : ''} alt="Design 6"/></div>
                <div className="masonry-item item-7"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[6] ? sections.cover.previewImgs[6] : ''} alt="Design 7"/></div>
                <div className="masonry-item item-8"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[7] ? sections.cover.previewImgs[7] : ''} alt="Design 8"/></div>
                <div className="masonry-item item-9"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[8] ? sections.cover.previewImgs[8] : ''} alt="Design 9"/></div>
                <div className="masonry-item item-10"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[9] ? sections.cover.previewImgs[9] : ''} alt="Design 10"/></div>
                <div className="masonry-item item-11"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[10] ? sections.cover.previewImgs[10] : ''} alt="Design 11"/></div>
                <div className="masonry-item item-12"><img src={sections && sections.cover && sections.cover.previewImgs && sections.cover.previewImgs[11] ? sections.cover.previewImgs[11] : ''} alt="Design 12"/></div>
            </div>
        </div>
       </div>       

       {/* <div className="design-card-item cover">
        <h2>Logo + Brand discovery + Brand colors + Typography</h2>
       </div> */}
    </DesignDirectionCompWrapper>
  )
}

export default DesignDirectionComp;

const DesignDirectionCompWrapper = styled.div`
  width: 95%;
  margin: 5rem auto 10rem auto;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 5rem;

  .design-card-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    align-items: center;
    justify-content: center;

    h1 {
        max-width: 800px;
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.2;
        font-weight: bolder;
        text-transform: capitalize;
    }
    p {
        max-width: 600px;
        font-size: clamp(10px, 2.0vw, 15px);
        line-height: 1.5;
        color: #555;
        // background: pink;
    }
  }

  .design-card-item {
    width: 100%;
    min-height: 50vh;
    background: #fff;
    border: 0.5px solid #f7f7f7;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 40px 50px 2px rgba(0, 0, 0, 0.05);
  }


    .cover {
        height: auto;
        display: grid;
        grid-template-rows: auto auto auto;
        position: relative;

        .cover-price-and-cta {
            width: 100%;
            display: flex;
            position: relative;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 0 6rem 0;
            gap: 1rem;

            .price {
                font-size: clamp(1.5rem, 3vw, 2rem);
                font-weight: bolder;
                position: relative;
            }
            .cta-button {
                cursor: pointer;
                padding: 1rem 2rem;
                border-radius: 40px;
                border: 2px solid #222;
                background: #222;
                color: #ccc;
                font-weight: bold;
                border-radius: 40px;
                transition: all 0.3s ease-in-out;
                position: relative;

                text-transform: capitalize;

                &:hover {
                    background: #000;
                    color: #fff;
                }
            }
        }
    }

  .bg-cover {
    width: 100%;
    height: 60vh;
    position: relative;
  }

  .bg-cover img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .cover-info {
    width: 100%;
    padding: 4rem;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cover-info h4,
  .cover-info p,
  .cover-info li {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
  }

  .cover-info h4 {
    margin-bottom: 0.75rem;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .cover-info ul {
    margin: 0;
    padding-left: 1.2rem;
  }


  .cover-info__item {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
    }

    ul {
       padding-left: 0;
       position: relative;
       display: flex;
       flex-direction: column;
       gap: 0.75rem;
       margin: 0;
        li {
            position: relative;
            margin-left: 1.5rem;

            &::before {
                content: '';
                border-left: 6px solid #222;
                position: absolute;
                left: -1.5rem;
                top: 10px;
                height: 8px;
            }
        }
    }

  }

  .all-designs-preview {
    width: 100%;
    position: relative;
    // background: pink;
  }

  .designs-preview__grid.masonry {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    // gap: 16px;
  }

  .masonry-item {
    overflow: hidden;
    background: #fff;
  }

  .masonry-item img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  @media (min-width: 481px) {
    .bg-cover {
    //   height: 320px;
    }

    .cover-info {
        grid-template-columns: 1fr 1fr;
    }

    .designs-preview__grid.masonry {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 120px;
    //   gap: 16px;
    }

    .masonry-item img {
      height: 100%;
      aspect-ratio: auto;
    }

    .item-1,
    .item-6,
    .item-11 {
      grid-column: span 4;
      grid-row: span 2;
    }

    .item-2,
    .item-3,
    .item-4,
    .item-5,
    .item-8,
    .item-9,
    .item-10,
    .item-12 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-7 {
      grid-column: span 2;
      grid-row: span 4;
    }
  }

  @media (min-width: 769px) {
    .bg-cover {
    //   height: 360px;
    }

    .cover-info {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .designs-preview__grid.masonry {
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: 90px;
    }

    .item-1,
    .item-6,
    .item-11 {
      grid-column: span 6;
      grid-row: span 2;
    }

    .item-2,
    .item-3,
    .item-4,
    .item-5,
    .item-8,
    .item-9,
    .item-10,
    .item-12 {
      grid-column: span 3;
      grid-row: span 2;
    }

    .item-7 {
      grid-column: span 3;
      grid-row: span 4;
    }
  }

  @media (min-width: 1201px) {
    .bg-cover {
    //   height: 260px;
    }

    .designs-preview__grid.masonry {
      width: 100%;
      grid-template-columns: repeat(8, 1fr);
      grid-auto-rows: 150px;
      gap: 5px;
    }

    .item-1 {
      grid-column: span 4;
      grid-row: span 2;
    }

    .item-2 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-3 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-4 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-5 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-6 {
      grid-column: span 4;
      grid-row: span 2;
    }

    .item-7 {
      grid-column: span 2;
      grid-row: span 4;
    }

    .item-8 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-9 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-10 {
      grid-column: span 2;
      grid-row: span 2;
    }

    .item-11 {
      grid-column: span 4;
      grid-row: span 2;
    }

    .item-12 {
      grid-column: span 2;
      grid-row: span 2;
    }
  }
`;
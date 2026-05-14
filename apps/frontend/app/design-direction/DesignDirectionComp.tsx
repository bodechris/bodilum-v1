import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type DesignDirectionCompProps = PropsWithChildren<{}>;
function DesignDirectionComp(props: DesignDirectionCompProps) {
  return (
    <DesignDirectionCompWrapper>
       <div className="design-card-item cover">
        <div className="bg-cover">
            <img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design Direction Cover"/>
        </div>
        <div className="cover-info">
            <div className="cover-info__item">
                <h4>Overview</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="cover-info__item">
                <h4>Highlights</h4>
                <ul>
                    <li>Brand Identity Design</li>
                    <li>Logo Design</li>
                    <li>Color Palette Development</li>
                    <li>Typography Selection</li>
                    <li>Visual Style Guide Creation</li>
                </ul>
            </div>
        </div>
        <div className="all-designs-preview">
            <div className="designs-preview__grid masonry">
                <div className="masonry-item item-1"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 1"/></div>
                <div className="masonry-item item-2"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 2"/></div>
                <div className="masonry-item item-3"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 3"/></div>
                <div className="masonry-item item-4"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 4"/></div>
                <div className="masonry-item item-5"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 5"/></div>
                <div className="masonry-item item-6"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 6"/></div>
                <div className="masonry-item item-7"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 7"/></div>
                <div className="masonry-item item-8"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 8"/></div>
                <div className="masonry-item item-9"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 9"/></div>
                <div className="masonry-item item-10"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 10"/></div>
                <div className="masonry-item item-11"><img src="/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp" alt="Design 11"/></div>
            </div>
        </div>
       </div>

       <div className="design-card-item cover">
        <h2>Logo + Brand discovery + Brand colors + Typography</h2>
       </div>
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
    padding: 32px;
    position: relative;
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
    .item-10 {
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
    .item-10 {
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
  }
`;
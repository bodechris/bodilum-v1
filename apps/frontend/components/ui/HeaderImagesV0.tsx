'use client'

import styled from 'styled-components';
import ImageCardV0 from './ImageCardV0';

function HeaderImagesV0() {
  return (
    <HeaderImagesV0Wrapper>
        <div className="featured-works">
            <ImageCardV0 offsetX={-30} offsetY={4} rotation={15} imageUrl='img-9.jpg' />
            <ImageCardV0 offsetX={-20} offsetY={5} rotation={15} imageUrl='img-11.jpg' />
            <ImageCardV0 offsetX={-10} rotation={-5} />
            <ImageCardV0 offsetX={5} rotation={-10} imageUrl='img-8.jpg' />
            <ImageCardV0 offsetX={15} rotation={-15} imageUrl='img-7.jpg' />
        </div>
    </HeaderImagesV0Wrapper>
  )
}

export default HeaderImagesV0;

const HeaderImagesV0Wrapper = styled.div`
width: 100%;
height: 70vh;   
display: flex;
overflow: hidden;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: 1;
position: absolute;
top: 0; left: 0;

.featured-works {
  width: max-content;
  height: max-content;
  display: flex;
  justify-content: center;
  position: relative;
//   border: 5px solid pink;
  transform: translateY(-60vh);
}
`;
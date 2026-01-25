'use client'

import styled from "styled-components";
import Image from "next/image";

type ImageCardV0Props = {
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  imageUrl?: string;
  bgColor?: string;
}

function ImageCardV0({ offsetX = 0, offsetY = 0, rotation = 0, imageUrl = "img-1.jpg", bgColor="#fff" }: ImageCardV0Props) {
  return (
    <ImageCardV0Wrapper offsetx={offsetX} offsety={offsetY} rotation={rotation} bgcolor={bgColor}>
        <Image src={`/${imageUrl}`} alt="Sample Image" width={800} height={800} />
    </ImageCardV0Wrapper>
  )
}

export default ImageCardV0;

type ImageCardV0WrapperProps = {
  offsetx: number;
  offsety: number;
  rotation: number;
  bgcolor: string;
}
const ImageCardV0Wrapper = styled.div<ImageCardV0WrapperProps>`
width: min(300px, 80vw);
height: 400px;
background: ${props => props.bgcolor};
border-radius: 10px;
margin: 10px;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
position: absolute;
top: 0; left:0;
// border: 0.5px solid #ccc3;
outline: 0.6rem solid #ffff;

overflow: hidden;

transform-origin: center center;
transform: rotate(${props => props.rotation}deg) translateX(${props => props.offsetx}vw) translateY(${props => props.offsety}vw);

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
}

-webkit-box-shadow: 20px 25px 45px 2px rgba(0,0,0,0.09);
-moz-box-shadow:    20px 25px 45px 2px rgba(0,0,0,0.09);
box-shadow:         20px 25px 45px 2px rgba(0,0,0,0.09); 

`;
import SvgIcons from './SvgIcons';
import styled from 'styled-components';
import React from 'react';

type BxPreloaderWrapperType = {
  type?: string,
  width?: number
}

const BxPreloaderWrapper = styled.div<BxPreloaderWrapperType>`
  margin: 0 auto;
  width: 100%;
  height: clamp(200px, 100vh, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .bx-preloader-0 {
    // border: 5px solid green;
    
    // width: clamp(20px, 10vw, 50px);
    ${({ type, width }) => {
      if (type === "default") return `width: clamp(20px, 10vw, 50px);`

      if (type === "bar1") return `width: `+ width +`%;`;
    }}
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    span {
      text-align: center;
      font-weight: bolder;
      width: min(70vw, 250px);
      // background: blue;
    }
    svg {
      width: 100%;
      height: auto;
    }
  }

  .bx-preloader-1 {
    width: clamp(150px, 100%, 500px);   
    height: clamp(150px, 60vh, 300px);    
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 20px;

    span {
      width: 100%;
      height: auto;
      display: flex;
      position: relative;
      // border: 1px solid pink;
      // font-weight: 400;
      font-size: clamp(8px, 1vw, 12px);
      color: #bbb;
    }

    .bx-preloader-item {
      width: 100%;
      height: auto;
      display: flex;
      position: relative;
      gap: 15px;

      .simple-profile {
        position: relative;
        width: clamp(50px, 20vw, 100px);
        height: clamp(50px, 20vw, 100px);
        border-radius: 200px;

        background-color: #eee;

        background-image: -webkit-gradient( linear, left center, right center, from(#eee), color-stop(.2, #d7d7d7), color-stop(.4, #eee), to(#eee));
        background-image: -webkit-linear-gradient( left, #eee 0%, #d7d7d7 20%, #eee 40%, #eee 100%);
        background-repeat: no-repeat;
        background-size: 800px 100%;

        animation: placeHolderShimmer 2s linear infinite forwards;
      }
      ul {
        margin: 0;
        width: 100%;
        height: auto;
        position: relative;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 5px;
        li {
          width: 100%;
          height: clamp(4px, 5vw, 8px);
          border-radius: 20px;

          background-color: #eee;

          background-image: -webkit-gradient( linear, left center, right center, from(#eee), color-stop(.2, #d7d7d7), color-stop(.4, #eee), to(#eee));
          background-image: -webkit-linear-gradient( left, #eee 0%, #d7d7d7 20%, #eee 40%, #eee 100%);
          background-repeat: no-repeat;
          background-size: 800px 100%;
          animation: placeHolderShimmer 1s linear infinite forwards;
        }
        li:last-of-type {
          width: 60%;
        }
      }
    }
    .bx-preloader-item.has-profile {
      ul {
        width: clamp(calc( 100% - 50px ), calc( 100% - 20vw ), calc( 100% - 100px ));
        li {
        }
        li:last-of-type {
        }
      }
    }
  }


  @keyframes placeHolderShimmer {
    0% {
      background-position: -600px 0
    }
    100% {
      background-position: 600px 0
    }
  }
  @-webkit-keyframes placeHolderShimmer {
    0% {
      background-position: -600px 0
    }
    100% {
      background-position: 600px 0
    }
  }


`;


type BxPreloadersType = {
  desc?: string | string[],
  text?: string,
  width?: number,
  type?: string
}
function BxPreloaders({ desc="simple", text, width=100, type="default" }: BxPreloadersType) {
  /**
   * Component for custom preloaders
   * Default : desc = "simple" ... standard preloader
   * Facebook-like preloader : desc = ["profile:2", "content:3"] ... profile puts a 2 column circle and text-placeholder bars
   */

  // function to generate bars and return jsx 
  const renderBars = ( numOfBars = 3 ) => {
    return(
      <ul className='bars'>
         { Array.from({length:numOfBars}, (_, i) => (<li key={i}></li>)) }
     </ul>
    )
  }
  return (
    <BxPreloaderWrapper aria-hidden="true" width={ width } type={type}>
      {
        (typeof( desc ) === "string" && desc === "simple")
        && 
        <div className='bx-preloader-0'>
          {
            (text && typeof(text) === "string") && <span>{ text }</span>
          }   
          {
            type === "default" && <SvgIcons name="loading-anim-1" />
          }       
          {
            type === "bar1" && <BarLoaderV1 />
          }       
        </div>
      }
      {
        Array.isArray( desc ) 
        && 
        <div className='bx-preloader-1'>
          {
            text && <span>{text}</span>
          }
          {
            desc.map( (v, i) => {
              let val = v.split(":"); //
              let jsx; 
              const noOfBars = parseInt(val[1] ?? "3") || 3;
    
              if( val.includes('profile')) {
                jsx = <div className='bx-preloader-item has-profile' key={ i }>
                  <div className='simple-profile'></div>
                  { renderBars( noOfBars ) }
                  </div>
              }
              if( val.includes('content')) {
                jsx = <div className='bx-preloader-item' key={ "content-" + i }>
                  { renderBars( noOfBars ) }
                  </div>
              }
    
              return jsx
            })
          }
        </div>
      }
      
    </BxPreloaderWrapper>
  )
}

export default BxPreloaders;


const BarLoaderV1 = styled.div`
margin: 0 auto;
width: 100%;
height: 7px;
border-radius: 7px;
overflow: hidden;
border: 0.5px solid #ccc;
background: linear-gradient(to right, #aaa, #fff, #aaa, #fff, #aaa);
background-size: 300% 100%;

// animation: gradAnim1 8s cubic-bezier(0.16, 1, 0.3, 1) infinite forwards;
animation: gradAnim1 10s ease-in-out infinite forwards;

@keyframes gradAnim1 {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -300%;
  }
}
@-webkit-keyframes gradAnim1 {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -300%;
  }
}
`;
'use client'

import { useState, useEffect } from 'react';

export default function useWindowResize() { 

    let [screenDimensions, setScreenDimensions] = useState([0, 0]);

    
// add scroll event listener
useEffect(() => {
    // set initial dimensions
    setScreenDimensions([window.innerWidth,  window.innerHeight]);
    const windowResizeListener = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setScreenDimensions([width, height]);
    }

    window.addEventListener("resize", windowResizeListener);

    // clean up resize event listener
    return(() => {
        window.removeEventListener("resize", windowResizeListener);
    });

}, []);
  return screenDimensions;
}

import { useEffect } from 'react';

let locks = 0;
let savedY = 0;

export const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      lockBodyScroll();
    } 
    return () => {
        if(lock) unlockBodyScroll();
    };

  }, [lock]);
}


const lockBodyScroll = () => {

    if( typeof window === 'undefined' ) return;
    if( locks++ > 0 ) return;

    const docEl = document.documentElement;
    const body = document.body;


    // calculate the scroll gap to avoid layout shift
    const scrollBarGap = window.innerWidth - docEl.clientWidth;

    // remember the current scroll position
    savedY = window.scrollY || docEl.scrollTop || body.scrollTop || 0;

    // freeze the page
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${savedY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = `100%`;

    if( scrollBarGap > 0 ) body.style.paddingRight = `${scrollBarGap}px`;
    
}

const unlockBodyScroll = () => {
    if( typeof window === 'undefined' ) return;
    if( --locks > 0 ) return;

    const body = document.body;
    const y = Math.abs( parseInt( body.style.top || '0', 10 ) ) || savedY;

    // unfreeze the page
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.paddingRight = '';


    // restore exact scroll position (instantly)
    window.scrollTo( 0, y );
}
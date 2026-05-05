import { useState, useEffect } from 'react';

export default function useWindowScroll() {
    let [totalWindowScrolled, setTotalWindowScrolled] = useState(0);
    const scrollListener = (e: any) => {
        setTotalWindowScrolled(window.scrollY);
    }

// add scroll event listener
useEffect(() => {
    // console.log('FixedAfterScroll Element Ref: ', elemRef.current.getBoundingClientRect());
    // console.log('FixedAfterScroll Element scrollWidth: ', elemRef.current.scrollWidth);
    // console.log('FixedAfterScroll Element offsetWidth: ', elemRef.current.offsetWidth);
    // console.log('FixedAfterScroll Element clientWidth: ', elemRef.current.clientWidth);

    window.addEventListener("scroll", scrollListener);

    // clean up scroll event listener
    return(() => {
        window.removeEventListener("scroll", scrollListener);
    });

}, []);
  return totalWindowScrolled;
}

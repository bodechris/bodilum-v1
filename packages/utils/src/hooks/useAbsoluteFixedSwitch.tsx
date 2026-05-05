import { useEffect, useRef } from "react";

export const useAbsoluteFixedSwitch = ( threshold=200, offsety=0 ) => {
    const ref = useRef<HTMLDivElement | null >(null);
    const fixedRef = useRef(false);
    let elRect = useRef<DOMRect | null>(null);

    useEffect(() => {
        const el = ref.current!;
        if( !el ) return;

        elRect.current = el.getBoundingClientRect();

        let ticking = false;

        const onScroll = () => {
            if( ticking ) return;
            ticking = true;
            window.requestAnimationFrame( () => {
                const y = window.scrollY || window.pageYOffset;

                if( !fixedRef.current && y >= threshold ) {

                    const parent = el.offsetParent || el.parentElement!;
                    const parentRect = parent.getBoundingClientRect();
                    const rect = el.getBoundingClientRect();
                    
                    // el.style.width = `${rect.width}px`;
                    console.log({parentRect, rect});

                    el.style.position = 'fixed';
                    el.style.transform = `translate( ${-( window.innerWidth - parentRect.width - parentRect.left - 15)}px, ${offsety}px )`;
                    fixedRef.current = true;

                } else if( fixedRef.current && elRect.current && y < threshold ) {

                    const parent = el.offsetParent || el.parentElement!;
                    const parentRect = parent.getBoundingClientRect();
                    const rect = el.getBoundingClientRect();

                    el.style.position = 'absolute';
                    el.style.transform = `translate( 0px, 0px )`;
                    
                    fixedRef.current = false;
                }

                ticking = false;

            } );
        }


        const onResize = () => {
            if( !fixedRef.current ) return;
            const rect = el.getBoundingClientRect();
            el.style.right = `0`;
            el.style.top  = `${rect.top}px`;
        }


        window.addEventListener( 'scroll', onScroll );
        window.addEventListener( 'resize', onResize );

        return () => {
            window.removeEventListener( 'scroll', onScroll );
            window.removeEventListener( 'resize', onResize );
        }


    }, [threshold]);

    return ref;
}

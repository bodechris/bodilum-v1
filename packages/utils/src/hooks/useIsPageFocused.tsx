import { useEffect, useState } from "react";

export function useIsPageFocused(): boolean {
    const [isFocused, setIsFocused] = useState<boolean>(true);

    useEffect(() => {
        if(!window) return;
        const onFocus = () => setIsFocused( true );
        const onBlur = () => setIsFocused( false );
        const onVisibilityChange = () => setIsFocused( document.visibilityState === 'visible' );

        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        window.addEventListener('visibilitychange', onVisibilityChange);

        // clean up
        return(() => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
            window.removeEventListener('visibilitychange', onVisibilityChange);
        });

    }, []);

    return isFocused;
}
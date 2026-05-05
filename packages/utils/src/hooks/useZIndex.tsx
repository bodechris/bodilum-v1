

export default function useZIndex() {
    const allEls: any = [...Array.from(document.querySelectorAll("body *"))];
    let highestZIndexOnPage = Math.max.apply(null, allEls.map( (el: any) => {
        if (el.style.position !== "static") return parseFloat(window.getComputedStyle(el).zIndex) || 1;
    } ));
    return highestZIndexOnPage;
}
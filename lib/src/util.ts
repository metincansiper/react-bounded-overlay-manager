export const copyComponentBoundingBox = (sourceRef: React.RefObject<HTMLElement>, targetRef: React.RefObject<HTMLElement>) => {
    if (sourceRef.current && targetRef.current) {
        const { top, left, width, height } = sourceRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        targetRef.current.style.top = `${top + scrollTop}px`;
        targetRef.current.style.left = `${left + scrollLeft}px`;
        targetRef.current.style.width = `${width}px`;
        targetRef.current.style.height = `${height}px`;
    }
};
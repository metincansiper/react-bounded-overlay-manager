export const getComponentBoundingBoxRelativeToViewport = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) {
        throw new Error('The ref is not attached to any element');
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
        top: top + scrollTop,
        left: left + scrollLeft,
        width,
        height,
    }
};

export const copyComponentBoundingBox = (sourceRef: React.RefObject<HTMLElement>, targetRef: React.RefObject<HTMLElement>) => {
    if (sourceRef.current && targetRef.current) {
        const { top, left, width, height } = getComponentBoundingBoxRelativeToViewport(sourceRef);
        targetRef.current.style.top = `${top}px`;
        targetRef.current.style.left = `${left}px`;
        targetRef.current.style.width = `${width}px`;
        targetRef.current.style.height = `${height}px`;
    }
};
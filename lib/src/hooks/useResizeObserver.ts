import { useEffect } from 'react';

// TODO: use debounce?

type Options = {
    handleResize: (entry: ResizeObserverEntry) => void;
}

function useResizeObserver(
    targetElement: React.RefObject<HTMLElement>, 
    { handleResize }: Options
) {
    useEffect(() => {
        if (!targetElement) return;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                handleResize(entry);
            }
        });

        if (targetElement.current) {
            observer.observe(targetElement.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [targetElement, handleResize]);
}

export default useResizeObserver;

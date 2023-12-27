import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
    handleResize: (entry: ResizeObserverEntry) => void;
}

function useResizeObserver(
    targetElement: React.RefObject<HTMLElement>, 
    { handleResize }: Options
) {
    const debouncedHandleResize = useDebouncedCallback(handleResize, 100);

    useEffect(() => {
        if (!targetElement.current) return;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                debouncedHandleResize(entry);
            }
        });

        observer.observe(targetElement.current);

        return () => {
            observer.disconnect();
        };
    }, [targetElement, debouncedHandleResize]);
}

export default useResizeObserver;

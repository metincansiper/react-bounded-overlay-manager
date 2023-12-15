import { useEffect } from 'react';

interface UseResizeObserverOptions {
    handleResize: (entry: ResizeObserverEntry) => void;
}

function useResizeObserver(
    targetElement: React.RefObject<HTMLElement>, 
    { handleResize }: UseResizeObserverOptions
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

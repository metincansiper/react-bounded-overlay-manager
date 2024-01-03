/// <reference types="react" />
type Options = {
    handleResize: (entry: ResizeObserverEntry) => void;
};
declare function useResizeObserver(targetElement: React.RefObject<HTMLElement>, { handleResize }: Options): void;
export default useResizeObserver;

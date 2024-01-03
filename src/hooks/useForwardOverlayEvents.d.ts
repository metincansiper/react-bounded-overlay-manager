/// <reference types="react" />
type Options = {
    overlayRef: React.RefObject<HTMLElement>;
};
declare const useForwardOverlayEvents: ({ overlayRef }: Options) => void;
export default useForwardOverlayEvents;

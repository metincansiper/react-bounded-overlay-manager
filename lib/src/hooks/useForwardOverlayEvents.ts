import { useEffect } from "react";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";

type Options = {
    overlayRef: React.RefObject<HTMLElement>;
}

const useForwardOverlayEvents = ({ overlayRef }: Options) => {
    const { overlayManagerEventEmitter } = useOverlayManagerContext();
    
    useEffect(() => {   
        const overlayElement = overlayRef.current;

        if (!overlayElement) {
            return;
        }

        const handleMouseleave = (event: MouseEvent) => {
            overlayManagerEventEmitter.emit('mouseleaveOnOverlay', event);
        };

        const handleMousemove = () => {
            overlayManagerEventEmitter.emit('mousemoveOnOverlay');
        };

        overlayElement.addEventListener('mouseleave', handleMouseleave);
        overlayElement.addEventListener('mousemove', handleMousemove);

        return () => {
            overlayElement.removeEventListener('mouseleave', handleMouseleave);
            overlayElement.removeEventListener('mousemove', handleMousemove);
        };
    }, [overlayRef]);
};

export default useForwardOverlayEvents;
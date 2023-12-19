import { useEffect } from "react";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";

type Options = {
    overlayRef: React.RefObject<HTMLElement>;
}

const useForwardOverlayEvents = ({ overlayRef }: Options) => {
    const { overlayManagerEventEmitter, boundingComponentRef } = useOverlayManagerContext();
    
    useEffect(() => {   
        const overlayElement = overlayRef.current;

        if (!overlayElement) {
            return;
        }

        const handleMouseleave = (event: MouseEvent) => {
            const relatedTarget = event.relatedTarget as Node | null;

            // Check if the relatedTarget is the boundingComponent itself or one of its descendants
            if (relatedTarget && (boundingComponentRef.current?.contains(relatedTarget) || boundingComponentRef.current === relatedTarget)) {
                return;
            }

            overlayManagerEventEmitter.emit('mouseleaveOnOverlay');
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
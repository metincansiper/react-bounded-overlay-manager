import { useEffect } from "react";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import TimedEventManager from "../timer/TimedEventManager";

type Options = {
    timedEventManager: TimedEventManager | null;
    showOverlaysOnMouseMove?: boolean;
    hideOverlaysOnMouseLeave?: boolean;
}

const useOverlayManagerEvents = ({ 
    timedEventManager,
    showOverlaysOnMouseMove = true,
    hideOverlaysOnMouseLeave = true,
}: Options) => {
    const { overlayManagerEventEmitter, boundingComponentRef } = useOverlayManagerContext();
    
    useEffect(() => {
        if (timedEventManager === null) {
            return;
        }
        
        const handleMouseMoveOnBoundingComponent = () => {
            if (showOverlaysOnMouseMove) {
                timedEventManager.requestStart();
            }
        };
    
        const handleMouseLeaveOnBoundingComponent = () => {
            if (hideOverlaysOnMouseLeave) {
                timedEventManager.requestStop();
            }
        };

        const handleMouseLeaveOnOverlay = (event: MouseEvent) => {
            if (hideOverlaysOnMouseLeave) {
                const relatedTarget = event.relatedTarget as Node | null;

                // Check if the relatedTarget is the boundingComponent itself or one of its descendants
                if (relatedTarget && (boundingComponentRef.current?.contains(relatedTarget) || boundingComponentRef.current === relatedTarget)) {
                    return;
                }
                
                timedEventManager.requestStop();
            }
        };

        const handleMouseMoveOnOverlay = () => {
            if (showOverlaysOnMouseMove) {
                timedEventManager.requestStart();
            }
        };
    
        overlayManagerEventEmitter.on('mousemoveOnBoundingComponent', handleMouseMoveOnBoundingComponent);
        overlayManagerEventEmitter.on('mouseleaveOnBoundingComponent', handleMouseLeaveOnBoundingComponent);
        overlayManagerEventEmitter.on('mouseleaveOnOverlay', handleMouseLeaveOnOverlay);
        overlayManagerEventEmitter.on('mousemoveOnOverlay', handleMouseMoveOnOverlay);

        return () => {
            overlayManagerEventEmitter.off('mousemoveOnBoundingComponent', handleMouseMoveOnBoundingComponent);
            overlayManagerEventEmitter.off('mouseleaveOnBoundingComponent', handleMouseLeaveOnBoundingComponent);
            overlayManagerEventEmitter.off('mouseleaveOnOverlay', handleMouseLeaveOnOverlay);
            overlayManagerEventEmitter.off('mousemoveOnOverlay', handleMouseMoveOnOverlay);
        };
    }, [timedEventManager, showOverlaysOnMouseMove, hideOverlaysOnMouseLeave]);
};

export default useOverlayManagerEvents;
    
import { useEffect } from "react";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import TimedEventManager from "../timer/TimedEventManager";

type Options = {
    timedEventManager: TimedEventManager | null;
    requestStartOnMouseMove?: boolean;
    requestStopOnMouseMove?: boolean;
}

const useOverlayManagerEvents = ({ 
    timedEventManager,
    requestStartOnMouseMove = true,
    requestStopOnMouseMove = true,
}: Options) => {
    const { overlayManagerEventEmitter, boundingComponentRef } = useOverlayManagerContext();
    
    useEffect(() => {
        if (timedEventManager === null) {
            return;
        }
        
        const handleMouseMoveOnBoundingComponent = () => {
            if (requestStartOnMouseMove) {
                timedEventManager.requestStart();
            }
        };
    
        const handleMouseLeaveOnBoundingComponent = () => {
            if (requestStopOnMouseMove) {
                timedEventManager.requestStop();
            }
        };

        const handleMouseLeaveOnOverlay = (event: MouseEvent) => {
            if (requestStopOnMouseMove) {
                const relatedTarget = event.relatedTarget as Node | null;

                // Check if the relatedTarget is the boundingComponent itself or one of its descendants
                if (relatedTarget && (boundingComponentRef.current?.contains(relatedTarget) || boundingComponentRef.current === relatedTarget)) {
                    return;
                }
                
                timedEventManager.requestStop();
            }
        };

        const handleMouseMoveOnOverlay = () => {
            if (requestStartOnMouseMove) {
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
    }, [timedEventManager, requestStartOnMouseMove, requestStopOnMouseMove]);
};

export default useOverlayManagerEvents;
    
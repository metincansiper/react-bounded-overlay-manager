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
    const { overlayManagerEventEmitter } = useOverlayManagerContext();
    
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

        const handleMouseLeaveOnOverlay = () => {
            if (hideOverlaysOnMouseLeave) {
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
    
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
            timedEventManager.requestStart();
        };
    
        const handleMouseLeaveOnBoundingComponent = () => {
            timedEventManager.requestStop();
        };
    
        overlayManagerEventEmitter.on('mousemoveOnBoundingComponent', handleMouseMoveOnBoundingComponent);
        overlayManagerEventEmitter.on('mouseleaveOnBoundingComponent', handleMouseLeaveOnBoundingComponent);

        return () => {
            overlayManagerEventEmitter.off('mousemoveOnBoundingComponent', handleMouseMoveOnBoundingComponent);
            overlayManagerEventEmitter.off('mouseleaveOnBoundingComponent', handleMouseLeaveOnBoundingComponent);
        }
    }, [timedEventManager, showOverlaysOnMouseMove, hideOverlaysOnMouseLeave]);
};

export default useOverlayManagerEvents;
    
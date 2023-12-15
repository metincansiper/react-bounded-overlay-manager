import { useEffect } from 'react';
import TimedEventManager from '../timer/TimedEventManager';

type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>;
    overlaysContainerRef: React.RefObject<HTMLElement>;
    timedEventManager: TimedEventManager | null;
    showOverlaysOnMouseMove?: boolean;
    hideOverlaysOnMouseLeave?: boolean;
}

const useInteractiveAreaEvents = ({ 
    boundingComponentRef, 
    overlaysContainerRef, 
    timedEventManager,
    showOverlaysOnMouseMove = true,
    hideOverlaysOnMouseLeave = true,
}: Props) => {
    if (timedEventManager === null) {
        return;
    }
    
    const handleMouseMove = () => {
        timedEventManager.requestStart();
    };

    const handleMouseLeave = () => {
        timedEventManager.requestStop();
    };

    useEffect(() => {
        if (showOverlaysOnMouseMove) {
            boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);
            overlaysContainerRef.current?.addEventListener('mousemove', handleMouseMove);
        }

        if (hideOverlaysOnMouseLeave) {
            overlaysContainerRef.current?.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (showOverlaysOnMouseMove) {
                boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
                overlaysContainerRef.current?.removeEventListener('mousemove', handleMouseMove);
            }

            if (hideOverlaysOnMouseLeave) {
                overlaysContainerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            }
            // TODO: check if this is necessary or the cleanup function of useTimedEventManager is enough
            // timedEventManager.requestStop();
        };
    }, [boundingComponentRef, overlaysContainerRef, timedEventManager, showOverlaysOnMouseMove, hideOverlaysOnMouseLeave]);
};

export default useInteractiveAreaEvents;

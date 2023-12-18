import { useEffect } from 'react';
import TimedEventManager from '../timer/TimedEventManager';

type Options = {
    boundingComponentRef: React.RefObject<HTMLElement>;
    timedEventManager: TimedEventManager | null;
    showOverlaysOnMouseMove?: boolean;
    hideOverlaysOnMouseLeave?: boolean;
}

const useSystemEvents = ({ 
    boundingComponentRef, 
    timedEventManager,
    showOverlaysOnMouseMove = true,
    hideOverlaysOnMouseLeave = true,
}: Options) => {
    if (timedEventManager === null) {
        return;
    }
    
    const handleMouseMove = () => {
        timedEventManager.requestStart();
    };

    const handleMouseLeave = (event: any) => {
        // TODO: think about if should handle mousemove in such overlay targets as well?
        const relatedOverlayTarget = event.relatedTarget.closest('.overlay');
        if (relatedOverlayTarget) {
            return;
        }
        timedEventManager.requestStop();
    };

    useEffect(() => {
        if (showOverlaysOnMouseMove) {
            boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);
        }

        if (hideOverlaysOnMouseLeave) {
            boundingComponentRef.current?.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (showOverlaysOnMouseMove) {
                boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
            }

            if (hideOverlaysOnMouseLeave) {
                boundingComponentRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            }
            // TODO: check if this is necessary or the cleanup function of useTimedEventManager is enough
            // timedEventManager.requestStop();
        };
    }, [boundingComponentRef, timedEventManager, showOverlaysOnMouseMove, hideOverlaysOnMouseLeave]);
};

export default useSystemEvents;

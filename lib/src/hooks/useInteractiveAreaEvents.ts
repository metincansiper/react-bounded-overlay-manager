import { useEffect } from 'react';
import TimedEventManager from '../timer/TimedEventManager';

type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>;
    overlaysContainerRef: React.RefObject<HTMLElement>;
    timedEventManager: TimedEventManager | null;
}

const useInteractiveAreaEvents = ({ boundingComponentRef, overlaysContainerRef, timedEventManager }: Props) => {
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
        boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);
        overlaysContainerRef.current?.addEventListener('mousemove', handleMouseMove);
        overlaysContainerRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
            overlaysContainerRef.current?.addEventListener('mousemove', handleMouseMove);
            overlaysContainerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            
            // TODO: check if this is necessary or the cleanup function of useTimedEventManager is enough
            // timedEventManager.requestStop();
        };
    }, [boundingComponentRef, overlaysContainerRef, timedEventManager]);
};

export default useInteractiveAreaEvents;

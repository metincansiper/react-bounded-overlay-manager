import { useEffect } from 'react';
import TimedEventManager from '../timer/TimedEventManager';

type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>;
    timedEventManager: TimedEventManager;
}

const useBoundingComponentEvents = ({ boundingComponentRef, timedEventManager }: Props) => {
    const handleMouseMove = () => {
        timedEventManager.requestStart();
    };

    useEffect(() => {
        boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            // Todo check if this is necessary or if calling requestStop() in cleanup function of useTimedEventManager is enough
            timedEventManager.requestStop(); 
            boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [boundingComponentRef]);
};

export default useBoundingComponentEvents;

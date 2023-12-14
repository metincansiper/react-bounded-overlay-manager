import { useMemo, useEffect } from 'react';
import TimedEventManager, { TimeoutManagerOptions } from '../timer/TimedEventManager';

function useTimedEventManager({ onStart, onStop, timeoutDuration }: TimeoutManagerOptions) {
    const timedEventManager = useMemo(() => {
        return new TimedEventManager({
            onStart,
            onStop,
            timeoutDuration,
        });
    }, [onStart, onStop, timeoutDuration]);

    useEffect(() => {
        // Cleanup function
        return () => {
            timedEventManager.requestStop();
        };
    }, [timedEventManager]);

    return timedEventManager;
}

export default useTimedEventManager;

import { useMemo, useEffect } from 'react';
import TimedEventManager, { TimeoutManagerOptions } from '../timer/TimedEventManager';

type Options = TimeoutManagerOptions & {
    returnNull?: boolean;
};

function useTimedEventManager({ onStart, onStop, timeoutDuration, returnNull = false }: Options) {
    const timedEventManager = useMemo(() => {
        if (returnNull) {
            return null;
        }

        return new TimedEventManager({
            onStart,
            onStop,
            timeoutDuration,
        });
    }, [onStart, onStop, timeoutDuration, returnNull]);

    useEffect(() => {
        return () => {
            timedEventManager?.requestStop();
        };
    }, [timedEventManager]);

    return timedEventManager;
}

export default useTimedEventManager;

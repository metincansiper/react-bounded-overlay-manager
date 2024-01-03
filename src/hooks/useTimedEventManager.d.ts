import TimedEventManager, { TimeoutManagerOptions } from '../timer/TimedEventManager';
type Options = TimeoutManagerOptions & {
    returnNull?: boolean;
};
declare function useTimedEventManager({ onStart, onStop, timeoutDuration, returnNull }: Options): TimedEventManager | null;
export default useTimedEventManager;

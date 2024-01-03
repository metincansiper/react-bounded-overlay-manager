export type TimeoutManagerOptions = {
    onStart: () => void;
    onStop: () => void;
    timeoutDuration: number;
};
export declare const NO_TIMEOUT = -1;
declare class TimedEventManager {
    private onStart;
    private onStop;
    private timeoutDuration;
    private timeoutId;
    constructor({ onStart, onStop, timeoutDuration }: TimeoutManagerOptions);
    requestStart(): void;
    requestStop(): void;
}
export default TimedEventManager;

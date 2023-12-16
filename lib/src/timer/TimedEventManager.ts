export type TimeoutManagerOptions = {
    onStart: () => void;
    onStop: () => void;
    timeoutDuration: number;
};

export const NO_TIMEOUT = -1;

class TimedEventManager {
    private onStart: () => void;
    private onStop: () => void;
    private timeoutDuration: number;
    private timeoutId: any = null;

    constructor({ onStart, onStop, timeoutDuration }: TimeoutManagerOptions) {
        this.onStart = onStart;
        this.onStop = onStop;
        this.timeoutDuration = timeoutDuration;
    }

    public requestStart() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        else {
            this.onStart();
        }
        
        if (this.timeoutDuration === NO_TIMEOUT) {
            this.timeoutId = NO_TIMEOUT;
        }
        else {
            this.timeoutId = setTimeout(() => {
                this.requestStop();
            }, this.timeoutDuration);
        }
    }

    public requestStop() {
        if (!this.timeoutId) {
            return;
        }
        
        if (this.timeoutId !== NO_TIMEOUT) {
            clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = null;
        this.onStop();
    }
}

export default TimedEventManager;
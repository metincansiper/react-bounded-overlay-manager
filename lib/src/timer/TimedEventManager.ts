type Options = {
    onStart: () => void;
    onStop: () => void;
    timeoutDuration: number;
};

class TimedEventManager {
    private onStart: () => void;
    private onStop: () => void;
    private timeoutDuration: number;
    private timeoutId: any = null;

    constructor({ onStart, onStop, timeoutDuration }: Options) {
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
        
        this.timeoutId = setTimeout(() => {
            this.requestStop();
        }, this.timeoutDuration);
    }

    public requestStop() {
        if (!this.timeoutId) {
            return;
        }
        
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.onStop();
    }
}

export default TimedEventManager;
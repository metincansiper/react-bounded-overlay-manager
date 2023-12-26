import TimedEventManager from "../timer/TimedEventManager";

type Options = {
    timedEventManager: TimedEventManager | null;
};

class BoundedOverlayManagerApi {
    private timedEventManager: TimedEventManager | null;

    constructor({ timedEventManager }: Options) {
        this.timedEventManager = timedEventManager;
    }

    public renderOverlays() {
        this.timedEventManager?.requestStart();
    }

    public clearOverlays() {
        this.timedEventManager?.requestStop();
    }
}

export default BoundedOverlayManagerApi;
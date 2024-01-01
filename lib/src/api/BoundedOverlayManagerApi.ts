import TimedEventManager from "../timer/TimedEventManager";

export type BoundedOverlayManagerApiOptions = {
    timedEventManager: TimedEventManager | null;
    updateOverlaysContainerBoundingBox: () => void;
};

class BoundedOverlayManagerApi {
    private timedEventManager: TimedEventManager | null;
    private _updateOverlaysContainerBoundingBox: () => void;

    constructor({ timedEventManager, updateOverlaysContainerBoundingBox }: BoundedOverlayManagerApiOptions) {
        this.timedEventManager = timedEventManager;
        this._updateOverlaysContainerBoundingBox = updateOverlaysContainerBoundingBox;
    }

    public renderOverlays() {
        this.timedEventManager?.requestStart();
    }

    public clearOverlays() {
        this.timedEventManager?.requestStop();
    }

    public updateOverlaysContainerBoundingBox() {
        this._updateOverlaysContainerBoundingBox();
    }
}

export default BoundedOverlayManagerApi;
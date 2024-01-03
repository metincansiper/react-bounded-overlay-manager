import TimedEventManager from "../timer/TimedEventManager";
export type BoundedOverlayManagerApiOptions = {
    timedEventManager: TimedEventManager | null;
    updateOverlaysContainerBoundingBox: () => void;
};
declare class BoundedOverlayManagerApi {
    private timedEventManager;
    private _updateOverlaysContainerBoundingBox;
    constructor({ timedEventManager, updateOverlaysContainerBoundingBox }: BoundedOverlayManagerApiOptions);
    renderOverlays(): void;
    clearOverlays(): void;
    updateOverlaysContainerBoundingBox(): void;
}
export default BoundedOverlayManagerApi;

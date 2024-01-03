import BoundedOverlayManagerApi, { BoundedOverlayManagerApiOptions } from "../api/BoundedOverlayManagerApi";
type Options = BoundedOverlayManagerApiOptions & {
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void;
};
declare const useApiUpdateHandler: ({ timedEventManager, onApiUpdated, updateOverlaysContainerBoundingBox }: Options) => void;
export default useApiUpdateHandler;

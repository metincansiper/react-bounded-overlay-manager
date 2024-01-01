import { useEffect } from "react";
import BoundedOverlayManagerApi, { BoundedOverlayManagerApiOptions } from "../api/BoundedOverlayManagerApi";

type Options = BoundedOverlayManagerApiOptions & {
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void;
};

const useApiUpdateHandler = ({ timedEventManager, onApiUpdated, updateOverlaysContainerBoundingBox }: Options) => {
    useEffect(() => {
        if (!onApiUpdated) {
            return
        }
        onApiUpdated(new BoundedOverlayManagerApi({ timedEventManager, updateOverlaysContainerBoundingBox }));
    }, [timedEventManager, onApiUpdated, updateOverlaysContainerBoundingBox]);
};

export default useApiUpdateHandler;
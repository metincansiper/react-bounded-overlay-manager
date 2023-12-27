import { useEffect } from "react";
import TimedEventManager from "../timer/TimedEventManager";
import BoundedOverlayManagerApi from "../api/BoundedOverlayManagerApi";

type Options = {
    timedEventManager: TimedEventManager | null;
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void;
};

const useApiUpdateHandler = ({ timedEventManager, onApiUpdated }: Options) => {
    useEffect(() => {
        if (!onApiUpdated) {
            return
        }
        onApiUpdated(new BoundedOverlayManagerApi({ timedEventManager }));
    }, [timedEventManager, onApiUpdated]);
};

export default useApiUpdateHandler;
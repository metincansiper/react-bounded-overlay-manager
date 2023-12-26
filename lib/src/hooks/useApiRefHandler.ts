import { useImperativeHandle } from "react";
import TimedEventManager from "../timer/TimedEventManager";
import BoundedOverlayManagerApi from "../api/BoundedOverlayManagerApi";

type Options = {
    timedEventManager: TimedEventManager | null;
    apiRef?: React.MutableRefObject<BoundedOverlayManagerApi>;
};

const useApiRefHandler = ({ timedEventManager, apiRef }: Options) => {
    if (!apiRef) {
        return
    }

    useImperativeHandle(apiRef, () => new BoundedOverlayManagerApi({ timedEventManager }), [timedEventManager]);
};

export default useApiRefHandler;
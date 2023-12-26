import { useImperativeHandle } from "react";
import TimedEventManager from "../timer/TimedEventManager";
import { BoundedOverlayManagerApiProps } from "../types/ApiProps";

type Options = {
    timedEventManager: TimedEventManager | null;
    apiRef?: React.MutableRefObject<BoundedOverlayManagerApiProps>;
};

const useApiRefHandler = ({ timedEventManager, apiRef }: Options) => {
    if (!apiRef) {
        return
    }

    useImperativeHandle(apiRef, () => {
        return {
            renderOverlays: () => {
                timedEventManager?.requestStart();
            },
            clearOverlays: () => {
                timedEventManager?.requestStop();
            },
        }
    }, [timedEventManager]);
};

export default useApiRefHandler;
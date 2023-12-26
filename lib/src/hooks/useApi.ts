import { useImperativeHandle } from "react";
import TimedEventManager from "../timer/TimedEventManager";

type Options = {
    timedEventManager: TimedEventManager | null;
    apiRef?: React.MutableRefObject<any>;
};

const useApi = ({ timedEventManager, apiRef }: Options) => {
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

export default useApi;
import TimedEventManager from "../timer/TimedEventManager";
type Options = {
    timedEventManager: TimedEventManager | null;
    requestStartOnMouseMove?: boolean;
    requestStopOnMouseMove?: boolean;
};
declare const useOverlayManagerEvents: ({ timedEventManager, requestStartOnMouseMove, requestStopOnMouseMove, }: Options) => void;
export default useOverlayManagerEvents;

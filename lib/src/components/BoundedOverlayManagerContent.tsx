import { ReactElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useResizeObserver from "../hooks/useResizeObserver";
import { copyComponentBoundingBox } from "../util/bbox";
import OverlaysContainer from "./OverlaysContainer";
import useOverlayManagerEvents from "../hooks/useOverlayManagerEvents";
import useForwardBoundingComponentEvents from "../hooks/useForwardBoundingComponentEvents";
import useTimedEventManager from "../hooks/useTimedEventManager";
import Overlay from "./Overlay";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import useApiUpdateHandler from "../hooks/useApiUpdateHandler";
import BoundedOverlayManagerApi from "../api/BoundedOverlayManagerApi";
import useWindowResize from "../hooks/useWindowResize";
import { DEFAULT_HIDE_OVERLAYS_ON_MOUSE_LEAVE, DEFAULT_OVERLAYS_SHOW_TIMEOUT, DEFAULT_PERSISTANTLY_SHOW_OVERLAYS, DEFAULT_SHOW_OVERLAYS_ON_MOUSE_MOVE, DEFAULT_SKIP_ALL_SYSTEM_EVENTS, DEFAULT_UNMOUNT_CONTENT_WHEN_HIDDEN } from "../config";

type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    overlaysShowTimeout?: number,
    persistentlyShowOverlays?: boolean,
    hideOverlaysOnMouseLeave?: boolean,
    showOverlaysOnMouseMove?: boolean,
    skipAllSystemEvents?: boolean,
    unmountContentWhenHidden?: boolean,
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void,
};

// TODO: Provide an api exposing the functions to trigger show and hide events etc.?
const BoundedOverlayManagerContent: React.FC<Props> = ({
    children,
    overlaysShowTimeout = DEFAULT_OVERLAYS_SHOW_TIMEOUT,
    persistentlyShowOverlays = DEFAULT_PERSISTANTLY_SHOW_OVERLAYS, 
    skipAllSystemEvents = DEFAULT_SKIP_ALL_SYSTEM_EVENTS,
    hideOverlaysOnMouseLeave = DEFAULT_HIDE_OVERLAYS_ON_MOUSE_LEAVE,
    showOverlaysOnMouseMove = DEFAULT_SHOW_OVERLAYS_ON_MOUSE_MOVE,
    unmountContentWhenHidden = DEFAULT_UNMOUNT_CONTENT_WHEN_HIDDEN,
    onApiUpdated
}: Props) => {
    const { boundingComponentRef } = useOverlayManagerContext();
    const [showOverlays, setShowOverlays] = useState(persistentlyShowOverlays);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowOverlays(persistentlyShowOverlays);
    }, [persistentlyShowOverlays]);

    const onStart = useCallback(() => setShowOverlays(true), []);
    const onStop = useCallback(() => setShowOverlays(false), []);
    const timeoutDuration = overlaysShowTimeout;

    const timedEventManager = useTimedEventManager({ onStart, onStop, timeoutDuration, returnNull: persistentlyShowOverlays });
    const effectiveShowOverlaysOnMouseMove = showOverlaysOnMouseMove && !skipAllSystemEvents;
    const effectiveHideOverlaysOnMouseLeave = hideOverlaysOnMouseLeave && !skipAllSystemEvents;

    const updateOverlaysContainerBoundingBox = useCallback(() => {
        window.requestAnimationFrame(() => {
            copyComponentBoundingBox(boundingComponentRef, overlaysContainerRef);
        });
    }, [boundingComponentRef, overlaysContainerRef]);

    useForwardBoundingComponentEvents();
    
    useApiUpdateHandler({
        timedEventManager,
        onApiUpdated,
        updateOverlaysContainerBoundingBox
    });
    
    useOverlayManagerEvents({
        timedEventManager,
        requestStartOnMouseMove: effectiveShowOverlaysOnMouseMove,
        requestStopOnMouseMove: effectiveHideOverlaysOnMouseLeave,
    });

    useWindowResize({ handleResize: updateOverlaysContainerBoundingBox  });
    useResizeObserver(boundingComponentRef, { handleResize: updateOverlaysContainerBoundingBox });

    useLayoutEffect(() => {
        updateOverlaysContainerBoundingBox();
    }, [updateOverlaysContainerBoundingBox]);
    
    return (
        <OverlaysContainer ref={overlaysContainerRef} show={showOverlays} unmountContentWhenHidden={unmountContentWhenHidden}>
            { children }
        </OverlaysContainer>
    );
};

export default BoundedOverlayManagerContent;
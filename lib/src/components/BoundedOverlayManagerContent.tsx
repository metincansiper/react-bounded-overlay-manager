import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "../hooks/useResizeObserver";
import useWindowResize from "../hooks/useWindowResize";
import { copyComponentBoundingBox } from "../util/bbox";
import OverlaysContainer from "./OverlaysContainer";
import useOverlayManagerEvents from "../hooks/useOverlayManagerEvents";
import useForwardBoundingComponentEvents from "../hooks/useForwardBoundingComponentEvents";
import useTimedEventManager from "../hooks/useTimedEventManager";
import Overlay from "./Overlay";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import useApiUpdateHandler from "../hooks/useApiUpdateHandler";
import BoundedOverlayManagerApi from "../api/BoundedOverlayManagerApi";

type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    overlaysShowTimeout?: number,
    persistentlyShowOverlays?: boolean,
    hideOverlaysOnMouseLeave?: boolean,
    showOverlaysOnMouseMove?: boolean,
    skipAllSystemEvents?: boolean,
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void,
};

// TODO: Provide an api exposing the functions to trigger show and hide events etc.?
const BoundedOverlayManagerContent: React.FC<Props> = ({
    children,
    overlaysShowTimeout = 2000,
    persistentlyShowOverlays = false, 
    skipAllSystemEvents = false,
    hideOverlaysOnMouseLeave = true,
    showOverlaysOnMouseMove = true,
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

    useForwardBoundingComponentEvents();
    
    useApiUpdateHandler({
        timedEventManager,
        onApiUpdated
    });
    
    useOverlayManagerEvents({
        timedEventManager,
        requestStartOnMouseMove: effectiveShowOverlaysOnMouseMove,
        requestStopOnMouseMove: effectiveHideOverlaysOnMouseLeave,
    });
    
    const updateOverlaysContainerBoundingBox = useCallback(() => {
        copyComponentBoundingBox(boundingComponentRef, overlaysContainerRef);
    }, [boundingComponentRef, overlaysContainerRef]);

    useWindowResize({ handleResize: updateOverlaysContainerBoundingBox });
    useResizeObserver(boundingComponentRef, { handleResize: updateOverlaysContainerBoundingBox });

    // TODO: this is probably not needed since using useResizeObserver() would be enough?
    // useLayoutEffect(() => {
    //     updateOverlaysContainerBoundingBox();
    // }, [updateOverlaysContainerBoundingBox]);
    
    return (
        <OverlaysContainer ref={overlaysContainerRef} show={showOverlays}>
            { children }
        </OverlaysContainer>
    );
};

export default BoundedOverlayManagerContent;
import { ReactElement, useCallback, useRef, useState } from "react";
import useResizeObserver from "../hooks/useResizeObserver";
import useWindowResize from "../hooks/useWindowResize";
import { copyComponentBoundingBox } from "../util";
import OverlaysContainer from "./OverlaysContainer";
import useOverlayManagerEvents from "../hooks/useOverlayManagerEvents";
import useForwardBoundingComponentEvents from "../hooks/useForwardBoundingComponentEvents";
import useTimedEventManager from "../hooks/useTimedEventManager";
import Overlay from "./Overlay";

type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    overlaysShowTimeout?: number,
    persistentlyShowOverlays?: boolean,
    hideOverlaysOnMouseLeave?: boolean,
    showOverlaysOnMouseMove?: boolean,
    skipAllSystemEvents?: boolean,
};

// TODO: Provide an api exposing the functions to trigger show and hide events etc.?
const BoundedOverlayManagerContent: React.FC<Props> = ({ 
    boundingComponentRef, 
    children,
    overlaysShowTimeout = 2000,
    persistentlyShowOverlays = false, 
    skipAllSystemEvents = false,
    hideOverlaysOnMouseLeave = true,
    showOverlaysOnMouseMove = true,
}: Props) => {
    const [showOverlays, setShowOverlays] = useState(persistentlyShowOverlays);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    const onStart = useCallback(() => setShowOverlays(true), []);
    const onStop = useCallback(() => setShowOverlays(false), []);
    const timeoutDuration = overlaysShowTimeout;

    const timedEventManager = useTimedEventManager({ onStart, onStop, timeoutDuration, returnNull: persistentlyShowOverlays });
    const effectiveShowOverlaysOnMouseMove = showOverlaysOnMouseMove && !skipAllSystemEvents;
    const effectiveHideOverlaysOnMouseLeave = hideOverlaysOnMouseLeave && !skipAllSystemEvents;

    useForwardBoundingComponentEvents({
        boundingComponentRef,
    });
    
    useOverlayManagerEvents({
        timedEventManager,
        showOverlaysOnMouseMove: effectiveShowOverlaysOnMouseMove,
        hideOverlaysOnMouseLeave: effectiveHideOverlaysOnMouseLeave,
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
        <OverlaysContainer ref={overlaysContainerRef} boundingComponentRef={boundingComponentRef} show={showOverlays}>
            { children }
        </OverlaysContainer>
    );
};

export default BoundedOverlayManagerContent;
import React, { useState, useRef, ReactElement, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import OverlaysContainer from './OverlaysContainer';
import useInteractiveAreaEvents from '../hooks/useInteractiveAreaEvents';
import useWindowResize from '../hooks/useWindowResize';
import { copyComponentBoundingBox } from '../util';
import useTimedEventManager from '../hooks/useTimedEventManager';
import useResizeObserver from '../hooks/useResizeObserver';

type BoundedOverlayManagerOptions = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    overlaysShowTimeout?: number,
    persistentlyShowOverlays?: boolean,
    hideOverlaysOnMouseLeave?: boolean,
    showOverlaysOnMouseMove?: boolean,
    skipAllPredefinedEvents?: boolean,
};

// TODO: Provide an api exposing the functions to trigger show and hide events etc.?
const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ 
    boundingComponentRef, 
    children,
    overlaysShowTimeout = 2000,
    persistentlyShowOverlays = false, 
    skipAllPredefinedEvents = false,
    hideOverlaysOnMouseLeave = true,
    showOverlaysOnMouseMove = true,
}: BoundedOverlayManagerOptions) => {
    const [showOverlays, setShowOverlays] = useState(persistentlyShowOverlays);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    const onStart = useCallback(() => setShowOverlays(true), []);
    const onStop = useCallback(() => setShowOverlays(false), []);
    const timeoutDuration = overlaysShowTimeout;

    const timedEventManager = useTimedEventManager({ onStart, onStop, timeoutDuration, returnNull: persistentlyShowOverlays });
    const effectiveShowOverlaysOnMouseMove = showOverlaysOnMouseMove && !skipAllPredefinedEvents;
    const effectiveHideOverlaysOnMouseLeave = hideOverlaysOnMouseLeave && !skipAllPredefinedEvents;

    useInteractiveAreaEvents({
        boundingComponentRef,
        timedEventManager,
        overlaysContainerRef,
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

    const controlWrapper = (
        <OverlaysContainer ref={overlaysContainerRef} boundingComponentRef={boundingComponentRef} show={showOverlays}>
            { children }
        </OverlaysContainer>
    );

    return ReactDOM.createPortal(controlWrapper, document.body);
};

export default BoundedOverlayManager;

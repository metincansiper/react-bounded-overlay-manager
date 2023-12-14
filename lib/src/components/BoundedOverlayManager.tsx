import React, { useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import OverlaysContainer from './OverlaysContainer';
import useInteractiveAreaEvents from '../hooks/useInteractiveAreaEvents';
import useWindowResize from '../hooks/useWindowResize';
import { copyComponentBoundingBox } from '../util';
import useTimedEventManager from '../hooks/useTimedEventManager';

type BoundedOverlayManagerOptions = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>
};

// TODO: Provide options for customizing the timeout duration, deciding whether to listen to some events (hideOnMouseLeave etc.)
// and an option to show layovers persistently
// Provide an api exposing the functions to trigger show and hide events etc.
const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ boundingComponentRef, children }: BoundedOverlayManagerOptions) => {
    const [showOverlays, setShowOverlays] = useState(false);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    const onStart = useCallback(() => setShowOverlays(true), []);
    const onStop = useCallback(() => setShowOverlays(false), []);
    const timeoutDuration = 2000;

    const timedEventManager = useTimedEventManager({ onStart, onStop, timeoutDuration });

    useInteractiveAreaEvents({
        boundingComponentRef,
        timedEventManager,
        overlaysContainerRef
    });
    
    const updateOverlaysContainerBoundingBox = useCallback(() => {
        copyComponentBoundingBox(boundingComponentRef, overlaysContainerRef);
    }, [boundingComponentRef, overlaysContainerRef]);

    useWindowResize({ handleResize: updateOverlaysContainerBoundingBox });

    useEffect(() => {
        updateOverlaysContainerBoundingBox();
    }, []);

    const controlWrapper = (
        <OverlaysContainer ref={overlaysContainerRef} boundingComponentRef={boundingComponentRef} show={showOverlays}>
            { children }
        </OverlaysContainer>
    );

    return ReactDOM.createPortal(controlWrapper, document.body);
};

export default BoundedOverlayManager;

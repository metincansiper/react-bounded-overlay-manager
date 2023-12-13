import React, { useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import OverlaysContainer from './OverlaysContainer';
import useBoundingComponentEvents from '../hooks/useBoundingComponentEvents';
import useWindowResize from '../hooks/useWindowResize';
import { copyComponentBoundingBox } from '../util';

type BoundedOverlayManagerOptions = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>
};

const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ boundingComponentRef, children }: BoundedOverlayManagerOptions) => {
    const [showOverlays, setShowOverlays] = useState(false);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    const handleShow = useCallback(() => {
        setShowOverlays(true);
    }, []);

    const handleHide = useCallback(() => {
        setShowOverlays(false);
    }, []);

    useBoundingComponentEvents({
        boundingComponentRef,
        handleShow,
        handleHide
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

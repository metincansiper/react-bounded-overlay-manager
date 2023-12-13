import React, { useState, useEffect, useRef, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import OverlaysContainer from './OverlaysContainer';
import useBoundingComponentEvents from '../hooks/useBoundingComponentEvents';

type BoundedOverlayManagerOptions = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>
};

const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ boundingComponentRef, children }: BoundedOverlayManagerOptions) => {
    const [showOverlays, setShowOverlays] = useState(false);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);

    useBoundingComponentEvents({
        boundingComponentRef,
        handleShow: () => {
            setShowOverlays(true);
        },
        handleHide: () => {
            setShowOverlays(false);
        }
    });

    const updateOverlaysContainerBoundingBox = () => {
        if (boundingComponentRef.current && overlaysContainerRef.current) {
            const { top, left, width, height } = boundingComponentRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            overlaysContainerRef.current.style.top = `${top + scrollTop}px`;
            overlaysContainerRef.current.style.left = `${left + scrollLeft}px`;
            overlaysContainerRef.current.style.width = `${width}px`;
            overlaysContainerRef.current.style.height = `${height}px`;
        }
    };

    useEffect(() => {
        updateOverlaysContainerBoundingBox();
        window.addEventListener('resize', updateOverlaysContainerBoundingBox);

        return () => {
            window.removeEventListener('resize', updateOverlaysContainerBoundingBox);
        };
    }, [boundingComponentRef]);

    const controlWrapper = (
        <OverlaysContainer ref={overlaysContainerRef} boundingComponentRef={boundingComponentRef} show={showOverlays}>
            { children }
        </OverlaysContainer>
    );

    return ReactDOM.createPortal(controlWrapper, document.body);
};

export default BoundedOverlayManager;

import React, { useState, useEffect, useRef, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';

type BoundedOverlayManagerOptions = {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>
};

const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ boundingComponentRef, children }: BoundedOverlayManagerOptions) => {
    const [showControls, setShowControls] = useState(false);
    const overlaysContainerRef = useRef<HTMLDivElement>(null);
    let mouseMoveTimeout: any = null;

    const updateControlContainerPosition = () => {
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

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    useEffect(() => {
        updateControlContainerPosition();
        window.addEventListener('resize', updateControlContainerPosition);

        if (boundingComponentRef.current) {
            boundingComponentRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', updateControlContainerPosition);
            if (mouseMoveTimeout) {
                clearTimeout(mouseMoveTimeout);
            }
            if (boundingComponentRef.current) {
                boundingComponentRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [boundingComponentRef]);

    const controlWrapper = (
        <div ref={overlaysContainerRef} style={{ position: 'absolute', zIndex: 1, display: showControls ? 'block' : 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                { children }
            </div>
        </div>
    );

    return ReactDOM.createPortal(controlWrapper, document.body);
};

export default BoundedOverlayManager;

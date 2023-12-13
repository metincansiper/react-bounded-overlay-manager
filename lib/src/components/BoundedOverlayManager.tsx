import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PredefinedPosition from '../enum/PredefinedPosition';

type OverlayInfo = {
    component: React.ElementType,
    position: PredefinedPosition
};

type BoundedOverlayManagerOptions = {
    boundingComponentRef:React.RefObject<HTMLElement>,
    overlaysInfo: OverlayInfo[]
};

const BoundedOverlayManager: React.FC<BoundedOverlayManagerOptions> = ({ boundingComponentRef, overlaysInfo }: BoundedOverlayManagerOptions) => {
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

    const getControlComponentStyle = (position: PredefinedPosition): React.CSSProperties => {
        const styles: { [key: string]: React.CSSProperties } = {
            [PredefinedPosition.BOTTOM_CENTER]: { position: 'absolute', bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
            [PredefinedPosition.TOP_LEFT]: { position: 'absolute', top: '0%', left: '0%' },
            // Add more positions as needed
        };
        return styles[position] || {};
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
                {overlaysInfo.map(({ component: OverlayComponent, position }, index) => (
                    <div key={index} style={getControlComponentStyle(position)}>
                        <OverlayComponent />
                    </div>
                ))}
            </div>
        </div>
    );

    return ReactDOM.createPortal(controlWrapper, document.body);
};

export default BoundedOverlayManager;

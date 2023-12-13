import React, { ReactElement, ForwardedRef } from 'react';
import Overlay from './Overlay';

interface OverlaysContainerProps {
    boundingComponentRef: React.RefObject<HTMLElement>,
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    show: boolean,
}

const OverlaysContainer: React.ForwardRefRenderFunction<HTMLDivElement, OverlaysContainerProps> = 
({ children, show }, ref) => {
    return (
        <div ref={ref as ForwardedRef<HTMLDivElement>} style={{ position: 'absolute', zIndex: 1, display: show ? 'block' : 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                { children }
            </div>
        </div>
    );
};

export default React.forwardRef(OverlaysContainer);
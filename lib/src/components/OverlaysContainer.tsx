import React, { ReactElement, ForwardedRef } from 'react';
import Overlay from './Overlay';

type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    show: boolean,
    unmountContentWhenHidden?: boolean,
}

const OverlaysContainer: React.ForwardRefRenderFunction<HTMLDivElement, Props> = 
({ children, show, unmountContentWhenHidden = false }, ref) => {
    const display = show ? 'block' : 'none'
    const shouldUnmount = unmountContentWhenHidden && !show;

    const content = shouldUnmount ? null : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            { children }
        </div>
    );
    
    return (
        <div ref={ref as ForwardedRef<HTMLDivElement>} style={{ position: 'absolute', display, pointerEvents: 'none' }}>
            {
                content
            }
        </div>
    );
};

export default React.forwardRef(OverlaysContainer);
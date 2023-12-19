import React, { ReactElement, ForwardedRef } from 'react';
import Overlay from './Overlay';

type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    show: boolean,
}

const OverlaysContainer: React.ForwardRefRenderFunction<HTMLDivElement, Props> = 
({ children, show }, ref) => {
    return (
        <div ref={ref as ForwardedRef<HTMLDivElement>} style={{ position: 'absolute', display: show ? 'block' : 'none', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                { children }
            </div>
        </div>
    );
};

export default React.forwardRef(OverlaysContainer);
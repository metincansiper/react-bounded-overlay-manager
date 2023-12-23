import React, { ReactElement, ForwardedRef } from 'react';
import Overlay from './Overlay';
import styles from './OverlaysContainer.module.css';

type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>,
    show: boolean,
    unmountContentWhenHidden?: boolean,
}

const OverlaysContainer: React.ForwardRefRenderFunction<HTMLDivElement, Props> = 
({ children, show, unmountContentWhenHidden = false }, ref) => {
    const display = show ? 'block' : 'none';
    const shouldUnmount = unmountContentWhenHidden && !show;

    const content = shouldUnmount ? null : (
        <div className={styles.overlaysContainerContent}>
            { children }
        </div>
    );
    
    return (
        <div className={`overlays-container ${styles.overlaysContainer}`} ref={ref as ForwardedRef<HTMLDivElement>} style={{ display }}>
            {
                content
            }
        </div>
    );
};

export default React.forwardRef(OverlaysContainer);
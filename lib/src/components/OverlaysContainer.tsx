import React, { ReactElement, ForwardedRef } from 'react';
import Overlay from './Overlay';
import styles from './OverlaysContainer.module.css';

export const overlaysContainerClassName = styles.overlaysContainer;
export const overlaysContainerContentClassName = styles.overlaysContainerContent;

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
        <div role='overlays-container-content' className={overlaysContainerContentClassName}>
            { children }
        </div>
    );
    
    return (
        <div role='overlays-container' className={overlaysContainerClassName} ref={ref as ForwardedRef<HTMLDivElement>} style={{ display }}>
            {
                content
            }
        </div>
    );
};

export default React.forwardRef(OverlaysContainer);
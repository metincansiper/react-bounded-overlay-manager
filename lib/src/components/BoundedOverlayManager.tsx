import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useFullscreenChange from '../hooks/useFullscreenChange';
import { OverlayManagerContextProvider } from '../context/OverlayManagerContext';
import BoundedOverlayManagerContent from './BoundedOverlayManagerContent';

type Props = React.ComponentProps<typeof BoundedOverlayManagerContent> & {
    boundingComponentRef: React.RefObject<HTMLElement>;
};

const getPortalContainer = () => document.fullscreenElement || document.body;

const BoundedOverlayManager: React.FC<Props> = ({boundingComponentRef, ...props}) => {
    // const { boundingComponentRef } = props;
    const [portalContainer, setPortalContainer] = useState<Element>(getPortalContainer);

    const handleFullscreenChange = useCallback(() => {
        setPortalContainer(getPortalContainer());
    }, [setPortalContainer]);

    useFullscreenChange({ handleFullscreenChange });

    const content = (
        <OverlayManagerContextProvider boundingComponentRef={boundingComponentRef}>
            <BoundedOverlayManagerContent {...props} />
        </OverlayManagerContextProvider>
    );

    return ReactDOM.createPortal(content, portalContainer);
};  

export default BoundedOverlayManager;

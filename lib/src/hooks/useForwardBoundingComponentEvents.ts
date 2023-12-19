import { useEffect } from 'react';
import { useOverlayManagerContext } from '../context/OverlayManagerContext';

const useForwardBoundingComponentEvents = () => {
    const { overlayManagerEventEmitter, boundingComponentRef } = useOverlayManagerContext();
    
    const handleMouseMove = () => {
        overlayManagerEventEmitter.emit('mousemoveOnBoundingComponent');
    };

    const handleMouseLeave = (event: any) => {
        // TODO: think about if should handle mousemove in such overlay targets as well?
        const relatedOverlayTarget = event.relatedTarget?.closest('.overlay');
        if (relatedOverlayTarget) {
            return;
        }

        overlayManagerEventEmitter.emit('mouseleaveOnBoundingComponent');
    };

    useEffect(() => {
        boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);
        boundingComponentRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
            boundingComponentRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [boundingComponentRef]);
};

export default useForwardBoundingComponentEvents;

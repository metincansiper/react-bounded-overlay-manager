import { useEffect } from 'react';

type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>;
    handleShow: () => void;
    handleHide: () => void;
}

const useBoundingComponentEvents = ({ boundingComponentRef, handleShow, handleHide }: Props) => {
    let mouseMoveTimeout: any = null;

    const handleMouseMove = () => {
        handleShow();
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            handleHide();
        }, 3000);
    };

    useEffect(() => {
        boundingComponentRef.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (mouseMoveTimeout) {
                clearTimeout(mouseMoveTimeout);
            }
            
            boundingComponentRef.current?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [boundingComponentRef]);
};

export default useBoundingComponentEvents;

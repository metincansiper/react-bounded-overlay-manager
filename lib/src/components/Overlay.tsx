import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, BottomRightOffsetProps, CenterOffsetProps, MidLeftOffsetProps, MidRightOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";
import useForwardOverlayEvents from "../hooks/useForwardOverlayEvents";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import styles from './Overlay.module.css';
// import useResizeObserver from "../hooks/useResizeObserver";

export const overlayClassName = styles.overlay;

type PositionOffsetMapping = {
    [PredefinedPosition.TOP_LEFT]: TopLeftOffsetProps,
    [PredefinedPosition.BOTTOM_CENTER]: BottomCenterOffsetProps,
    [PredefinedPosition.TOP_RIGHT]: TopRightOffsetProps,
    [PredefinedPosition.BOTTOM_LEFT]: BottomLeftOffsetProps,
    [PredefinedPosition.BOTTOM_RIGHT]: BottomRightOffsetProps,
    [PredefinedPosition.TOP_CENTER]: TopCenterOffsetProps,
    [PredefinedPosition.MID_LEFT]: MidLeftOffsetProps,
    [PredefinedPosition.MID_RIGHT]: MidRightOffsetProps,
    [PredefinedPosition.CENTER]: CenterOffsetProps,
};

type OverlayPositionProps = {
    [P in keyof PositionOffsetMapping]: { 
        position: P; 
        offset?: PositionOffsetMapping[P]; 
    }
}[keyof PositionOffsetMapping];

type Props = OverlayPositionProps & {
    children?: React.ReactNode;
};

const defaultOffsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    topInPercent: 0,
    leftInPercent: 0,
};

const getOverlayPositionStyle = (boundingComponentRef: React.RefObject<HTMLElement>, positionProps: OverlayPositionProps): React.CSSProperties => {
    if (!boundingComponentRef.current) {
        return {};
    }
    
    const { position, offset } = positionProps;

    const { top, bottom, left, right, topInPercent, leftInPercent } = {
        ...defaultOffsets,
        ...offset,
    };

    const horizontalCenterLeft = `${50 + leftInPercent}%`;
    const verticalCenterTop = `${50 + topInPercent}%`;

    const specificStyles: { [key: string]: React.CSSProperties } = {
        [PredefinedPosition.BOTTOM_CENTER]: { bottom, left: horizontalCenterLeft, transform: 'translateX(-50%)' },
        [PredefinedPosition.TOP_LEFT]: { top, left },
        [PredefinedPosition.TOP_RIGHT]: { top, right },
        [PredefinedPosition.CENTER]: { top: verticalCenterTop, left: horizontalCenterLeft, transform: 'translate(-50%, -50%)'},
        [PredefinedPosition.BOTTOM_LEFT]: { bottom, left },
        [PredefinedPosition.BOTTOM_RIGHT]: { bottom, right },
        [PredefinedPosition.TOP_CENTER]: { top, left: horizontalCenterLeft, transform: 'translateX(-50%)' },
        [PredefinedPosition.MID_LEFT]: { top: verticalCenterTop, left, transform: 'translateY(-50%)' },
        [PredefinedPosition.MID_RIGHT]: { top: verticalCenterTop, right, transform: 'translateY(-50%)' },
    };

    return specificStyles[position] || {};
};

const Overlay: React.FC<Props> = ({ offset, position, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { boundingComponentRef } = useOverlayManagerContext();

    const calculatePositionStyle = useCallback(() => {
        return getOverlayPositionStyle(boundingComponentRef, { position, offset } as OverlayPositionProps);
    }, [boundingComponentRef, position, offset]);
    
    const [positionStyle, setPositionStyle] = useState<CSSProperties>(calculatePositionStyle);

    useForwardOverlayEvents({ overlayRef: ref });

    useEffect(() => {
        setPositionStyle(calculatePositionStyle());
    }, [calculatePositionStyle]);

    // const refreshPositionStyle = useCallback(() => {
    //     setPositionStyle(calculatePositionStyle);
    // }, [calculatePositionStyle]);
    
    // useResizeObserver(boundingComponentRef, { handleResize: refreshPositionStyle });

    return (
        <div ref={ref} className={overlayClassName} role="overlay" style={positionStyle}>
            { children }
        </div>
    );
};

export default Overlay;

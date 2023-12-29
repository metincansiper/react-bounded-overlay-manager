import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, CenterOffsetProps, MidLeftOffsetProps, MidRightOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";
import useForwardOverlayEvents from "../hooks/useForwardOverlayEvents";
import useWindowResize from "../hooks/useWindowResize";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";
import { convertCssUnitToPercent } from "../util/css";
import styles from './Overlay.module.css';
import useResizeObserver from "../hooks/useResizeObserver";

export const overlayClassName = styles.overlay;

type PositionOffsetMapping = {
    [PredefinedPosition.TOP_LEFT]: TopLeftOffsetProps,
    [PredefinedPosition.BOTTOM_CENTER]: BottomCenterOffsetProps,
    [PredefinedPosition.TOP_RIGHT]: TopRightOffsetProps,
    [PredefinedPosition.BOTTOM_LEFT]: BottomLeftOffsetProps,
    [PredefinedPosition.BOTTOM_RIGHT]: BottomLeftOffsetProps,
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
};

const getOverlayPositionStyle = (boundingComponentRef: React.RefObject<HTMLElement>, positionProps: OverlayPositionProps): React.CSSProperties => {
    if (!boundingComponentRef.current) {
        return {};
    }
    
    const { position, offset } = positionProps;

    const { top, bottom, left, right } = {
        ...defaultOffsets,
        ...offset,
    };

    const convertToPercent = (value: any) => {
        if (!boundingComponentRef.current) {
            throw new Error('Bounding component ref is not set');
        }

        return convertCssUnitToPercent(value, boundingComponentRef.current);
    };

    const horizontalCenterLeft = `${50+convertToPercent(left)}%`;
    const verticalCenterTop = `${50+convertToPercent(top)}%`;

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

    const mayPositionStyleChange = useMemo(() => {
        if (!offset) {
            return false;
        }
        const offsetAny = offset as any;
        const justHorizontallyCentered = position === PredefinedPosition.BOTTOM_CENTER || position === PredefinedPosition.TOP_CENTER;
        const justVerticallyCentered = position === PredefinedPosition.MID_LEFT || position === PredefinedPosition.MID_RIGHT; 
        
        // TODO: consider also checking if the unit of offset is percent and if so omitting that from the check
        return (position === PredefinedPosition.CENTER && (offsetAny.top || offsetAny.left))
            || (justHorizontallyCentered && offsetAny.left)
            || (justVerticallyCentered && offsetAny.top);
    }, [position, offset]);

    const refreshPositionStyle = useCallback(() => {
        if (!mayPositionStyleChange) {
            return;
        }

        setPositionStyle(calculatePositionStyle);
    }, [calculatePositionStyle, mayPositionStyleChange]);
    
    useWindowResize({ handleResize: refreshPositionStyle });
    useResizeObserver(boundingComponentRef, { handleResize: refreshPositionStyle });

    return (
        <div ref={ref} className={overlayClassName} role="overlay" style={positionStyle}>
            { children }
        </div>
    );
};

export default Overlay;

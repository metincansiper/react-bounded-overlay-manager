import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
// @ts-ignore
import units from 'units-css';
import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, CenterOffsetProps, MidLeftOffsetProps, MidRightOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";
import useForwardOverlayEvents from "../hooks/useForwardOverlayEvents";
import useWindowResize from "../hooks/useWindowResize";
import { useOverlayManagerContext } from "../context/OverlayManagerContext";

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

export const getOverlayContainerPositionStyle = (boundingComponentRef: React.RefObject<HTMLElement>, positionProps: OverlayPositionProps): React.CSSProperties => {
    if (!boundingComponentRef.current) {
        return {};
    }
    
    const { position, offset } = positionProps;
    const commonStyles: React.CSSProperties = {
        position: 'absolute'
    };

    const { top, bottom, left, right } = {
        ...defaultOffsets,
        ...offset,
    };

    // TODO: create a class handling needed units facilities as a dependency
    // inversion of units-css library and use it here.
    // Do it before testing this component.
    const convertToPercent = (value: string | number) => {
        if (value === 0) {
            return 0;
        }

        return units.convert('%', value, boundingComponentRef.current);
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

    const styles = {
        ...commonStyles,
        ...specificStyles[position] || {},
    };

    return styles;
};

const Overlay: React.FC<Props> = ({ offset, position, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { boundingComponentRef } = useOverlayManagerContext();
    const calculatePositionStyle = useCallback(() => {
        return getOverlayContainerPositionStyle(boundingComponentRef, { position, offset } as OverlayPositionProps);
    }, [boundingComponentRef, position, offset]);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>(calculatePositionStyle);

    const style: CSSProperties = {
        ...positionStyle,
        pointerEvents: 'auto',
    };

    useForwardOverlayEvents({ overlayRef: ref });

    useEffect(() => {
        setPositionStyle(calculatePositionStyle());
    }, [calculatePositionStyle]);

    const handleWindowResize = useCallback(() => setPositionStyle(calculatePositionStyle), [calculatePositionStyle]);
    useWindowResize({ handleResize: handleWindowResize });

    return (
        <div ref={ref} className="overlay" style={style}>
            { children }
        </div>
    );
};

export default Overlay;

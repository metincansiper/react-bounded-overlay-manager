import { CSSProperties, useRef } from "react";
import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, CenterOffsetProps, MidLeftOffsetProps, MidRightOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";
import useForwardOverlayEvents from "../hooks/useForwardOverlayEvents";

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
    topPercent: 0,
    leftPercent: 0,
};

export const getOverlayContainerPositionStyle = (positionProps: OverlayPositionProps): React.CSSProperties => {
    const { position, offset } = positionProps;
    const commonStyles: React.CSSProperties = {
        position: 'absolute'
    };

    const { top, bottom, left, right, topPercent, leftPercent } = {
        ...defaultOffsets,
        ...offset,
    };

    const horizontalCenterLeft = `${50+leftPercent}%`;
    const verticalCenterTop = `${50+topPercent}%`;

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

    const positionProps = { position, offset } as OverlayPositionProps;
    const style: CSSProperties = {
        ...getOverlayContainerPositionStyle(positionProps),
        pointerEvents: 'auto',
    };

    useForwardOverlayEvents({ overlayRef: ref });

    return (
        <div ref={ref} className="overlay" style={style}>
            { children }
        </div>
    );
};

export default Overlay;

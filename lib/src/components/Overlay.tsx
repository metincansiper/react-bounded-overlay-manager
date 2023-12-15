import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";

type PositionOffsetMapping = {
    [PredefinedPosition.TOP_LEFT]: TopLeftOffsetProps,
    [PredefinedPosition.BOTTOM_CENTER]: BottomCenterOffsetProps,
    [PredefinedPosition.TOP_RIGHT]: TopRightOffsetProps,
    [PredefinedPosition.BOTTOM_LEFT]: BottomLeftOffsetProps,
    [PredefinedPosition.BOTTOM_RIGHT]: BottomLeftOffsetProps,
    [PredefinedPosition.TOP_CENTER]: TopCenterOffsetProps,
    [PredefinedPosition.CENTER]: null,
};

type OverlayPositionProps = {
    [P in keyof PositionOffsetMapping]: { 
        position: P; 
        offset?: PositionOffsetMapping[P]; 
    }
}[keyof PositionOffsetMapping];

type Props = OverlayPositionProps & {
    children?: React.ReactNode;
    // positionProps: PositionProps;
};

const defaultOffsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

const getOverlayContainerStyle = (positionProps: OverlayPositionProps): React.CSSProperties => {
    const { position, offset } = positionProps;
    const commonStyles: React.CSSProperties = {
        position: 'absolute'
    };

    const { top, bottom, left, right } = {
        ...defaultOffsets,
        ...offset,
    };

    const specificStyles: { [key: string]: React.CSSProperties } = {
        [PredefinedPosition.BOTTOM_CENTER]: { bottom, left: '50%', transform: 'translateX(-50%)' },
        [PredefinedPosition.TOP_LEFT]: { top, left },
        [PredefinedPosition.TOP_RIGHT]: { top, right },
        [PredefinedPosition.CENTER]: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)'},
        [PredefinedPosition.BOTTOM_LEFT]: { bottom, left },
        [PredefinedPosition.BOTTOM_RIGHT]: { bottom, right },
        [PredefinedPosition.TOP_CENTER]: { top, left: '50%', transform: 'translateX(-50%)' }
    };

    const styles = {
        ...commonStyles,
        ...specificStyles[position] || {},
    };

    return styles;
};

const Overlay: React.FC<Props> = ({ offset, position, children }) => {
    const positionProps = { position, offset } as OverlayPositionProps;
    return (
        <div style={getOverlayContainerStyle(positionProps)}>
            { children }
        </div>
    );
};

export default Overlay;

import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";

type PositionOffsetMapping = {
    [PredefinedPosition.TOP_LEFT]: TopLeftOffsetProps,
    [PredefinedPosition.BOTTOM_CENTER]: BottomCenterOffsetProps,
    [PredefinedPosition.TOP_RIGHT]: TopRightOffsetProps,
    // Map other positions to their respective offset types
};

type Props = {
    [P in keyof PositionOffsetMapping]: { 
        position: P; 
        offset?: PositionOffsetMapping[P]; 
        children?: React.ReactNode;
    }
}[keyof PositionOffsetMapping];

const getOverlayContainerStyle = (position: PredefinedPosition): React.CSSProperties => {
    const styles: { [key: string]: React.CSSProperties } = {
        [PredefinedPosition.BOTTOM_CENTER]: { position: 'absolute', bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
        [PredefinedPosition.TOP_LEFT]: { position: 'absolute', top: '0%', left: '0%' },
        [PredefinedPosition.TOP_RIGHT]: { position: 'absolute', top: '0%', right: '0%' },
        // Add more positions as needed
    };
    return styles[position] || {};
};

const Overlay: React.FC<Props> = ({ position, children, offset }) => {
    console.log(offset);
    return (
        <div style={getOverlayContainerStyle(position)}>
            { children }
        </div>
    );
};

export default Overlay;

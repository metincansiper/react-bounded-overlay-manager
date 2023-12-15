import PredefinedPosition from "../enum/PredefinedPosition";

type Props = React.PropsWithChildren<{
    position: PredefinedPosition,
}>;

const getOverlayContainerStyle = (position: PredefinedPosition): React.CSSProperties => {
    const styles: { [key: string]: React.CSSProperties } = {
        [PredefinedPosition.BOTTOM_CENTER]: { position: 'absolute', bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
        [PredefinedPosition.TOP_LEFT]: { position: 'absolute', top: '0%', left: '0%' },
        [PredefinedPosition.TOP_RIGHT]: { position: 'absolute', top: '0%', right: '0%' },
        // Add more positions as needed
    };
    return styles[position] || {};
};

const Overlay: React.FC<Props> = ({ position, children }: Props) => {
    return (
        <div style={getOverlayContainerStyle(position)}>
            { children }
        </div>
    );
};

export default Overlay;

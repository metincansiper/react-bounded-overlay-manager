/// <reference types="react" />
import PredefinedPosition from "../enum/PredefinedPosition";
import { BottomCenterOffsetProps, BottomLeftOffsetProps, BottomRightOffsetProps, CenterOffsetProps, MidLeftOffsetProps, MidRightOffsetProps, TopCenterOffsetProps, TopLeftOffsetProps, TopRightOffsetProps } from "../types/OffsetProps";
export declare const overlayClassName: string;
type PositionOffsetMapping = {
    [PredefinedPosition.TOP_LEFT]: TopLeftOffsetProps;
    [PredefinedPosition.BOTTOM_CENTER]: BottomCenterOffsetProps;
    [PredefinedPosition.TOP_RIGHT]: TopRightOffsetProps;
    [PredefinedPosition.BOTTOM_LEFT]: BottomLeftOffsetProps;
    [PredefinedPosition.BOTTOM_RIGHT]: BottomRightOffsetProps;
    [PredefinedPosition.TOP_CENTER]: TopCenterOffsetProps;
    [PredefinedPosition.MID_LEFT]: MidLeftOffsetProps;
    [PredefinedPosition.MID_RIGHT]: MidRightOffsetProps;
    [PredefinedPosition.CENTER]: CenterOffsetProps;
};
type OverlayPositionProps = {
    [P in keyof PositionOffsetMapping]: {
        position: P;
        offset?: PositionOffsetMapping[P];
    };
}[keyof PositionOffsetMapping];
type Props = OverlayPositionProps & {
    children?: React.ReactNode;
};
declare const Overlay: React.FC<Props>;
export default Overlay;

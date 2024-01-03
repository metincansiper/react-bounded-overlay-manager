import { ReactElement } from "react";
import Overlay from "./Overlay";
import BoundedOverlayManagerApi from "../api/BoundedOverlayManagerApi";
type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>;
    overlaysShowTimeout?: number;
    persistentlyShowOverlays?: boolean;
    hideOverlaysOnMouseLeave?: boolean;
    showOverlaysOnMouseMove?: boolean;
    skipAllSystemEvents?: boolean;
    unmountContentWhenHidden?: boolean;
    onApiUpdated?: (api: BoundedOverlayManagerApi) => void;
};
declare const BoundedOverlayManagerContent: React.FC<Props>;
export default BoundedOverlayManagerContent;

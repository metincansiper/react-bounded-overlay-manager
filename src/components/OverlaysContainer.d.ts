import React, { ReactElement } from 'react';
import Overlay from './Overlay';
export declare const overlaysContainerClassName: string;
export declare const overlaysContainerContentClassName: string;
type Props = {
    children: ReactElement<typeof Overlay>[] | ReactElement<typeof Overlay>;
    show: boolean;
    unmountContentWhenHidden: boolean;
};
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export default _default;

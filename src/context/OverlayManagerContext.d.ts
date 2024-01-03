/// <reference types="node" />
import React, { PropsWithChildren } from 'react';
import { EventEmitter } from 'events';
interface OverlayManagerContextType {
    overlayManagerEventEmitter: EventEmitter;
    boundingComponentRef: React.RefObject<HTMLElement>;
}
type Props = {
    boundingComponentRef: React.RefObject<HTMLElement>;
};
export declare const useOverlayManagerContext: () => OverlayManagerContextType;
export declare const OverlayManagerContextProvider: React.FC<PropsWithChildren<Props>>;
export {};

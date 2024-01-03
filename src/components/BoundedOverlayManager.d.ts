import React from 'react';
import BoundedOverlayManagerContent from './BoundedOverlayManagerContent';
type Props = React.ComponentProps<typeof BoundedOverlayManagerContent> & {
    boundingComponentRef: React.RefObject<HTMLElement>;
};
declare const BoundedOverlayManager: React.FC<Props>;
export default BoundedOverlayManager;

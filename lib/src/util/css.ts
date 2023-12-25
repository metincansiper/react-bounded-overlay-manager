import { CSSProperties } from 'react';
// @ts-ignore
import units from 'units-css';

type CssDirectionValueType = CSSProperties['top'] | CSSProperties['left'] | CSSProperties['right'] | CSSProperties['bottom'];

export const convertCssUnitToPercent = (value: CssDirectionValueType, component: HTMLElement) => {
    if (value === 0) {
        return 0;
    }

    return units.convert('%', value, component);
};
import { CSSProperties } from 'react';

import { TEXT_STYLES, TextStyleKey } from '../utils';

export interface DomTextStyleOptions {
    fill?: string;
    fontSize?: number;
    /** CSS line-height in px. */
    lineHeight?: number;
}

export const getDomTextStyle = (key: TextStyleKey, overrides?: DomTextStyleOptions): CSSProperties => {
    const { fontFamily, fontSize, color, fontStyle, fontWeight, dropShadow } = TEXT_STYLES[key] as {
        fontFamily: string;
        fontSize: number;
        color?: string;
        fontStyle?: string;
        fontWeight?: string;
        dropShadow?: { alpha: number; angle: number; distance: number; color: number };
    };

    const style: CSSProperties = {
        fontFamily,
        fontSize: overrides?.fontSize ?? fontSize,
        lineHeight: overrides?.lineHeight !== undefined ? `${overrides.lineHeight}px` : undefined,
        color: overrides?.fill ?? color,
        fontStyle,
        fontWeight,
        margin: 0,
        whiteSpace: 'pre',
    };

    if (dropShadow) {
        const dx = Math.cos(dropShadow.angle) * dropShadow.distance;
        const dy = Math.sin(dropShadow.angle) * dropShadow.distance;
        const [ r, g, b ] = [ 16, 8, 0 ].map(shift => (dropShadow.color >> shift) & 0xFF);

        style.textShadow = `${dx}px ${dy}px 0 rgba(${r}, ${g}, ${b}, ${dropShadow.alpha})`;
    }

    return style;
};

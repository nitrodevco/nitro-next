import { CSSProperties } from 'react';

import { TEXT_STYLES, type TextStyleKey } from '../utils/textStyles';

export interface DomTextStyleOptions {
    fill?: string;
    fontSize?: number;
}

/**
 * DOM counterpart to `theme-pixi/utils/textStyles.ts`'s `getPixiTextStyle` - translates the
 * exact same `TEXT_STYLES` table (fontFamily/fontSize/color/dropShadow) into a CSS style
 * object instead of a Pixi `TextStyle`, so both render targets stay pixel-matched to a single
 * source of truth rather than two independently-maintained font tables. Fonts are loaded via
 * `theme-core/fonts.css`'s `@font-face` rules (the same ones the app already awaits via
 * `document.fonts.ready` before mounting at all).
 */
export const getDomTextStyle = (key: TextStyleKey, overrides?: DomTextStyleOptions): CSSProperties => {
    const { fontFamily, fontSize, color, dropShadow } = TEXT_STYLES[key] as {
        fontFamily: string;
        fontSize: number;
        color?: string;
        dropShadow?: { alpha: number; angle: number; distance: number; color: number };
    };

    const style: CSSProperties = {
        fontFamily,
        fontSize: overrides?.fontSize ?? fontSize,
        color: overrides?.fill ?? color,
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

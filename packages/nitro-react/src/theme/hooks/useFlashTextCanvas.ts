import { Color, TextDropShadow } from 'pixi.js';
import { useMemo } from 'react';

import { FlashTextCanvas, HABBO_TEXT_STYLES, HabboTextStyleName, normalizeFlashTextFormat, renderFlashTextCanvas } from '../font/flash-text';

export interface FlashTextCanvasConfig {
    /** A CSS colour; the style's own colour when absent. */
    color?: string;
    dropShadow?: TextDropShadow;
    align?: 'left' | 'center' | 'right';
    wordWrap?: boolean;
    wordWrapWidth?: number;
    breakWords?: boolean;
    /** Explicit line advance in px; the font's own line height when absent. */
    lineHeight?: number;
}

/**
 * Rasterises `text` in a Habbo text style, exactly as the Flash client drew it. `undefined`
 * when there is no style to render in or the exact renderer cannot take the string (a glyph
 * the font bundles do not carry) - the caller then shows the browser's own text instead.
 */
export const useFlashTextCanvas = (text: string, habboKey: HabboTextStyleName | undefined, { color, dropShadow, align, wordWrap, wordWrapWidth, breakWords, lineHeight }: FlashTextCanvasConfig): FlashTextCanvas | undefined => {
    // The shadow is compared by value: callers resolve it to a fresh object on every render.
    const shadowAlpha = dropShadow?.alpha;
    const shadowAngle = dropShadow?.angle;
    const shadowDistance = dropShadow?.distance;
    const shadowColor = dropShadow ? new Color(dropShadow.color).toNumber() : undefined;

    return useMemo(() => {
        if (!habboKey || !text?.length) return undefined;

        const format = normalizeFlashTextFormat({ ...HABBO_TEXT_STYLES[habboKey], ...(color ? { color: new Color(color).toNumber() } : {}) });
        const shadow = (shadowColor !== undefined && shadowAngle !== undefined && shadowDistance !== undefined)
            ? { color: shadowColor, alpha: shadowAlpha ?? 1, offsetX: Math.round(Math.cos(shadowAngle) * shadowDistance), offsetY: Math.round(Math.sin(shadowAngle) * shadowDistance) }
            : undefined;

        return renderFlashTextCanvas(text, format, { align, wordWrap, wrapWidth: wordWrap ? wordWrapWidth : undefined, breakWords, lineHeight, shadow }) ?? undefined;
    }, [ text, habboKey, color, align, wordWrap, wordWrapWidth, breakWords, lineHeight, shadowAlpha, shadowAngle, shadowDistance, shadowColor ]);
};

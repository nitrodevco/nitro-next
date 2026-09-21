import { Color, TextDropShadow } from 'pixi.js';
import { useMemo } from 'react';

import { FlashTextCanvas, FlashTextFace, FlashTextFieldOverrides, HABBO_TEXT_STYLES, HabboTextStyleName, normalizeFlashTextFormat, renderFlashTextCanvas } from '../font/flash-text';

export interface FlashTextCanvasConfig {
    /** A CSS colour; the style's own colour when absent. */
    color?: string;
    /** A raw `fontSize` override in px - a Flash layout's `font_size` var; the style's own size when absent. */
    fontSize?: number;
    /** The face a raw `fontFamily` override names (`flashFaceOverride`); the style's own face when absent. */
    face?: FlashTextFace;
    /** The layout's remaining `TextField` vars over the style's format - see `FlashTextFieldOverrides`. */
    field?: FlashTextFieldOverrides;
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
export const useFlashTextCanvas = (text: string, habboKey: HabboTextStyleName | undefined, { color, fontSize, face, field, dropShadow, align, wordWrap, wordWrapWidth, breakWords, lineHeight }: FlashTextCanvasConfig): FlashTextCanvas | undefined => {
    // The shadow is compared by value: callers resolve it to a fresh object on every render.
    const shadowAlpha = dropShadow?.alpha;
    const shadowAngle = dropShadow?.angle;
    const shadowDistance = dropShadow?.distance;
    const shadowColor = dropShadow ? new Color(dropShadow.color).toNumber() : undefined;
    // The face is compared by value for the same reason: callers resolve it on every render.
    const faceFamily = face?.fontFamily;
    const faceBold = face?.bold;
    const faceItalic = face?.italic;
    // So are the field vars - a view writes them as an object literal, and an identity-compared
    // dependency would re-rasterise the text on every render. Serialised rather than pulled apart
    // one const per property, because there are a dozen of them.
    const fieldKey = field ? JSON.stringify(field) : '';

    return useMemo(() => {
        if (!habboKey || !text?.length) return undefined;

        // The style first, then the element's own vars over it, exactly as
        // `TextController.setTextFormatting` layers them.
        const format = normalizeFlashTextFormat({
            ...HABBO_TEXT_STYLES[habboKey],
            ...(fieldKey ? JSON.parse(fieldKey) as FlashTextFieldOverrides : {}),
            // A face alias adds its weight and slant, it does not clear them: Flash's `font_face`
            // sets the family and leaves `bold` / `italic` to their own vars.
            ...(faceFamily ? { fontFamily: faceFamily, ...(faceBold ? { bold: true } : {}), ...(faceItalic ? { italic: true } : {}) } : {}),
            ...(fontSize !== undefined ? { fontSize } : {}),
            ...(color ? { color: new Color(color).toNumber() } : {}),
        });
        const shadow = (shadowColor !== undefined && shadowAngle !== undefined && shadowDistance !== undefined)
            ? { color: shadowColor, alpha: shadowAlpha ?? 1, offsetX: Math.round(Math.cos(shadowAngle) * shadowDistance), offsetY: Math.round(Math.sin(shadowAngle) * shadowDistance) }
            : undefined;

        return renderFlashTextCanvas(text, format, { align, wordWrap, wrapWidth: wordWrap ? wordWrapWidth : undefined, breakWords, lineHeight, shadow }) ?? undefined;
    }, [ text, habboKey, color, fontSize, faceFamily, faceBold, faceItalic, fieldKey, align, wordWrap, wordWrapWidth, breakWords, lineHeight, shadowAlpha, shadowAngle, shadowDistance, shadowColor ]);
};

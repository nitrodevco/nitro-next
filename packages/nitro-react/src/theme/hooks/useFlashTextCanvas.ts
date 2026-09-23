import { Color, TextDropShadow } from 'pixi.js';
import { useMemo } from 'react';

import { FLASH_TEXT_GUTTER, FlashTextCanvas, FlashTextFace, FlashTextFieldOverrides, FlashTextFormat, FlashTextLayoutOptions, flashTextLineHeight, FlashTextRenderer, FlashTextRun, HABBO_TEXT_STYLES, HabboTextStyleName, layoutFlashTextBlock, parseFlashTextMarkupWithLinks, renderFlashTextCanvas, resolveFlashTextFormat } from '../font/flash-text';
import { flashFaceOverride } from '../utils/textStyles';

/**
 * A text window's `overflow_replace` truncation (`TextController.refreshTextImage`): the text is
 * cut and `replace` appended until it fits. `width` / `height` are the space the field has - the
 * window's size minus its margins - and `marginX` / `marginY` the margins themselves (left + right,
 * top + bottom), which Flash adds to the text's size once more before comparing.
 */
export interface FlashTextOverflowReplace {
    replace: string;
    width: number;
    height: number;
    marginX: number;
    marginY: number;
}

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
    /** The text is Flash `htmlText` (`parseFlashTextMarkup`), not plain text. */
    markup?: boolean;
    overflowReplace?: FlashTextOverflowReplace;
}

/** A `<font face>` in markup, resolved the way a raw `fontFamily` override is. */
const resolveMarkupFace = (face: string): Partial<FlashTextFormat> | undefined => {
    const resolved = flashFaceOverride(face);

    if (!resolved) return undefined;

    return { fontFamily: resolved.fontFamily, ...(resolved.bold ? { bold: true } : {}), ...(resolved.italic ? { italic: true } : {}) };
};

/**
 * `TextController.refreshTextImage`'s `overflow_replace` passes, over the exact layout rather
 * than a rasterised field: `textWidth` / `textHeight` are the laid-out lines', and
 * `getCharBoundaries` is read in field space (the 2px gutter included) off the same layout.
 *
 * Height first: from the end of the last line whose first character's bottom is inside the
 * space, one character at a time is cut from the original text (`replace` appended) while the
 * text is too tall. Then width: from the last character whose right edge is inside the space,
 * characters are cut from the height pass's result while the text is too wide. A pass that would
 * run off the start of the text (`getLineOffset(-1)` throws in Flash) leaves the text as it is.
 * `getTextFormat`'s `indent` / `leftMargin` / `rightMargin` are 0 for every style the client
 * has, so the width pass adds the margins alone. Returns `text` unchanged when it fits, or when
 * it cannot be laid out exactly.
 */
const truncateOverflow = (text: string, format: FlashTextFormat, options: FlashTextLayoutOptions, align: 'left' | 'center' | 'right', lineHeightOverride: number | undefined, { replace, width, height, marginX, marginY }: FlashTextOverflowReplace): string => {
    const lineHeight = lineHeightOverride ?? flashTextLineHeight(format);
    const metrics = FlashTextRenderer.metrics(format);

    if (lineHeight == null || !metrics) return text;

    const measure = (value: string) => {
        const lines = layoutFlashTextBlock(value, format, options);

        return lines ? { lines, textWidth: Math.max(0, ...lines.map(line => line.width)), textHeight: lines.length * lineHeight } : null;
    };

    let current = text;
    let measured = measure(current);

    if (!measured) return text;

    if (measured.textHeight + marginY > height) {
        const charHeight = metrics.ascent + metrics.descent;
        let lineIndex = measured.lines.length - 1;

        while (lineIndex >= 0 && (FLASH_TEXT_GUTTER + lineIndex * lineHeight + charHeight) > height) lineIndex--;

        if (lineIndex < 0) return text;

        // `getLineOffset + getLineLength`: the line's length counts the break it ends in.
        let length = measured.lines[lineIndex + 1]?.start ?? current.length;

        while (measured && measured.textHeight + marginY > height && length > 0) {
            length--;
            current = text.slice(0, length) + replace;
            measured = measure(current);
        }

        if (!measured) return text;
    }

    if (measured.textWidth + marginX > width) {
        const heightPassed = current;
        const lines = measured.lines;
        const innerWidth = width - FLASH_TEXT_GUTTER * 2;
        const charRight = (index: number): number | null => {
            const line = lines.find(candidate => index >= candidate.start && index < candidate.end);

            if (!line) return null;

            const positions = FlashTextRenderer.measureCharPositions(line.text, format);

            if (!positions) return null;

            const lineX = (align === 'center') ? Math.max(0, Math.floor((innerWidth - line.width) / 2)) : (align === 'right') ? Math.max(0, Math.floor(innerWidth - line.width)) : 0;

            return FLASH_TEXT_GUTTER + lineX + positions[index - line.start + 1];
        };

        let index = heightPassed.length - 1;

        while (index >= 0) {
            const right = charRight(index);

            if (right != null && right <= width) break;

            index--;
        }

        if (index < 0) return current;

        let length = index;

        while (measured && measured.textWidth + marginX > width && length > 0) {
            length--;
            current = heightPassed.slice(0, length) + replace;
            measured = measure(current);
        }

        if (!measured) return text;
    }

    return current;
};

/**
 * Rasterises `text` in a Habbo text style, exactly as the Flash client drew it. `undefined`
 * when there is no style to render in or the exact renderer cannot take the string (a glyph
 * the font bundles do not carry) - the caller then shows the browser's own text instead.
 *
 * With `markup` the text is `htmlText` and renders as format runs, its `<a href>` ranges carried
 * on the result for the link hit test. With `overflowReplace` the
 * text is first truncated the way `TextController.refreshTextImage` does; like Flash's
 * `_field.text = ...`, a truncated markup text loses its tags and renders plain.
 */
export const useFlashTextCanvas = (text: string, habboKey: HabboTextStyleName | undefined, { color, fontSize, face, field, dropShadow, align, wordWrap, wordWrapWidth, breakWords, lineHeight, markup, overflowReplace }: FlashTextCanvasConfig): FlashTextCanvas | undefined => {
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
    // one const per property, because there are a dozen of them. The overflow box likewise.
    const fieldKey = field ? JSON.stringify(field) : '';
    const overflowKey = overflowReplace ? JSON.stringify(overflowReplace) : '';

    return useMemo(() => {
        if (!habboKey || !text?.length) return undefined;

        // The style first, then the element's own vars over it, exactly as
        // `TextController.setTextFormatting` layers them.
        const format = resolveFlashTextFormat({
            style: HABBO_TEXT_STYLES[habboKey],
            field: fieldKey ? JSON.parse(fieldKey) as FlashTextFieldOverrides : undefined,
            face: faceFamily ? { fontFamily: faceFamily, bold: !!faceBold, italic: !!faceItalic } : undefined,
            fontSize,
            color: color ? new Color(color).toNumber() : undefined,
        });
        const shadow = (shadowColor !== undefined && shadowAngle !== undefined && shadowDistance !== undefined)
            ? { color: shadowColor, alpha: shadowAlpha ?? 1, offsetX: Math.round(Math.cos(shadowAngle) * shadowDistance), offsetY: Math.round(Math.sin(shadowAngle) * shadowDistance) }
            : undefined;
        const layoutOptions: FlashTextLayoutOptions = { wordWrap, wrapWidth: wordWrap ? wordWrapWidth : undefined, breakWords };
        const parsed = markup ? parseFlashTextMarkupWithLinks(text, format, { resolveFace: resolveMarkupFace }) : undefined;
        let content: string | FlashTextRun[] = parsed ? parsed.runs : text;

        if (overflowKey) {
            const plain = (typeof content === 'string') ? content : content.map(run => run.text).join('');
            const truncated = truncateOverflow(plain, format, layoutOptions, align ?? 'left', lineHeight, JSON.parse(overflowKey) as FlashTextOverflowReplace);

            if (truncated !== plain) content = truncated;
        }

        if (!content.length) return undefined;

        const rendered = renderFlashTextCanvas(content, format, { align, ...layoutOptions, lineHeight, shadow });

        if (!rendered) return undefined;

        // A truncated text is plain (`_field.text = ...`), so it keeps no links.
        return (parsed?.links.length && (typeof content !== 'string')) ? { ...rendered, links: parsed.links } : rendered;
    }, [ text, habboKey, color, fontSize, faceFamily, faceBold, faceItalic, fieldKey, overflowKey, markup, align, wordWrap, wordWrapWidth, breakWords, lineHeight, shadowAlpha, shadowAngle, shadowDistance, shadowColor ]);
};

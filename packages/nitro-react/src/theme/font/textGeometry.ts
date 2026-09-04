import { CanvasTextMetrics, TextStyle, TextStyleOptions } from 'pixi.js';
import { caretRect, hitTestText, type LayoutResult, selectionRects } from 'truffle-text';
import { getTruffle } from 'truffle-text/react';

import { getPixiTextStyle, resolveHabboKey, TextStyleKey } from '../utils/textStyles';
import { HabboStyleKey } from './truffle';

export interface TextCaretRect {
    /** The (clamped) text index this caret sits before. */
    index: number;
    lineIndex: number;
    x: number;
    y: number;
    height: number;
}

export interface TextSelectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Caret/selection/hit-test geometry for one string as `ThemeText` will draw it, in the pixel
 * space of the text's own sprite (origin at the sprite's top-left). Everything an editable
 * field needs to overlay a caret and selection highlight on a rasterised text and to turn a
 * pointer position back into a text index - the same three operations `truffle-text`'s own
 * `TruffleEditable` builds its editor on.
 */
export interface TextGeometry {
    /** The string to hand `ThemeText` - the text itself for truffle (which wraps on its own),
     *  or the text re-joined with explicit newlines at the wrap points for native rendering
     *  (whose Pixi-side wrapper has no way to report where it broke the lines). */
    renderText: string;
    /** Whether `ThemeText` must still be told to word-wrap `renderText` (truffle) or the
     *  wrapping is already baked into `renderText`'s newlines (native). */
    wordWrap: boolean;
    width: number;
    height: number;
    /** Distance between one line's top and the next's. */
    lineHeight: number;
    caret: (index: number) => TextCaretRect;
    selection: (start: number, end: number) => TextSelectionRect[];
    hitTest: (x: number, y: number) => number;
}

const clampIndex = (text: string, index: number) => Math.max(0, Math.min(text.length, Math.trunc(index) || 0));

/**
 * Truffle lays the text out itself and exposes per-character bounds on the result, so its own
 * `caretRect`/`selectionRects`/`hitTestText` helpers (the ones `TruffleEditable` uses) answer
 * every geometry question exactly, kerning and grid-fitting included. Coordinates are in the
 * render buffer's space, which is exactly `TruffleTextPixi`'s sprite (it blits the buffer 1:1,
 * gutter included). Same `LayoutOptions` as `TruffleTextPixi` passes to `renderToBuffer`, so
 * the measured layout is the very one the sprite was rasterised from.
 */
const createTruffleGeometry = (text: string, habboKey: HabboStyleKey, wrapWidth: number | undefined): TextGeometry | undefined => {
    const truffle = getTruffle();

    if (!truffle) return undefined;

    const wordWrap = wrapWidth !== undefined;
    let layout: LayoutResult;

    try {
        layout = truffle.measure(text, habboKey, wordWrap ? { wordWrap: true, width: wrapWidth } : {});
    } catch {
        return undefined;
    }

    return {
        renderText: text,
        wordWrap,
        width: layout.width,
        height: layout.height,
        lineHeight: layout.metrics.height + layout.metrics.leading,
        caret: (index) => {
            const rect = caretRect(layout, text, index);

            return { index: rect.index, lineIndex: rect.lineIndex, x: rect.x, y: rect.y, height: rect.height };
        },
        selection: (start, end) => selectionRects(layout, text, start, end).map(({ x, y, width, height }) => ({ x, y, width, height })),
        hitTest: (x, y) => hitTestText(layout, text, x, y),
    };
};

interface WrappedLine {
    text: string;
    /** Index into the source text of this line's first character. */
    start: number;
}

/**
 * Greedy word wrap, one source line per explicit newline and further split whenever the next
 * word would overflow `wrapWidth` - a word wider than a whole line breaks mid-word, one line's
 * worth of characters at a time (what Pixi's `breakWords` does). Trailing whitespace stays on
 * the line it follows (measured without it, like a browser), so a caret after a wrapped space
 * lands at the start of the next line.
 */
const wrapLines = (text: string, measure: (value: string) => number, wrapWidth: number | undefined): WrappedLine[] => {
    const lines: WrappedLine[] = [];
    let offset = 0;

    for (const paragraph of text.split('\n')) {
        if (wrapWidth === undefined) {
            lines.push({ text: paragraph, start: offset });
        } else {
            let lineStart = 0;
            let current = '';
            const flush = () => {
                lines.push({ text: current, start: offset + lineStart });
                lineStart += current.length;
                current = '';
            };

            for (const token of paragraph.match(/\S+\s*|\s+/g) ?? []) {
                if (current && measure((current + token).trimEnd()) > wrapWidth) flush();

                let rest = token;

                while (!current && rest.length > 1 && measure(rest.trimEnd()) > wrapWidth) {
                    let count = 1;

                    while (count < rest.length && measure(rest.slice(0, count + 1)) <= wrapWidth) count++;

                    current = rest.slice(0, count);
                    flush();
                    rest = rest.slice(count);
                }

                current += rest;
            }

            lines.push({ text: current, start: offset + lineStart });
        }

        offset += paragraph.length + 1;
    }

    return lines;
};

/**
 * Native (`pixiText`) fallback for a style truffle doesn't cover - a raw `fontSize`/`fontFamily`
 * override, see `resolveHabboKey`. Pixi's `CanvasTextMetrics` only reports whole-line widths,
 * so a caret's x is the width of the line's prefix up to it (the same canvas `measureText`
 * Pixi itself sizes the line with, so the two agree to the pixel), and line advance/height
 * follow `CanvasTextMetrics.measureText`'s own formulas so the overlay lines up with where
 * `CanvasTextGenerator` actually paints each line.
 */
const createNativeGeometry = (text: string, style: TextStyle, wrapWidth: number | undefined): TextGeometry => {
    const measure = (value: string) => (value.length ? CanvasTextMetrics.measureText(value, style).width : 0);
    const probe = CanvasTextMetrics.measureText(' ', style);
    const lineHeight = probe.lineHeight;
    const advance = lineHeight + style.leading;
    const lines = wrapLines(text, measure, wrapWidth);
    const lineIndexAt = (index: number) => {
        let found = 0;

        lines.forEach((line, lineIndex) => {
            if (line.start <= index) found = lineIndex;
        });

        return found;
    };

    return {
        renderText: lines.map(line => line.text).join('\n'),
        wordWrap: false,
        width: Math.max(0, ...lines.map(line => measure(line.text))),
        height: Math.max(lineHeight, probe.fontProperties.fontSize) + (lines.length - 1) * advance,
        lineHeight: advance,
        caret: (index) => {
            const clamped = clampIndex(text, index);
            const lineIndex = lineIndexAt(clamped);
            const line = lines[lineIndex];

            return { index: clamped, lineIndex, x: measure(line.text.slice(0, clamped - line.start)), y: lineIndex * advance, height: lineHeight };
        },
        selection: (start, end) => {
            const from = clampIndex(text, Math.min(start, end));
            const to = clampIndex(text, Math.max(start, end));
            const rects: TextSelectionRect[] = [];

            lines.forEach((line, lineIndex) => {
                const first = Math.max(from, line.start) - line.start;
                const last = Math.min(to, line.start + line.text.length) - line.start;

                if (last <= first) return;

                const x = measure(line.text.slice(0, first));
                const right = measure(line.text.slice(0, last));

                if (right > x) rects.push({ x, y: lineIndex * advance, width: right - x, height: lineHeight });
            });

            return rects;
        },
        hitTest: (x, y) => {
            const line = lines[Math.max(0, Math.min(lines.length - 1, Math.floor(y / advance)))];
            let previous = 0;

            for (let count = 1; count <= line.text.length; count++) {
                const next = measure(line.text.slice(0, count));

                if (x < (previous + next) / 2) return line.start + count - 1;

                previous = next;
            }

            return line.start + line.text.length;
        },
    };
};

/**
 * Geometry for `text` as `ThemeText` renders it with this `textStyle`/`textOptions` pair -
 * truffle's when that pair resolves to a truffle style (the normal case), native canvas
 * metrics otherwise or while truffle's boot-time preload is still in flight. `wrapWidth`
 * (the field's inner width) turns on word wrapping; leave it out for a single-line field.
 */
export const createTextGeometry = (text: string, textStyle: TextStyleKey, textOptions: TextStyleOptions | undefined, wrapWidth?: number): TextGeometry => {
    const habboKey = resolveHabboKey(textStyle, textOptions);
    const width = wrapWidth !== undefined && wrapWidth > 0 ? wrapWidth : undefined;

    return (habboKey && createTruffleGeometry(text, habboKey, width)) || createNativeGeometry(text, getPixiTextStyle(textStyle, textOptions), width);
};

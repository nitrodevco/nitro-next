/**
 * A multi-line text block on top of `FlashTextRenderer`: greedy word wrap on the exact advance
 * widths, one rendered run per same-format stretch of a line, stacked at the font's own line
 * height into one premultiplied RGBA bitmap - with the 2px gutter a Flash `TextField` has on
 * every side.
 */
import { NativeRenderResult } from './air32/types';
import { FlashTextFormat, normalizeFlashTextFormat } from './flashTextFormat';
import { FlashTextRenderer } from './FlashTextRenderer';

/** A stretch of text in one format; a block of rich text is several of them. */
export interface FlashTextRun {
    text: string;
    format: FlashTextFormat;
}

/** A same-format stretch of one laid-out line, `x` px from the line's own left edge. */
export interface FlashTextSegment extends FlashTextRun {
    x: number;
    width: number;
}

export interface FlashTextLine {
    text: string;
    segments: FlashTextSegment[];
    width: number;
    /** The line covers `[start, end)` of the block's text; the space or newline it broke at is consumed. */
    start: number;
    end: number;
}

export interface FlashTextLayoutOptions {
    wordWrap?: boolean;
    wrapWidth?: number;
    /** Breaks a word wider than `wrapWidth` between characters instead of letting it overflow. */
    breakWords?: boolean;
}

export interface FlashTextBlockOptions extends FlashTextLayoutOptions {
    align?: 'left' | 'center' | 'right';
    /** A fixed bitmap width; the text's own width plus gutters when absent. */
    width?: number;
    /** The advance from one line to the next in px; the font's own line height when absent. */
    lineHeight?: number;
}

export interface FlashTextBlock {
    width: number;
    height: number;
    /** Premultiplied RGBA. */
    pixels: Uint8ClampedArray;
    lines: string[];
    lineHeight: number;
    baseline: number;
    textWidth: number;
    textHeight: number;
    gutter: number;
}

/** The width of `text` in `format`, or `null` when it cannot be measured. */
export type FlashTextMeasure = (text: string, format: FlashTextFormat) => number | null;

/** The empty border a Flash `TextField` keeps around its text. */
export const FLASH_TEXT_GUTTER = 2;

/**
 * Breaks `runs` into lines. Generic over `measure` so the exact renderer and a canvas fallback
 * wrap the same way; returns `null` as soon as a stretch cannot be measured.
 */
export const layoutFlashTextLines = (runs: readonly FlashTextRun[], options: FlashTextLayoutOptions, measure: FlashTextMeasure): FlashTextLine[] | null => {
    const text = runs.map(run => run.text).join('');
    const runIndexes: number[] = [];

    runs.forEach((run, runIndex) => {
        for (let index = 0; index < run.text.length; index++) runIndexes.push(runIndex);
    });

    const widths = new Map<string, number | null>();
    const measureCached = (piece: string, runIndex: number): number | null => {
        const key = `${runIndex}|${piece}`;

        if (!widths.has(key)) widths.set(key, measure(piece, runs[runIndex].format));

        return widths.get(key) ?? null;
    };

    /** The same-format stretches of `[start, end)`, positioned left to right; `null` when one is unmeasurable. */
    const segmentsOf = (start: number, end: number): FlashTextSegment[] | null => {
        const segments: FlashTextSegment[] = [];
        let x = 0;

        for (let from = start; from < end;) {
            let to = from + 1;

            while (to < end && runIndexes[to] === runIndexes[from]) to++;

            const piece = text.slice(from, to);
            const width = measureCached(piece, runIndexes[from]);

            if (width == null) return null;

            segments.push({ text: piece, format: runs[runIndexes[from]].format, x, width });
            x += width;
            from = to;
        }

        return segments;
    };

    const widthOf = (start: number, end: number): number | null => {
        const segments = segmentsOf(start, end);

        return segments ? segments.reduce((total, segment) => total + segment.width, 0) : null;
    };

    const lines: FlashTextLine[] = [];
    const wrapWidth = (options.wordWrap && options.wrapWidth != null && options.wrapWidth > 0) ? options.wrapWidth : null;
    let failed = false;

    const pushLine = (start: number, end: number): void => {
        const segments = segmentsOf(start, end);

        if (!segments) {
            failed = true;

            return;
        }

        lines.push({ text: text.slice(start, end), segments, width: segments.reduce((total, segment) => total + segment.width, 0), start, end });
    };

    /** How many characters of the word at `[start, end)` fit into `wrapWidth` - at least one. */
    const fittingLength = (start: number, end: number, limit: number): number => {
        let length = 1;

        while (start + length < end) {
            const width = widthOf(start, start + length + 1);

            if (width == null || width > limit) break;

            length++;
        }

        return length;
    };

    let paragraphStart = 0;

    while (paragraphStart <= text.length && !failed) {
        const newline = text.indexOf('\n', paragraphStart);
        const paragraphEnd = (newline < 0) ? text.length : newline;

        if (wrapWidth == null) {
            pushLine(paragraphStart, paragraphEnd);
        } else {
            let lineStart = paragraphStart;
            let lineEnd = paragraphStart;
            let wordStart = paragraphStart;

            while (wordStart <= paragraphEnd && !failed) {
                const space = text.indexOf(' ', wordStart);
                const wordEnd = (space < 0 || space > paragraphEnd) ? paragraphEnd : space;

                if (lineEnd === lineStart) {
                    // An empty line takes the word whatever its width, like the client's own wrap.
                    lineStart = wordStart;
                    lineEnd = wordEnd;
                } else {
                    const width = widthOf(lineStart, wordEnd);

                    if (width == null) {
                        failed = true;
                    } else if (width <= wrapWidth) {
                        lineEnd = wordEnd;
                    } else {
                        pushLine(lineStart, lineEnd);
                        lineStart = wordStart;
                        lineEnd = wordEnd;
                    }
                }

                if (options.breakWords) {
                    let width = widthOf(lineStart, lineEnd);

                    while (!failed && width != null && width > wrapWidth && lineEnd - lineStart > 1 && !text.slice(lineStart, lineEnd).includes(' ')) {
                        const length = fittingLength(lineStart, lineEnd, wrapWidth);

                        pushLine(lineStart, lineStart + length);
                        lineStart += length;
                        width = widthOf(lineStart, lineEnd);
                    }
                }

                wordStart = wordEnd + 1;
            }

            if (!failed) pushLine(lineStart, lineEnd);
        }

        if (newline < 0) break;

        paragraphStart = newline + 1;
    }

    return failed ? null : lines;
};

const measureExact: FlashTextMeasure = (text, format) => FlashTextRenderer.measure(text, format);

const toRuns = (content: string | readonly FlashTextRun[], format: FlashTextFormat): readonly FlashTextRun[] => ((typeof content === 'string') ? [ { text: content, format } ] : content);

/** Greedy word wrap using the exact advance widths; `null` when a character has no captured glyph. */
export const wrapLines = (text: string, format: FlashTextFormat, wrapWidth: number | null | undefined): string[] | null => {
    const lines = layoutFlashTextLines([ { text, format } ], { wordWrap: true, wrapWidth: wrapWidth ?? undefined }, measureExact);

    return lines ? lines.map(line => line.text) : null;
};

/** The exact layout of a block - what the caret and selection geometry of a text field read. */
export const layoutFlashTextBlock = (content: string | readonly FlashTextRun[], format: Partial<FlashTextFormat> | null | undefined, options: FlashTextBlockOptions = {}): FlashTextLine[] | null => {
    return layoutFlashTextLines(toRuns(content, normalizeFlashTextFormat(format)), { ...options, wrapWidth: options.wrapWidth ?? options.width }, measureExact);
};

/** The advance from one line of `format` to the next, in whole px. */
export const flashTextLineHeight = (format: FlashTextFormat): number | null => {
    const metrics = FlashTextRenderer.metrics(format);

    return metrics ? Math.round(metrics.ascent + metrics.descent + format.leading) : null;
};

const blitPremultiplied = (source: Uint8ClampedArray, sourceWidth: number, sourceHeight: number, destination: Uint8ClampedArray, destinationWidth: number, destinationHeight: number, offsetX: number, offsetY: number): void => {
    for (let sourceY = 0; sourceY < sourceHeight; sourceY++) {
        const destinationY = sourceY + offsetY;

        if (destinationY < 0 || destinationY >= destinationHeight) continue;

        for (let sourceX = 0; sourceX < sourceWidth; sourceX++) {
            const destinationX = sourceX + offsetX;

            if (destinationX < 0 || destinationX >= destinationWidth) continue;

            const sourceOffset = (sourceY * sourceWidth + sourceX) * 4;
            const sourceAlpha = source[sourceOffset + 3];

            if (sourceAlpha === 0) continue;

            const destinationOffset = (destinationY * destinationWidth + destinationX) * 4;
            const inverseAlpha = 1 - sourceAlpha / 255;

            destination[destinationOffset] = source[sourceOffset] + destination[destinationOffset] * inverseAlpha;
            destination[destinationOffset + 1] = source[sourceOffset + 1] + destination[destinationOffset + 1] * inverseAlpha;
            destination[destinationOffset + 2] = source[sourceOffset + 2] + destination[destinationOffset + 2] * inverseAlpha;
            destination[destinationOffset + 3] = sourceAlpha + destination[destinationOffset + 3] * inverseAlpha;
        }
    }
};

/**
 * Renders plain text, or rich text as runs, into one bitmap. The first run's format (or
 * `format` for plain text) decides the block's line height and baseline. Returns `null` when
 * the exact renderer cannot take the text - an uncaptured glyph, a fractional size, letter
 * spacing - and the caller falls back to the browser's own text.
 */
export const renderTextBlock = (content: string | readonly FlashTextRun[], format: Partial<FlashTextFormat> | null | undefined, options: FlashTextBlockOptions = {}): FlashTextBlock | null => {
    const blockFormat = normalizeFlashTextFormat(format);
    const runs = toRuns(content, blockFormat);
    const lines = layoutFlashTextLines(runs, { ...options, wrapWidth: options.wrapWidth ?? options.width }, measureExact);

    if (!lines) return null;

    const metrics = FlashTextRenderer.metrics(runs[0]?.format ?? blockFormat);

    if (!metrics) return null;

    const align = options.align ?? 'left';
    const gutter = FLASH_TEXT_GUTTER;
    const lineHeight = options.lineHeight ?? Math.round(metrics.ascent + metrics.descent + (runs[0]?.format ?? blockFormat).leading);
    const textWidth = Math.max(0, ...lines.map(line => line.width));
    const renderedLines: { segment: FlashTextSegment; rendered: NativeRenderResult }[][] = [];
    let inkWidth = 0;

    for (const line of lines) {
        const renderedSegments: { segment: FlashTextSegment; rendered: NativeRenderResult }[] = [];

        for (const segment of line.segments) {
            if (!segment.text.length) continue;

            const rendered = FlashTextRenderer.render(segment.text, segment.format);

            if (!rendered?.retainedPixels) return null;

            renderedSegments.push({ segment, rendered });
            // An italic run leans past its advance width; the bitmap has to hold that overhang too.
            inkWidth = Math.max(inkWidth, Math.round(segment.x) + rendered.width);
        }

        renderedLines.push(renderedSegments);
    }

    const width = Math.max(1, Math.ceil(options.width ?? Math.max(textWidth + gutter * 2, inkWidth)));
    const height = Math.max(1, (lines.length - 1) * lineHeight + Math.ceil(metrics.ascent + metrics.descent) + gutter * 2);
    const pixels = new Uint8ClampedArray(width * height * 4);
    const innerWidth = width - gutter * 2;

    renderedLines.forEach((renderedSegments, lineIndex) => {
        const lineWidth = lines[lineIndex].width;
        const lineX = (align === 'center') ? Math.floor((innerWidth - lineWidth) / 2) : (align === 'right') ? Math.floor(innerWidth - lineWidth) : 0;

        for (const { segment, rendered } of renderedSegments) {
            if (rendered.retainedPixels) blitPremultiplied(rendered.retainedPixels, rendered.width, rendered.height, pixels, width, height, lineX + Math.round(segment.x), lineIndex * lineHeight);
        }
    });

    return { width, height, pixels, lines: lines.map(line => line.text), lineHeight, baseline: metrics.baseline + gutter, textWidth, textHeight: lines.length * lineHeight, gutter };
};

/**
 * Caret and selection geometry of a text field, read off the same layout the block renderer
 * draws - so the caret sits exactly between the glyphs it is drawn next to. Coordinates are in
 * the rendered bitmap's own space, gutter included.
 */
import { FLASH_TEXT_GUTTER, FlashTextLayoutOptions, FlashTextLine, flashTextLineHeight, layoutFlashTextBlock } from './flashTextBlock';
import { FlashTextFormat } from './flashTextFormat';
import { FlashTextRenderer } from './FlashTextRenderer';

export interface FlashTextRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** The line holding character `index`: the first one that ends at or after it. */
const lineIndexOf = (lines: FlashTextLine[], index: number): number => {
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        if (index <= lines[lineIndex].end) return lineIndex;
    }

    return lines.length - 1;
};

/** The x of the gap before character `index`, measured from the line's own left edge. */
const offsetInLine = (line: FlashTextLine, index: number, format: FlashTextFormat): number => {
    const column = Math.max(0, Math.min(index - line.start, line.text.length));

    if (column === 0) return 0;

    return FlashTextRenderer.measureCharPositions(line.text, format)?.[column] ?? line.width;
};

/** Where the caret stands before character `index`; `null` when the text cannot be laid out exactly. */
export const flashTextCaretRect = (text: string, index: number, format: FlashTextFormat, options: FlashTextLayoutOptions = {}): FlashTextRect | null => {
    const lineHeight = flashTextLineHeight(format);
    const lines = layoutFlashTextBlock(text, format, options);

    if (lineHeight == null || !lines?.length) return null;

    const lineIndex = lineIndexOf(lines, Math.max(0, Math.min(index, text.length)));

    return { x: FLASH_TEXT_GUTTER + offsetInLine(lines[lineIndex], index, format), y: FLASH_TEXT_GUTTER + lineIndex * lineHeight, width: 1, height: lineHeight };
};

/** One rectangle per line the range `[start, end)` touches. */
export const flashTextSelectionRects = (text: string, start: number, end: number, format: FlashTextFormat, options: FlashTextLayoutOptions = {}): FlashTextRect[] | null => {
    const lineHeight = flashTextLineHeight(format);
    const lines = layoutFlashTextBlock(text, format, options);

    if (lineHeight == null || !lines?.length) return null;

    const rects: FlashTextRect[] = [];

    lines.forEach((line, lineIndex) => {
        if (end <= line.start || start > line.end || start === end) return;

        const from = offsetInLine(line, Math.max(start, line.start), format);
        const to = offsetInLine(line, Math.min(end, line.end), format);

        rects.push({ x: FLASH_TEXT_GUTTER + from, y: FLASH_TEXT_GUTTER + lineIndex * lineHeight, width: Math.max(1, to - from), height: lineHeight });
    });

    return rects;
};

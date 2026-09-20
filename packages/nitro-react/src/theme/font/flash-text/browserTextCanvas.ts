/**
 * The stand-in for text the exact renderer cannot take - a character the captured fonts do not
 * carry, which for free-form text like chat means anything outside printable ASCII. The same
 * wrap, run and gutter handling as the exact block, drawn with the browser's own canvas text in
 * the client's fonts (registered from `font-faces.nitro`, see `flashFonts.ts`), so a bubble
 * keeps its layout either way.
 */
import { FLASH_TEXT_GUTTER, FlashTextBlockOptions, FlashTextRun, layoutFlashTextLines } from './flashTextBlock';
import { FlashTextCanvas } from './flashTextCanvas';
import { FlashTextFormat } from './flashTextFormat';
import { FlashTextRenderer } from './FlashTextRenderer';

let measureContext: CanvasRenderingContext2D | null | undefined;

const cssFont = (format: FlashTextFormat): string => `${format.italic ? 'italic ' : ''}${format.bold ? 'bold ' : ''}${format.fontSize}px "${format.fontFamily}", sans-serif`;

const cssColor = (color: number): string => `#${(color & 0xFFFFFF).toString(16).padStart(6, '0')}`;

const measureBrowserText = (text: string, format: FlashTextFormat): number | null => {
    measureContext ??= document.createElement('canvas').getContext('2d');

    if (!measureContext) return null;

    measureContext.font = cssFont(format);

    return measureContext.measureText(text).width;
};

export const renderBrowserTextCanvas = (runs: readonly FlashTextRun[], options: FlashTextBlockOptions = {}): FlashTextCanvas | null => {
    const baseFormat = runs[0]?.format;
    const lines = baseFormat ? layoutFlashTextLines(runs, { ...options, wrapWidth: options.wrapWidth ?? options.width }, measureBrowserText) : null;

    if (!baseFormat || !lines) return null;

    // The font's own metrics when only a glyph is missing, so both paths share one line height.
    const metrics = FlashTextRenderer.metrics(baseFormat);
    const ascent = metrics?.ascent ?? baseFormat.fontSize;
    const descent = metrics?.descent ?? Math.ceil(baseFormat.fontSize * 0.25);
    const gutter = FLASH_TEXT_GUTTER;
    const lineHeight = options.lineHeight ?? Math.round(ascent + descent + baseFormat.leading);
    const textWidth = Math.max(0, ...lines.map(line => line.width));
    const width = Math.max(1, Math.ceil(options.width ?? textWidth + gutter * 2));
    const height = Math.max(1, (lines.length - 1) * lineHeight + Math.ceil(ascent + descent) + gutter * 2);
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) return null;

    const baseline = Math.round(ascent) + gutter;
    const innerWidth = width - gutter * 2;

    context.textBaseline = 'alphabetic';

    lines.forEach((line, lineIndex) => {
        const lineX = gutter + ((options.align === 'center') ? Math.floor((innerWidth - line.width) / 2) : (options.align === 'right') ? Math.floor(innerWidth - line.width) : 0);
        const lineY = lineIndex * lineHeight + baseline;

        for (const segment of line.segments) {
            const x = lineX + Math.round(segment.x);

            context.font = cssFont(segment.format);
            context.fillStyle = cssColor(segment.format.color);
            context.fillText(segment.text, x, lineY);

            if (segment.format.underline) context.fillRect(x, lineY + 1, Math.ceil(segment.width), 1);
        }
    });

    return { canvas, width, height, textWidth, textHeight: lines.length * lineHeight, lineHeight, baseline, gutter };
};

import { layoutBitmapText } from './bitmapTextLayout';
import type {
    BitmapTextAlign,
    LoadedBitmapFont,
} from './types';

export const paintBitmapTextMask = (
    context: CanvasRenderingContext2D,
    font: LoadedBitmapFont,
    text: string,
    width: number,
    height: number,
    align: BitmapTextAlign,
) => {
    const { image, metrics } = font;
    const usesFlashCoordinates = metrics.coordinateMode === 'flash-text-field';
    const baseline =
        Math.round((height - metrics.ascent - metrics.descent) / 2) +
        Math.floor(
            Math.max(0, metrics.lineHeight - metrics.ascent - metrics.descent) / 2,
        ) +
        metrics.ascent;

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = false;

    const layout = layoutBitmapText(metrics, text);
    const lineStart =
        align === 'center'
            ? (width - layout.width) / 2
            : align === 'right'
              ? width - layout.width
              : 0;

    for (const { glyph, x } of layout.glyphs) {
        if (glyph.width <= 0 || glyph.height <= 0) continue;

        const destinationY =
            usesFlashCoordinates && Number.isFinite(glyph.fieldTop)
                ? Number(glyph.fieldTop)
                : baseline + (glyph.yOffset ?? 0);

        context.drawImage(
            image,
            glyph.x,
            glyph.y,
            glyph.width,
            glyph.height,
            usesFlashCoordinates ? lineStart + x : Math.round(lineStart + x),
            usesFlashCoordinates ? destinationY : Math.round(destinationY),
            glyph.width,
            glyph.height,
        );
    }
};

export const tintBitmapTextMask = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
) => {
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'source-over';
};

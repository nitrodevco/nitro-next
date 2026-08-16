import type { BitmapFontMetrics, BitmapGlyph } from './types';

type PositionedBitmapGlyph = {
    glyph: BitmapGlyph;
    x: number;
};

export type BitmapTextLayout = {
    glyphs: PositionedBitmapGlyph[];
    width: number;
};

const FLASH_TWIPS_PER_PIXEL = 20;

const getGlyph = (metrics: BitmapFontMetrics, character: string) =>
    metrics.glyphs[character] ?? metrics.glyphs['?'];

export const layoutBitmapText = (
    metrics: BitmapFontMetrics,
    text: string,
): BitmapTextLayout => {
    // Flash carries glyph advances in twips and selects a phase-specific raster.
    if (
        metrics.coordinateMode === 'flash-text-field' &&
        metrics.phaseCount === FLASH_TWIPS_PER_PIXEL
    ) {
        let cursorTwips = 0;

        const glyphs = Array.from(text).flatMap(character => {
            const sourceGlyph = getGlyph(metrics, character);

            if (!sourceGlyph) return [];

            const phase =
                ((cursorTwips % FLASH_TWIPS_PER_PIXEL) + FLASH_TWIPS_PER_PIXEL) %
                FLASH_TWIPS_PER_PIXEL;
            const glyph = sourceGlyph.phases?.[phase] ?? sourceGlyph;
            const positioned = {
                glyph,
                x:
                    Math.floor(cursorTwips / FLASH_TWIPS_PER_PIXEL) +
                    (glyph.xOffset ?? 0),
            };

            cursorTwips +=
                glyph.advanceTwips ??
                sourceGlyph.advanceTwips ??
                Math.round((sourceGlyph.xAdvance ?? 0) * FLASH_TWIPS_PER_PIXEL);

            return [positioned];
        });

        return { glyphs, width: cursorTwips / FLASH_TWIPS_PER_PIXEL };
    }

    let cursor = 0;
    let previous = '';

    const glyphs = Array.from(text).flatMap(character => {
        const glyph = getGlyph(metrics, character);

        if (!glyph) return [];
        if (previous) cursor += metrics.kernings?.[previous + character] ?? 0;

        const positioned = { glyph, x: cursor + (glyph.xOffset ?? 0) };

        cursor += glyph.xAdvance ?? 0;
        previous = character;

        return [positioned];
    });

    return { glyphs, width: cursor };
};

import { Box, LayoutImage, Region, ThemeImage } from '#base/theme';

/** The `unique_item_label_number_glyphs` strip: `x, width` of each digit, from the window manager manifest. */
const GLYPHS: [number, number][] = [ [ 1, 5 ], [ 6, 3 ], [ 9, 5 ], [ 14, 5 ], [ 19, 5 ], [ 24, 5 ], [ 29, 5 ], [ 34, 5 ], [ 39, 5 ], [ 44, 5 ] ];
const GLYPH_HEIGHT = 5;
const GLYPH_STRIP = LayoutImage('unique_item_label_number_glyphs.png');
/** `LimitedItemNumberBitmap.createBitmap` draws nothing for anything it cannot fit in six digits. */
const MAX_NUMBER = 999999;

/** A number set in the strip's glyphs, centred in a 20x5 slot - `LimitedItemNumberBitmap.createBitmap`. */
const GlyphNumber = ({ value, layout }: { value: number; layout: { left: number; top?: number; bottom?: number } }) => {
    const digits = ((value < 0) || (value > MAX_NUMBER)) ? [] : String(value).split('').map(Number);

    return (
        <Box layout={{ position: 'absolute', width: 20, height: GLYPH_HEIGHT, flexDirection: 'row', justifyContent: 'center', ...layout }}>
            {digits.map((digit, index) => (
                <ThemeImage
                    key={index}
                    src={GLYPH_STRIP}
                    frame={{ x: GLYPHS[digit][0], y: 0, width: GLYPHS[digit][1], height: GLYPH_HEIGHT }}
                    // Each glyph carries a pixel of spacing on its right; the last one gives it back.
                    layout={{ marginRight: (index === digits.length - 1) ? -1 : 0 }}
                />
            ))}
        </Box>
    );
};

export interface UniqueItemPlaqueViewProps {
    serialNumber: number;
    seriesSize: number;
    layout?: { left?: number; top?: number; right?: number; bottom?: number };
}

/**
 * The little metal plaque a limited edition item wears - `unique_item_overlay_preview` with
 * `LimitedItemPreviewOverlayWidget` filling in the two numbers: the item's serial over the size
 * of its series.
 */
export const UniqueItemPlaqueView = ({ serialNumber, seriesSize, layout }: UniqueItemPlaqueViewProps) => (
    <Region layout={{ position: 'absolute', width: 40, height: 40, ...layout }}>
        <ThemeImage
            src={LayoutImage('unique_item_large_tile_upright.png')}
            layout={{ position: 'absolute', left: 5, top: 0, width: 30, height: 30 }}
        />
        <GlyphNumber
            value={serialNumber}
            layout={{ left: 10, top: 16 }}
        />
        <GlyphNumber
            value={seriesSize}
            layout={{ left: 10, top: 23 }}
        />
    </Region>
);

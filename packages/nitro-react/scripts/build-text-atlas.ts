/**
 * Bakes pixel-perfect Habbo-style bitmap font atlases from `HABBO_TEXT_STYLES`
 * (habbo-text-styles.ts), using truffle-text (github.com/iSetht/truffle-text,
 * MIT) as a build-time-only rasterizer. This script is the *only* place
 * truffle-text is used — nothing it touches ships to the browser; the app
 * only ever reads the PNG/JSON this script writes.
 *
 * Re-run whenever habbo-text-styles.ts changes:
 *
 *   yarn workspace @nitrodevco/nitro-react bake-text-atlas
 */
import { createCanvas, ImageData } from 'canvas';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SaffronText } from 'truffle-text/generative';

import { HABBO_TEXT_STYLES } from './habbo-text-styles.ts';
import type { HabboTextStyleDef } from './habbo-text-styles.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEBFONTS_DIR = join(__dirname, '../public/assets/webfonts');
const ATLAS_DIR = join(WEBFONTS_DIR, 'atlas');

/** Maps `HabboTextStyleDef.fontFamily` to the already-existing webfont files
 *  (see `theme/font/fonts.css`) — no new font assets are added by this script. */
const FONT_FILES: Record<HabboTextStyleDef['fontFamily'], { file: string; bold: boolean; italic: boolean }[]> = {
    Ubuntu: [
        { file: 'Ubuntu.ttf', bold: false, italic: false },
        { file: 'Ubuntu-b.ttf', bold: true, italic: false },
        { file: 'Ubuntu-i.ttf', bold: false, italic: true },
        { file: 'Ubuntu-ib.ttf', bold: true, italic: true },
    ],
    UbuntuCondensed: [
        { file: 'Ubuntu-C.ttf', bold: false, italic: false },
    ],
    Volter: [
        { file: 'Volter_Goldfish.ttf', bold: false, italic: false },
    ],
    'Volter Bold': [
        { file: 'Volter_Bold.ttf', bold: false, italic: false },
    ],
};

/**
 * Glyphs are rasterized at `ATLAS_SCALE`x the nominal font size. This MUST be `1` -
 * baking at a higher scale and downsampling at runtime was tried (retina crispness
 * was the goal) and is what caused "some letters look thicker than others": Flash's
 * `antiAliasType: 'advanced'` with `gridFitType: 'pixel'` is a *hinting* engine - it
 * snaps each glyph's stems/counters to whole physical pixels for the size it's
 * asked to render at. Baking at `fontSize * 2` makes it hint stems to whole pixels
 * at the 2x grid; a stem hinted to an even width (e.g. 8px) halves cleanly back to
 * logical size (4px), but one hinted to an odd width (e.g. 9px) does not (4.5px) -
 * different glyphs land on different sides of that coin essentially at random
 * (confirmed empirically: ~half the glyphs in a baked style have odd physical
 * widths), so their stroke weight is inconsistent with their neighbors' once
 * displayed back down. Baking at the *true* nominal size instead means truffle's
 * hinter snaps every glyph to the actual pixel grid it will be shown on - the same
 * grid Flash itself hinted for - so every glyph's stroke width is a whole pixel at
 * *this* size, not a fraction of one. Retina sharpness is handled separately, and
 * safely, by nearest-neighbor-upscaling the whole rendered line by the runtime's
 * own (always-integer, via `GetPixelRatio()`) device pixel ratio - an exact integer
 * multiply has no fractional-pixel case to get inconsistent about.
 */
const ATLAS_SCALE = 1;

const range = (start: number, end: number): number[] => {
    const out: number[] = [];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
};

// Basic Latin + Latin-1 Supplement printable ranges — covers English,
// Portuguese, Spanish, French, German (matches what the webfonts cover).
const CHARSET = [ ...range(0x20, 0x7e), ...range(0xa0, 0xff) ].map(cp => String.fromCodePoint(cp));

const truffle = new SaffronText();

for (const [ family, files ] of Object.entries(FONT_FILES)) {
    for (const { file, bold, italic } of files) {
        const data = readFileSync(join(WEBFONTS_DIR, file));

        truffle.registerFont(family, new Uint8Array(data), { bold, italic, name: `${family}-${bold}-${italic}` });
    }
}

interface GlyphPixels {
    char: string;
    w: number;
    h: number;
    xOffset: number;
    yOffset: number;
    xAdvance: number;
    pixels: Uint8ClampedArray | null;
}

interface PackedGlyph extends GlyphPixels {
    x: number;
    y: number;
}

/** `etchingColor` is ARGB (`#aarrggbb`); Flash's engrave effect is baked directly
 *  into the rasterized glyph by truffle's own renderer, not composited by us. */
const parseEtching = (argb: string, position: HabboTextStyleDef['etchingPosition']) => ({
    alpha: parseInt(argb.slice(1, 3), 16) / 255,
    color: parseInt(argb.slice(3), 16),
    x: 0,
    // A physical-pixel displacement, like everything else rendered at ATLAS_SCALE - scaled
    // up so it still reads as a 1-logical-pixel offset once the atlas is displayed back down.
    y: (position === 'bottom' ? 1 : -1) * ATLAS_SCALE,
});

/** Measures each character's real, kerning-context advance by laying out the whole
 *  charset as one string and reading consecutive `charBounds[i].x` deltas (an
 *  isolated single-char render, as `renderGlyph` below still does for ink cropping,
 *  comes out systematically narrower — no shared context to kern against).
 *
 *  Critically, this must be called with a style whose `gridFitType` is `'none'`
 *  (or `'subpixel'`), never `'pixel'` — confirmed empirically (see git history/
 *  session notes) that `gridFitType: 'pixel'` hints each glyph's *position*, not
 *  just its shape, snapping it to the nearest whole pixel based on its cumulative
 *  x so far. That makes the very same character measure a *different* advance
 *  depending on what precedes it (up to ~1px off between "rendered as part of the
 *  A-Z charset in codepoint order" and "rendered in a real sentence") — a single
 *  baked-per-character number can never be right for both contexts at once, and
 *  the error compounds across a line into exactly the "letters cut off / wrong
 *  spacing" symptom (a too-small advance draws the next glyph's bitmap over the
 *  tail of the previous one). `gridFitType: 'none'` measures the font's true,
 *  position-independent design metrics instead (confirmed via diagnostics:
 *  max deviation 0.000 across render contexts, vs 0.95px for `'pixel'`) — the
 *  caller then rounds this to a whole pixel itself (see `renderGlyph`), which is
 *  what makes both this and the *bitmap shape* land on the pixel grid, without
 *  reintroducing `'pixel'`'s context-dependence. */
const measureTrueAdvances = (style: object, charset: string[]): Map<string, number> => {
    const buffer = truffle.renderToBuffer(charset.join(''), style, { color: 0xffffff });
    const bounds = buffer.layout.charBounds;
    const advances = new Map<string, number>();

    for (let i = 0; i < charset.length; i++) {
        const current = bounds[i];

        if (!current) continue;

        const next = bounds[i + 1];

        advances.set(charset[i], next ? next.x - current.x : current.width);
    }

    return advances;
};

/** Renders one glyph in isolation (not as part of a shared string) so neighboring
 *  glyphs' ink can never bleed into this one's cropped bitmap — kerning between
 *  specific pairs is intentionally not baked in; the runtime layout only ever
 *  sums each glyph's own advance (see `layoutBitmapText`), taken from
 *  `measureTrueAdvances` rather than this isolated render's own (too-narrow)
 *  `charBounds[0].width` — see that function's docblock.
 *
 *  `xAdvance` is kept as its true fractional value here, deliberately NOT rounded
 *  to a whole pixel. Both runtime consumers already round only the *final* glyph
 *  draw position, after accumulating the running (unrounded) sum of advances -
 *  `BitmapTextDom.tsx`'s `drawLines` (`x += glyph.xAdvance`, then
 *  `snapToDevicePixel(x + glyph.xOffset, dpr)` only at the `drawImage` call) and
 *  Pixi's own internal bitmap-text pipe (`getBitmapTextLayout` sums `xAdvance`
 *  unrounded into `charPositions`; `AbstractBitmapTextPipe._updateContext` does
 *  `Math.round(line.charPositions[j] + charData.xOffset)` only when it actually
 *  places each glyph's quad - see `node_modules/pixi.js/lib/scene/text-bitmap/
 *  AbstractBitmapTextPipe.mjs`). This "accumulate exact, round only the final
 *  placement" pattern error-diffuses rounding across a line (typical bitmap-font
 *  practice) - pre-rounding `xAdvance` itself at bake time was tried and made
 *  this *worse*: it forces the same up-to-half-pixel error onto every single
 *  character unconditionally, rather than letting each glyph's own accumulated
 *  position round to whichever side is actually closest, which is what reads as
 *  visibly uneven letter-to-letter spacing (some gaps a whole pixel tighter than
 *  others with no visual reason) rather than the smooth, imperceptible spacing
 *  error-diffusion gives. */
const renderGlyph = (style: object, char: string, xAdvance: number): GlyphPixels => {
    const buffer = truffle.renderToBuffer(char, style, { color: 0xffffff });
    const bounds = buffer.layout.charBounds[0];
    const originX = bounds ? bounds.x : 0;
    const originY = bounds ? bounds.y : 0;

    let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;

    for (let y = 0; y < buffer.height; y++) {
        for (let x = 0; x < buffer.width; x++) {
            if (buffer.data[(y * buffer.width + x) * 4 + 3] > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (maxX < 0) return { char, w: 0, h: 0, xOffset: 0, yOffset: 0, xAdvance: xAdvance / ATLAS_SCALE, pixels: null };

    const w = maxX - minX + 1;
    const h = maxY - minY + 1;
    const pixels = new Uint8ClampedArray(w * h * 4);

    for (let y = 0; y < h; y++) {
        const srcStart = ((minY + y) * buffer.width + minX) * 4;

        pixels.set(buffer.data.subarray(srcStart, srcStart + w * 4), y * w * 4);
    }

    // w/h (the atlas crop) stay physical; xOffset/yOffset/xAdvance are placement
    // metrics other logical-pixel consumers read, so they're brought back down here.
    return { char, w, h, xOffset: (minX - originX) / ATLAS_SCALE, yOffset: (minY - originY) / ATLAS_SCALE, xAdvance: xAdvance / ATLAS_SCALE, pixels };
};

const pack = (glyphs: GlyphPixels[]): { placed: PackedGlyph[]; width: number; height: number } => {
    const MAX_WIDTH = 512;
    const PAD = 1;
    let x = 0, y = 0, rowHeight = 0, canvasWidth = 0;
    const placed: PackedGlyph[] = [];

    for (const g of glyphs) {
        if (g.w === 0) { placed.push({ ...g, x: 0, y: 0 }); continue; }
        if (x > 0 && x + g.w > MAX_WIDTH) { x = 0; y += rowHeight + PAD; rowHeight = 0; }

        placed.push({ ...g, x, y });
        x += g.w + PAD;
        rowHeight = Math.max(rowHeight, g.h);
        canvasWidth = Math.max(canvasWidth, x - PAD);
    }

    return { placed, width: canvasWidth, height: y + rowHeight };
};

const writeAtlasPng = (path: string, placed: PackedGlyph[], width: number, height: number): void => {
    const canvas = createCanvas(Math.max(1, width), Math.max(1, height));
    const ctx = canvas.getContext('2d');

    for (const g of placed) {
        if (!g.pixels) continue;

        ctx.putImageData(new ImageData(g.pixels, g.w, g.h), g.x, g.y);
    }

    writeFileSync(path, canvas.toBuffer('image/png'));
};

mkdirSync(ATLAS_DIR, { recursive: true });

const manifestFonts: Record<string, unknown> = {};
const skipped: string[] = [];

for (const [ key, def ] of Object.entries(HABBO_TEXT_STYLES)) {
    const registered = truffle.registry.getExact(def.fontFamily, !!def.bold, !!def.italic);

    if (!registered) {
        skipped.push(`${key}: no font registered for ${def.fontFamily} bold=${!!def.bold} italic=${!!def.italic}`);
        continue;
    }

    const style = truffle.resolveStyle({
        fontFamily: def.fontFamily,
        fontSize: def.fontSize * ATLAS_SCALE,
        bold: !!def.bold,
        italic: !!def.italic,
        kerning: !!def.kerning,
        antiAliasType: def.antiAliasType,
        gridFitType: def.antiAliasType === 'advanced' ? 'pixel' : 'none',
        sharpness: def.sharpness ?? 0,
        thickness: def.thickness ?? 0,
        engineMode: 'air-generative',
        etching: def.etchingColor ? parseEtching(def.etchingColor, def.etchingPosition) : null,
    });

    // A second, measurement-only style — identical except for `gridFitType` — see
    // `measureTrueAdvances`'s docblock for why advances must never be measured with
    // `'pixel'` grid-fitting despite glyphs being *rendered* with it.
    const measureStyle = truffle.resolveStyle({
        fontFamily: def.fontFamily,
        fontSize: def.fontSize * ATLAS_SCALE,
        bold: !!def.bold,
        italic: !!def.italic,
        kerning: !!def.kerning,
        antiAliasType: def.antiAliasType,
        gridFitType: 'none',
        sharpness: def.sharpness ?? 0,
        thickness: def.thickness ?? 0,
        engineMode: 'air-generative',
        etching: def.etchingColor ? parseEtching(def.etchingColor, def.etchingPosition) : null,
    });

    const trueAdvances = measureTrueAdvances(measureStyle, CHARSET);
    const glyphs = CHARSET.map(char => renderGlyph(style, char, trueAdvances.get(char) ?? 0));
    const { placed, width, height } = pack(glyphs);
    const file = `${key}.png`;

    writeAtlasPng(join(ATLAS_DIR, file), placed, width, height);

    const metrics = truffle.renderToBuffer('M', style, { color: 0xffffff }).layout.metrics;
    const chars: Record<string, unknown> = {};

    for (const g of placed) {
        chars[g.char] = { x: g.x, y: g.y, width: g.w, height: g.h, xOffset: g.xOffset, yOffset: g.yOffset, xAdvance: g.xAdvance };
    }

    // metrics.height/.ascent are physical (rendered at ATLAS_SCALE); back to logical
    // for lineHeight/baseLineOffset, matching xOffset/yOffset/xAdvance above.

    manifestFonts[key] = {
        fontFamily: def.fontFamily,
        fontSize: def.fontSize,
        bold: !!def.bold,
        italic: !!def.italic,
        lineHeight: metrics.height / ATLAS_SCALE,
        baseLineOffset: metrics.ascent / ATLAS_SCALE,
        atlasScale: ATLAS_SCALE,
        defaultTint: def.color ?? null,
        underline: !!def.underline,
        file,
        chars,
    };
}

writeFileSync(
    join(ATLAS_DIR, 'manifest.json'),
    JSON.stringify({ format: 'nitro-text-atlas', version: 1, fonts: manifestFonts }),
);

if (skipped.length) {
    console.warn(`Skipped ${skipped.length} style(s) — no matching font registered:`);
    for (const line of skipped) console.warn(`  - ${line}`);
}

console.log(`Baked ${Object.keys(manifestFonts).length} style atlas(es) to ${ATLAS_DIR}`);

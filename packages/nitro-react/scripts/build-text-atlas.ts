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
 * Glyphs are rasterized at `ATLAS_SCALE`x the nominal font size and packed into the
 * atlas at that physical resolution, then displayed back down at the nominal
 * (logical) size at runtime - the same reason `ThemeText.tsx`'s native fallback
 * rasterizes Pixi's canvas-based `pixiText` at `GetPixelRatio()` instead of 1x:
 * baking at a fixed 1x and letting a retina display (`devicePixelRatio: 2`, the
 * common case) stretch it up loses real antialiasing detail and looks soft/blocky
 * compared to Flash's actual output. 2x covers standard retina exactly (no
 * resampling at all when the runtime's pixel ratio also happens to be 2) and
 * downsamples cleanly on 1x displays - the metrics this script writes to the
 * manifest (`xOffset`/`yOffset`/`xAdvance`/`lineHeight`/`baseLineOffset`) are
 * divided back down to logical units so every other consumer (`layoutBitmapText`,
 * `BitmapTextDom`) keeps working in logical pixels unchanged; only the atlas PNG
 * itself, and the `width`/`height` crop rect naming its region, stay physical -
 * `BitmapTextPixi.tsx` is the one place that re-expands the logical metrics back
 * to physical units for Pixi's own (physical-then-uniformly-scaled) renderer.
 */
const ATLAS_SCALE = 2;

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

/** Renders one glyph in isolation (not as part of a shared string) so neighboring
 *  glyphs' ink can never bleed into this one's cropped bitmap — kerning between
 *  specific pairs is intentionally not baked in; the runtime layout only ever
 *  sums each glyph's own isolated advance (see `layoutBitmapText`). */
const renderGlyph = (style: object, char: string): GlyphPixels => {
    const buffer = truffle.renderToBuffer(char, style, { color: 0xffffff });
    const bounds = buffer.layout.charBounds[0];
    const xAdvance = bounds ? bounds.width : buffer.width;
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

    const glyphs = CHARSET.map(char => renderGlyph(style, char));
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

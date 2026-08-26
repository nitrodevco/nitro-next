/**
 * Packs every PNG `theme/utils/themeUrls.ts`'s `THEME_URLS` registry points at into one
 * combined atlas image + a Pixi `SpritesheetData`-shaped manifest (`frames[path] =
 * {frame,sourceSize,spriteSourceSize}`, `meta`) describing each asset's rect within it.
 *
 * This is what lets `theme/utils/themeAssetBundle.ts`'s `preloadThemeAssets()` turn ~250
 * separate first-use network fetches (one per border/button/scrollbar graphic, each only
 * triggered the first time a component that needs it happens to render - see that module's
 * own docblock) into a single request at boot, on both render targets.
 *
 * Re-run whenever an asset under `public/assets/images/**` is added, removed, or replaced:
 *
 *   yarn workspace @nitrodevco/nitro-react bundle-theme-assets
 */
import { createCanvas, loadImage } from 'canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { THEME_URLS } from '../src/theme/utils/themeUrls.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '../public');
const OUT_DIR = join(PUBLIC_DIR, 'assets/theme-atlas');

interface PackedImage {
    /** The path key exactly as it appears in `THEME_URLS`'s values (`assets/images/...`),
     *  not the theme key - several theme keys can (in principle) share one path, and the
     *  runtime bundle looks entries up by path, so packing by path once avoids ever
     *  double-packing the same file. */
    path: string;
    width: number;
    height: number;
    image: Awaited<ReturnType<typeof loadImage>>;
}

interface PackedRect extends PackedImage {
    x: number;
    y: number;
}

const pack = (images: PackedImage[]): { placed: PackedRect[]; width: number; height: number } => {
    // Largest-first shelf packing - simple, deterministic, and more than good enough for ~250
    // small UI-chrome sprites (this isn't trying to be a general bin-packer).
    const sorted = [ ...images ].sort((a, b) => b.height - a.height);
    const MAX_WIDTH = 2048;
    // 2px between sprites - GPU texture sampling is bilinear, and NineSliceSprite/TilingSprite
    // stretch these (mostly under-20px) sprites well past their native size, so even a 1px gap
    // lets a tile's edge sample blend in a neighbor's unrelated pixels ("atlas bleeding"). Each
    // sprite gets a dedicated 1px gutter on every side (extruded below) to absorb that blend
    // instead of exposing the neighbor.
    const PAD = 2;
    let x = 0, y = 0, rowHeight = 0, canvasWidth = 0;
    const placed: PackedRect[] = [];

    for (const img of sorted) {
        if (x > 0 && x + img.width > MAX_WIDTH) { x = 0; y += rowHeight + PAD; rowHeight = 0; }

        placed.push({ ...img, x, y });
        x += img.width + PAD;
        rowHeight = Math.max(rowHeight, img.height);
        canvasWidth = Math.max(canvasWidth, x - PAD);
    }

    return { placed, width: canvasWidth, height: y + rowHeight };
};

const uniquePaths = [ ...new Set(Object.values(THEME_URLS).map(url => url.replace(/^\.\//, ''))) ];

const images: PackedImage[] = await Promise.all(uniquePaths.map(async (path) => {
    const image = await loadImage(join(PUBLIC_DIR, path));

    return { path, width: image.width, height: image.height, image };
}));

const { placed, width, height } = pack(images);

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Pixi's own `SpritesheetData` shape (the same format `AssetManager.processNitroBundle`
// already parses for room/furniture `.nitro` bundles) - `theme/utils/themeAssetBundle.ts`'s
// Pixi path feeds this straight into `new Spritesheet(texture, data)`. A hand-rolled `new
// Texture({source, frame})` per asset was tried first and does NOT work for this: NineSliceSprite
// (every bordered chrome piece) needs the `sourceSize`/`spriteSourceSize` metadata `Spritesheet.
// parse()` fills in to size its 9-slice geometry correctly - without it every nine-sliced asset
// rendered as a single stretched, un-sliced solid-color blob instead of a bordered box.
const frames: Record<string, unknown> = {};

for (const rect of placed) {
    const { image, x, y, width: w, height: h } = rect;

    ctx.drawImage(image, x, y);

    // Extrude each edge's outermost pixel row/column 1px into its own dedicated padding
    // gutter (see PAD above) so bilinear sampling at a tile's border blends with a copy of
    // its own edge instead of an unrelated neighboring sprite.
    ctx.drawImage(image, 0, 0, w, 1, x, y - 1, w, 1);
    ctx.drawImage(image, 0, h - 1, w, 1, x, y + h, w, 1);
    ctx.drawImage(image, 0, 0, 1, h, x - 1, y, 1, h);
    ctx.drawImage(image, w - 1, 0, 1, h, x + w, y, 1, h);
    ctx.drawImage(image, 0, 0, 1, 1, x - 1, y - 1, 1, 1);
    ctx.drawImage(image, w - 1, 0, 1, 1, x + w, y - 1, 1, 1);
    ctx.drawImage(image, 0, h - 1, 1, 1, x - 1, y + h, 1, 1);
    ctx.drawImage(image, w - 1, h - 1, 1, 1, x + w, y + h, 1, 1);

    frames[rect.path] = {
        frame: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        sourceSize: { w: rect.width, h: rect.height },
        spriteSourceSize: { x: 0, y: 0, w: rect.width, h: rect.height },
    };
}

const manifest = {
    frames,
    meta: { image: 'atlas.png', format: 'RGBA8888', size: { w: width, h: height }, scale: 1 },
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'atlas.png'), canvas.toBuffer('image/png'));
writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest));

console.log(`Packed ${placed.length} theme assets into a ${width}x${height} atlas at ${OUT_DIR}`);

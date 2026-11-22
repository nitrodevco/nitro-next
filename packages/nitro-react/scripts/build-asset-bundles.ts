/**
 * Packs the client's UI art under `public/assets/**` into `.nitro` bundles - the same zip
 * archive the room engine already loads furniture, pets and figures from, so the one
 * `AssetManager` holds every bitmap the client owns and `getTexture(<asset name>)` reaches it
 * from anywhere. This replaces the two standalone atlases that came before it
 * (`public/assets/theme-atlas/` and `public/assets/variablefx/atlas.png`).
 *
 * A bundle is written one of two ways, per `ASSET_BUNDLES`:
 *
 * - `atlas` - every PNG packed into one sheet plus a Pixi `SpritesheetData` manifest
 *   (`<name>.png` + `<name>_spritesheet.json`). `AssetManager.processNitroBundle` parses that
 *   into one GPU upload the per-asset textures share, and the sheet is packed with MaxRects
 *   rather than shelves so it stays as tight as the art allows.
 * - `loose` - one PNG entry per asset, its own texture.
 *
 * Which one a bundle wants is a measured question, not a rule: packing grew `nitro-layouts` by a
 * third, because one big sheet of mixed art deflates worse than many small homogeneous PNGs.
 * Re-measure before flipping a bundle over.
 *
 * Every asset is named for its path under `public/assets`, extension dropped and `/` turned
 * into `-`, so the name is unique across every bundle by construction and a reader can find
 * the file it came from: `window-manager/tile_preview_0.png` -> `window-manager-tile_preview_0`. `LayoutImage` builds
 * exactly that name, so a call site keeps naming the file it always named.
 *
 * The Flash libraries' own bitmaps are not here: Nitro Studio publishes each library's in its
 * bundle (named after the library, from `asset.bundles.templates`), named `<library>-<asset>`.
 *
 * A bundle may also carry files beside its bitmaps (the captured font bundles, the sounds).
 * Those are read back with `AssetManager.getBundleFile`; only `<name>.json` is asset data.
 *
 * The UI theme, the chat styles and the renderer's bitmaps are not built here: Nitro Studio builds and
 * publishes them as their libraries' bundles (`habbo-window-manager-com`, `habbo-free-flow-chat-com`,
 * `habbo-room-object-visualization-lib`, `habbo-avatar-render-lib`, from `asset.bundles.templates`, under `bundled/templates`) -
 * from the client release and the hotel's own. The effect icons are the inventory library's (`habbo-inventory-com`).
 *
 * Re-run after adding, removing or replacing anything under `public/assets/**`:
 *
 *   yarn workspace @nitrodevco/nitro-react build-asset-bundles
 */
import { createCanvas, loadImage } from '@napi-rs/canvas';
import JSZip from 'jszip';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '../public');
const ASSETS_DIR = join(PUBLIC_DIR, 'assets');
const OUT_DIR = join(ASSETS_DIR, 'bundles');

type BundleMode = 'atlas' | 'loose';

interface BundleDefinition {
    /** The archive's name (`<name>.nitro`) and its collection's name in the `AssetManager`. */
    name: string;
    mode: BundleMode;
    /** Directories under `public/assets`, walked recursively for PNGs. */
    sources: string[];
    /** Files copied in verbatim, by entry name -> path under `public/assets`. */
    files?: Record<string, string>;
}

const fontFiles = (folder: string, pattern: RegExp): Record<string, string> => Object.fromEntries(readdirSync(join(ASSETS_DIR, folder))
    .filter(file => pattern.test(file))
    .sort()
    .map(file => [ file, `${folder}/${file}` ]));

/** `assets/sounds`: the client's own mp3s, carried verbatim under their Flash asset names. */
const soundFiles = (): Record<string, string> => Object.fromEntries(readdirSync(join(ASSETS_DIR, 'sounds'))
    .filter(file => file.endsWith('.mp3'))
    .sort()
    .map(file => [ file, `sounds/${file}` ]));

/**
 * The folders of the art the client's views draw that no Flash library has (a library's own is in
 * its template bundle): the floor plan editor's preview tiles and large tiles, and the avatar editor's
 * remove-selection icon.
 */
const LAYOUT_SOURCES = [ 'avatar-editor', 'window-manager' ];

export const ASSET_BUNDLES: BundleDefinition[] = [

    // The loading screen's art (`PhotoSplashScreen`): the frame and the thirty photos it picks one
    // of, loaded by name before anything else and unloaded once the client replaces the screen.
    { name: 'loading-screen', mode: 'loose', sources: [ 'loading-screen' ] },

    // The client's own art no library has - what `LayoutImage` names outside a library.
    // One PNG per asset: packing this much heterogeneous art into one sheet made it *bigger*
    // (699 -> 902 KiB), because many small homogeneous images deflate better than one large
    // mixed one, and the sheet's ~7% of unused space is real pixels that still have to encode.
    { name: 'nitro-layouts', mode: 'loose', sources: LAYOUT_SOURCES },

    // No bitmaps at all. The two halves of the font table are split because only the first is
    // needed before anything renders: `preloadFlashFonts` cannot draw a glyph without the
    // captured AIR bundles, while the `.ttf` faces are what a string the exact renderer cannot
    // take falls back to - so those load in the background after boot (see `flashFonts.ts`),
    // exactly as the browser used to fetch them off `@font-face` on first use.
    { name: 'fonts', mode: 'loose', sources: [], files: fontFiles('fonts', /\.air51\.json$/) },
    { name: 'font-faces', mode: 'loose', sources: [], files: fontFiles('fonts', /\.ttf$/) },

    // The rest of the same captures (Cyrillic, Greek, Latin Extended-B and beyond), which
    // `flashFonts.ts` adds when the renderer first meets a glyph the base captures lack.
    { name: 'fonts-extended', mode: 'loose', sources: [], files: fontFiles('fonts-extended', /\.air51\.json$/) },

    // No bitmaps either: the sounds `HabboSoundManagerFlash10Com` embeds (the UI's, the games' and
    // the cuckoo clock's), which `HabboSoundManager` decodes from the archive's bytes. Loaded by
    // name the first time a sound is played - nothing needs them to draw the first frame.
    { name: 'sounds', mode: 'loose', sources: [], files: soundFiles() },

    // The new user flow's art (`OnboardingComponent`): loaded by name when the flow opens.
    { name: 'onboarding', mode: 'loose', sources: [ 'onboarding' ] },
];

// ---------------------------------------------------------------------------------------------
// Packing
// ---------------------------------------------------------------------------------------------

/**
 * 1px of gutter on every side of every sprite, filled by extruding the sprite's own edge row
 * and column into it. GPU sampling is bilinear and these sprites are stretched well past their
 * native size by `NineSliceSprite`/`TilingSprite`, so without it a tile's edge blends in a
 * neighbour's unrelated pixels.
 */
const PAD = 1;

interface SourceImage {
    /** The asset's name in the `AssetManager` - see the module docblock. */
    name: string;
    /** Where the file sits under `public/assets`, for the audit manifest. */
    path: string;
    width: number;
    height: number;
    image: Awaited<ReturnType<typeof loadImage>>;
}

interface PlacedImage extends SourceImage {
    x: number;
    y: number;
}

interface FreeRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * MaxRects with best-short-side-fit. Each sprite is packed at its padded size and drawn one
 * pixel in, so the gutter above is guaranteed without the packer knowing about it.
 *
 * Shelf packing (what the two atlases this replaces used) leaves the tail of every row empty;
 * with art from 2x2 chrome slivers up to 843x243 panels that was most of the sheet. MaxRects
 * keeps the free space as a set of overlapping rectangles and always picks the one that wastes
 * the least, which is what gets these sheets near their theoretical area.
 */
const packMaxRects = (images: SourceImage[], binWidth: number, binHeight: number): PlacedImage[] | undefined => {
    // Biggest first: the large panels have to land before the slivers fragment the sheet.
    const sorted = [ ...images ].sort((a, b) => (Math.max(b.width, b.height) - Math.max(a.width, a.height))
        || ((b.width * b.height) - (a.width * a.height))
        || a.name.localeCompare(b.name));
    const free: FreeRect[] = [ { x: 0, y: 0, width: binWidth, height: binHeight } ];
    const placed: PlacedImage[] = [];

    for (const image of sorted) {
        const width = image.width + (PAD * 2);
        const height = image.height + (PAD * 2);

        let best: FreeRect | undefined = undefined;
        let bestShort = Infinity;
        let bestLong = Infinity;

        for (const rect of free) {
            if ((rect.width < width) || (rect.height < height)) continue;

            const leftoverH = rect.width - width;
            const leftoverV = rect.height - height;
            const shortSide = Math.min(leftoverH, leftoverV);
            const longSide = Math.max(leftoverH, leftoverV);

            if ((shortSide < bestShort) || ((shortSide === bestShort) && (longSide < bestLong))) {
                best = rect;
                bestShort = shortSide;
                bestLong = longSide;
            }
        }

        if (!best) return undefined;

        const node: FreeRect = { x: best.x, y: best.y, width, height };

        placed.push({ ...image, x: node.x + PAD, y: node.y + PAD });

        // Split every free rect the placed node overlaps into the parts it leaves behind.
        for (let i = free.length - 1; i >= 0; i--) {
            const rect = free[i];

            if ((node.x >= (rect.x + rect.width)) || ((node.x + node.width) <= rect.x)
                || (node.y >= (rect.y + rect.height)) || ((node.y + node.height) <= rect.y)) continue;

            free.splice(i, 1);

            if ((node.x + node.width) < (rect.x + rect.width)) free.push({ x: node.x + node.width, y: rect.y, width: (rect.x + rect.width) - (node.x + node.width), height: rect.height });
            if (node.x > rect.x) free.push({ x: rect.x, y: rect.y, width: node.x - rect.x, height: rect.height });
            if ((node.y + node.height) < (rect.y + rect.height)) free.push({ x: rect.x, y: node.y + node.height, width: rect.width, height: (rect.y + rect.height) - (node.y + node.height) });
            if (node.y > rect.y) free.push({ x: rect.x, y: rect.y, width: rect.width, height: node.y - rect.y });
        }

        // Drop any free rect wholly inside another, or the list grows without bound.
        for (let i = free.length - 1; i >= 0; i--) {
            for (let j = free.length - 1; j >= 0; j--) {
                if (i === j) continue;

                const a = free[i];
                const b = free[j];

                if ((a.x >= b.x) && (a.y >= b.y) && ((a.x + a.width) <= (b.x + b.width)) && ((a.y + a.height) <= (b.y + b.height))) {
                    free.splice(i, 1);
                    break;
                }
            }
        }
    }

    return placed;
};

/**
 * The smallest sheet the art fits in: start from the square of its padded area and grow the
 * shorter side (so the sheet stays roughly square rather than a strip) until MaxRects succeeds,
 * then trim the canvas to what was actually used.
 */
const pack = (images: SourceImage[]): { placed: PlacedImage[]; width: number; height: number } => {
    const area = images.reduce((total, image) => total + ((image.width + (PAD * 2)) * (image.height + (PAD * 2))), 0);
    const minWidth = Math.max(...images.map(image => image.width + (PAD * 2)));
    const minHeight = Math.max(...images.map(image => image.height + (PAD * 2)));

    let width = Math.max(minWidth, Math.ceil(Math.sqrt(area)));
    let height = Math.max(minHeight, Math.ceil(area / width));

    for (;;) {
        const placed = packMaxRects(images, width, height);

        if (placed) {
            return {
                placed,
                width: Math.max(...placed.map(rect => rect.x + rect.width + PAD)),
                height: Math.max(...placed.map(rect => rect.y + rect.height + PAD)),
            };
        }

        // Grow the shorter side by ~4%, so a sheet never turns into a strip chasing a fit.
        if (width <= height) width = Math.max(minWidth, Math.ceil(width * 1.04) + 1);
        else height = Math.max(minHeight, Math.ceil(height * 1.04) + 1);
    }
};

// ---------------------------------------------------------------------------------------------
// Building
// ---------------------------------------------------------------------------------------------

const walkPngs = (dir: string): string[] => {
    const found: string[] = [];

    for (const entry of readdirSync(dir).sort()) {
        const full = join(dir, entry);

        if (statSync(full).isDirectory()) found.push(...walkPngs(full));
        else if (entry.toLowerCase().endsWith('.png')) found.push(full);
    }

    return found;
};

/**
 * An asset's name: its path under `public/assets`, extension dropped, `/` turned into `-`.
 *
 * A dot left in the stem becomes `-` too. `GraphicAssetCollection.removeFileExtension` cuts a
 * collection texture's name at its last dot, so `border/15-default-shade-0.12.png` would arrive
 * as `theme-border-15-default-shade-0` - the same name its `0.2` sibling gets, one silently
 * replacing the other. The duplicate check at the end of the build is what would catch a
 * collision this introduces.
 */
const assetName = (path: string): string => relative(ASSETS_DIR, path)
    .split(sep)
    .join('-')
    .replace(/\.png$/i, '')
    .replace(/\./g, '-');

const loadSources = async (definition: BundleDefinition): Promise<SourceImage[]> => {
    const paths = definition.sources.flatMap(source => walkPngs(join(ASSETS_DIR, source)));

    return await Promise.all(paths.map(async (path) => {
        const image = await loadImage(path);

        return {
            name: assetName(path),
            path: relative(ASSETS_DIR, path).split(sep).join('/'),
            width: image.width,
            height: image.height,
            image,
        };
    }));
};

/** The atlas sheet, with each sprite's own edge extruded into its gutter (see `PAD`). */
const drawSheet = (placed: PlacedImage[], width: number, height: number): Buffer => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    for (const { image, x, y, width: w, height: h } of placed) {
        ctx.drawImage(image, x, y);

        ctx.drawImage(image, 0, 0, w, 1, x, y - 1, w, 1);
        ctx.drawImage(image, 0, h - 1, w, 1, x, y + h, w, 1);
        ctx.drawImage(image, 0, 0, 1, h, x - 1, y, 1, h);
        ctx.drawImage(image, w - 1, 0, 1, h, x + w, y, 1, h);
        ctx.drawImage(image, 0, 0, 1, 1, x - 1, y - 1, 1, 1);
        ctx.drawImage(image, w - 1, 0, 1, 1, x + w, y - 1, 1, 1);
        ctx.drawImage(image, 0, h - 1, 1, 1, x - 1, y + h, 1, 1);
        ctx.drawImage(image, w - 1, h - 1, 1, 1, x + w, y + h, 1, 1);
    }

    return canvas.toBuffer('image/png');
};

interface BundleReport {
    name: string;
    mode: BundleMode;
    /** The bitmaps in the bundle, by the name they answer to, and the file each came from. */
    assets: { name: string; path: string }[];
    /**
     * Every path under `public/assets` this bundle absorbed - its bitmaps, the files it carries
     * verbatim and the ones it only read to build a table. The dist build prunes exactly this
     * set, so anything left out would ship twice.
     */
    absorbed: string[];
    /**
     * A digest of every absorbed file's bytes, under its path. `scripts/drift/asset_bundles.py`
     * re-derives it from disk: a bundle built before the last change to its art is not an error
     * anything notices at run time, it just draws the old art.
     */
    sources: string;
    sheet?: { width: number; height: number; efficiency: number };
    bytes: number;
}

const digestOf = (paths: string[]): string => {
    const hash = createHash('sha256');

    for (const path of [ ...paths ].sort()) {
        hash.update(path);
        hash.update(createHash('sha256').update(readFileSync(join(ASSETS_DIR, path))).digest());
    }

    return hash.digest('hex').slice(0, 16);
};

const buildBundle = async (definition: BundleDefinition): Promise<BundleReport> => {
    const { name, mode } = definition;
    const sources = await loadSources(definition);
    const zip = new JSZip();
    // A fixed timestamp keeps the archive byte-stable between runs, so a rebuild that changed
    // nothing shows up as no diff.
    const options = { date: new Date(0) };
    const report: BundleReport = {
        name,
        mode,
        assets: sources.map(({ name: asset, path }) => ({ name: asset, path })).sort((a, b) => a.name.localeCompare(b.name)),
        absorbed: [ ...sources.map(source => source.path), ...Object.values(definition.files ?? {}) ].sort(),
        sources: '',
        bytes: 0,
    };

    report.sources = digestOf(report.absorbed);

    // The asset data every `.nitro` carries: the collection's name, and every asset in it so
    // `AssetManager.getAsset` answers for a bundled bitmap the way it does for furniture.
    zip.file(`${name}.json`, JSON.stringify({
        type: name,
        assets: report.assets.map(asset => ({ name: asset.name })),
    }), options);

    if (mode === 'atlas') {
        if (!sources.length) throw new Error(`Bundle "${name}" is an atlas with no images`);

        const { placed, width, height } = pack(sources);
        const frames: Record<string, unknown> = {};

        for (const rect of [ ...placed ].sort((a, b) => a.name.localeCompare(b.name))) {
            frames[rect.name] = {
                frame: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
                sourceSize: { w: rect.width, h: rect.height },
                spriteSourceSize: { x: 0, y: 0, w: rect.width, h: rect.height },
            };
        }

        zip.file(`${name}.png`, drawSheet(placed, width, height), options);
        zip.file(`${name}_spritesheet.json`, JSON.stringify({
            frames,
            meta: { image: `${name}.png`, format: 'RGBA8888', size: { w: width, h: height }, scale: 1 },
        }), options);

        const used = sources.reduce((total, image) => total + (image.width * image.height), 0);

        report.sheet = { width, height, efficiency: used / (width * height) };
    } else {
        for (const source of [ ...sources ].sort((a, b) => a.name.localeCompare(b.name))) {
            zip.file(`${source.name}.png`, readFileSync(join(ASSETS_DIR, source.path)), options);
        }
    }

    for (const [ entry, path ] of Object.entries(definition.files ?? {})) {
        zip.file(entry, readFileSync(join(ASSETS_DIR, path)), options);
    }

    const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(join(OUT_DIR, `${name}.nitro`), buffer);

    report.bytes = buffer.length;

    return report;
};

const only = process.argv.slice(2).filter(argument => !argument.startsWith('-'));
const definitions = only.length ? ASSET_BUNDLES.filter(definition => only.includes(definition.name)) : ASSET_BUNDLES;

if (!definitions.length) throw new Error(`No bundle matches ${only.join(', ')} - known: ${ASSET_BUNDLES.map(definition => definition.name).join(', ')}`);

const reports: BundleReport[] = [];

for (const definition of definitions) reports.push(await buildBundle(definition));

// Which file every bundled asset came from, so the pack is auditable rather than trusted.
const seen = new Map<string, string>();

for (const report of reports) {
    for (const asset of report.assets) {
        const existing = seen.get(asset.name);

        if (existing) throw new Error(`Duplicate asset name "${asset.name}": ${existing} and ${report.name}/${asset.path}`);

        seen.set(asset.name, `${report.name}/${asset.path}`);
    }
}

// The output folder is this script's, but only for what it has written: a full run drops the
// archives the previous manifest lists and this one no longer builds, so renaming or removing a
// bundle does not leave the old file behind to be served and puzzled over. A `.nitro` no previous
// manifest names - something dropped in here by hand - is left alone.
if (!only.length) {
    const manifestPath = join(OUT_DIR, 'bundles.json');
    const built = new Set(reports.map(report => report.name));

    if (existsSync(manifestPath)) {
        const previous = JSON.parse(readFileSync(manifestPath, 'utf8')) as { bundles: { name: string }[] };

        for (const { name } of previous.bundles) {
            if (built.has(name)) continue;

            const stale = join(OUT_DIR, `${name}.nitro`);

            if (!existsSync(stale)) continue;

            rmSync(stale);
            console.log(`removed ${name}.nitro - no longer a bundle`);
        }
    }

    writeFileSync(manifestPath, JSON.stringify({
        bundles: reports.map(report => ({
            name: report.name,
            mode: report.mode,
            sheet: report.sheet ? { width: report.sheet.width, height: report.sheet.height } : undefined,
            assets: Object.fromEntries(report.assets.map(asset => [ asset.name, asset.path ])),
            absorbed: report.absorbed,
            sources: report.sources,
        })),
    }, null, 2));
}

for (const report of reports) {
    const size = `${(report.bytes / 1024).toFixed(0).padStart(5)} KiB`;
    const sheet = report.sheet ? `  sheet ${report.sheet.width}x${report.sheet.height} (${(report.sheet.efficiency * 100).toFixed(1)}% used)` : '';

    console.log(`${report.name.padEnd(14)} ${report.mode.padEnd(5)} ${String(report.absorbed.length).padStart(4)} files  ${size}${sheet}`);
}

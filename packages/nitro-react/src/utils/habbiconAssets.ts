/**
 * The pure half of `habbicons/assets/HabbiconAssetManager`: where the habbicon assets live
 * (`HabboConfigurationManager.updateHabbiconAssetProperties` + `refreshAssetRoot`), what
 * `habbicons.json` says (`onMetadataLoaded`), and cutting a frame out of a sheet
 * (`extractFrameBitmapFromSheet`). The loading itself is `commands/habbiconCommands`.
 */

/** `HabboConfigurationManager.§_-Z1O§`: the root when the hotel names a hash but no `habbicons.url`. */
export const HABBICONS_DEFAULT_ASSET_ROOT = 'https://images.habbo.com/habbicons';
export const HABBICONS_METADATA_FILE = 'habbicons.json';
export const HABBICONS_SPRITESHEET_FILE = 'habbicons_spritesheet.png';
export const HABBICONS_COLLECTION_ICONS_SPRITESHEET_FILE = 'collection_icons_spritesheet.png';
/** `DEFAULT_FRAME_SIZE`. */
export const HABBICON_DEFAULT_FRAME_SIZE = 40;
/** `DEFAULT_COLLECTION_ICON_SIZE`. */
export const HABBICON_DEFAULT_COLLECTION_ICON_SIZE = 18;

export interface HabbiconSheetRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface HabbiconMetadata {
    /** `§_-P1m§`: each habbicon's preview frame on `habbicons_spritesheet.png`. */
    frames: Record<number, HabbiconSheetRect>;
    /** `§_-X1h§`: each habbicon's name key (`habbicon_<key>_name`). */
    nameKeys: Record<number, string>;
    /** `§_-E3§`: each set's icon on `collection_icons_spritesheet.png`. */
    collectionIcons: Record<number, HabbiconSheetRect>;
}

const configText = (value: unknown): string => (((typeof value === 'string') || (typeof value === 'number')) ? String(value) : '');

/**
 * The asset root with its trailing `/`, or `''` when the hotel configures none.
 *
 * `updateHabbiconAssetProperties`: `habbicons.hash` (the hotel's variable) becomes the asset hash
 * and `habbicons.url` - else `https://images.habbo.com/habbicons` - the root; without it a
 * `habbicons.asset.hash` gets that default root and a `habbicons.asset.root` alone is used as
 * given. (Flash also tries the gamedata resource `habbicons` of the localization manager in
 * between, which the port does not have.) `refreshAssetRoot` then puts the hash into a `{hash}` /
 * `%hash%` in the root, or appends it as a path segment unless the root already ends in it.
 */
export const resolveHabbiconAssetRoot = (config: Record<string, unknown>): string => {
    let root = configText(config['habbicons.asset.root']);
    let hash = configText(config['habbicons.asset.hash']);
    const externalHash = configText(config['habbicons.hash']);

    if (externalHash.length) {
        hash = externalHash;
        root = (config['habbicons.url'] !== undefined) ? configText(config['habbicons.url']) : HABBICONS_DEFAULT_ASSET_ROOT;
    } else if (config['habbicons.asset.hash'] !== undefined) {
        root = HABBICONS_DEFAULT_ASSET_ROOT;
    }

    if (!root.length) return '';

    while (root.endsWith('/')) root = root.substring(0, root.length - 1);

    if (hash.length && (root.includes('{hash}') || root.includes('%hash%'))) {
        root = root.split('{hash}').join(hash).split('%hash%').join(hash);
    } else if (hash.length && !((root === hash) || (root.lastIndexOf(`/${hash}`) === (root.length - hash.length - 1)))) {
        root += `/${hash}`;
    }

    return `${root}/`;
};

/** `normalizeDimension`: a positive integer, else the default. */
const normalizeDimension = (value: unknown, fallback: number): number => {
    const dimension = Math.trunc(Number(value));

    return (dimension > 0) ? dimension : fallback;
};

const rectOf = (entry: Record<string, unknown>, fallback: number): HabbiconSheetRect => ({
    x: Math.trunc(Number(entry.x)) || 0,
    y: Math.trunc(Number(entry.y)) || 0,
    width: normalizeDimension(entry.width, fallback),
    height: normalizeDimension(entry.height, fallback),
});

const entriesOf = (value: unknown): Record<string, unknown>[] => (Array.isArray(value) ? value.filter((entry): entry is Record<string, unknown> => !!entry && (typeof entry === 'object') && ((entry as Record<string, unknown>).id !== undefined) && ((entry as Record<string, unknown>).id !== null)) : []);

/** `onMetadataLoaded`: throws on text that is not JSON, as `JSON.parse` did there. */
export const parseHabbiconMetadata = (text: string): HabbiconMetadata => {
    const data = JSON.parse(text) as Record<string, unknown> | null;
    const metadata: HabbiconMetadata = { frames: {}, nameKeys: {}, collectionIcons: {} };

    for (const entry of entriesOf(data?.habbicons)) {
        const id = Math.trunc(Number(entry.id));

        metadata.frames[id] = rectOf(entry, HABBICON_DEFAULT_FRAME_SIZE);

        if ((typeof entry.name === 'string') || (typeof entry.name === 'number')) metadata.nameKeys[id] = String(entry.name);
    }

    for (const entry of entriesOf(data?.collectionIcons)) metadata.collectionIcons[Math.trunc(Number(entry.id))] = rectOf(entry, HABBICON_DEFAULT_COLLECTION_ICON_SIZE);

    return metadata;
};

/**
 * `createValidRectForSheet`: the sheet's `y` counts from the bottom edge first; a rect that does
 * not fit that way is tried as given, and one that fits neither way is no frame.
 */
export const resolveHabbiconSheetRect = (sheetWidth: number, sheetHeight: number, rect: HabbiconSheetRect): HabbiconSheetRect | undefined => {
    const fits = (candidate: HabbiconSheetRect) => (candidate.x >= 0) && (candidate.y >= 0) && ((candidate.x + candidate.width) <= sheetWidth) && ((candidate.y + candidate.height) <= sheetHeight);
    const flipped = { ...rect, y: sheetHeight - rect.y - rect.height };

    if (fits(flipped)) return flipped;
    if (fits(rect)) return rect;

    return undefined;
};

/** `extractFrameBitmapFromSheet`: the frame copied onto a canvas of its own. */
export const cutHabbiconFrame = (sheet: ImageBitmap, rect: HabbiconSheetRect): HTMLCanvasElement | undefined => {
    const valid = resolveHabbiconSheetRect(sheet.width, sheet.height, rect);

    if (!valid) return undefined;

    const canvas = document.createElement('canvas');

    canvas.width = valid.width;
    canvas.height = valid.height;
    canvas.getContext('2d')?.drawImage(sheet, valid.x, valid.y, valid.width, valid.height, 0, 0, valid.width, valid.height);

    return canvas;
};

/**
 * `HabbiconTileView._colorTransform` - `ColorTransform(.35, .35, .35, .65, 90, 85, 80, 0)` - on a
 * copy of the preview: each channel scaled and offset (clamped to 0-255), the alpha scaled.
 */
export const dimHabbiconPreview = (preview: HTMLCanvasElement): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    canvas.width = preview.width;
    canvas.height = preview.height;

    const context = canvas.getContext('2d');

    if (!context || !canvas.width || !canvas.height) return canvas;

    context.drawImage(preview, 0, 0);

    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = image.data;
    const clamp = (value: number) => Math.max(0, Math.min(255, Math.trunc(value)));

    for (let i = 0; i < data.length; i += 4) {
        data[i] = clamp((data[i] * 0.35) + 90);
        data[i + 1] = clamp((data[i + 1] * 0.35) + 85);
        data[i + 2] = clamp((data[i + 2] * 0.35) + 80);
        data[i + 3] = clamp(data[i + 3] * 0.65);
    }

    context.putImageData(image, 0, 0);

    return canvas;
};

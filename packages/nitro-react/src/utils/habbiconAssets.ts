/**
 * The pure half of `habbicons/assets/HabbiconAssetManager`: where the habbicon assets live
 * (`HabboConfigurationManager.updateHabbiconAssetProperties` + `refreshAssetRoot`), what
 * `habbicons.json` says (`onMetadataLoaded`), and cutting a frame out of a sheet
 * (`extractFrameBitmapFromSheet`). The loading itself is `commands/habbicons/habbiconCommands`.
 */
import type { HabbiconAnimationStep, HabbiconDefinition, HabbiconRuntimeFrameDefinition } from '@nitrodevco/nitro-renderer';

import { clamp } from './clamp';
import { configReader } from './configReader';

/** `HabboConfigurationManager.§_-Z1O§`: the root when the hotel names a hash but no `habbicons.url`. */
export const HABBICONS_DEFAULT_ASSET_ROOT = 'https://images.habbo.com/habbicons';
export const HABBICONS_METADATA_FILE = 'habbicons.json';
export const HABBICONS_SPRITESHEET_FILE = 'habbicons_spritesheet.png';
export const HABBICONS_COLLECTION_ICONS_SPRITESHEET_FILE = 'collection_icons_spritesheet.png';
/** `DEFAULT_FRAME_SIZE`. */
export const HABBICON_DEFAULT_FRAME_SIZE = 40;
/** `getOutlinedCollectionIconBitmap`: `createOutlinedBitmap(icon, 2, 0xFFFFFFFF)`. */
export const HABBICON_COLLECTION_ICON_OUTLINE = 2;
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
    /** `§_-GE§`: each habbicon's facing and animation (`buildDefinition`), for the room's bubble. */
    definitions: Record<number, HabbiconDefinition>;
}

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
    const { configString } = configReader(config);
    let root = configString('habbicons.asset.root');
    let hash = configString('habbicons.asset.hash');
    const externalHash = configString('habbicons.hash');

    if (externalHash.length) {
        hash = externalHash;
        root = (config['habbicons.url'] !== undefined) ? configString('habbicons.url') : HABBICONS_DEFAULT_ASSET_ROOT;
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

/** `normalizeDirection`: -1, 0 or 1 by the sign. */
const normalizeDirection = (value: unknown): number => {
    const direction = Math.trunc(Number(value));

    if (!Number.isFinite(direction)) return 0;

    return Math.sign(direction);
};

const objectsOf = (value: unknown): Record<string, unknown>[] => (Array.isArray(value) ? value.filter((entry): entry is Record<string, unknown> => !!entry && (typeof entry === 'object')) : []);

/**
 * `buildDefinition`: the facing, and - with more than one frame, frame data and steps - the
 * animation: its frames sorted by id, sized like the preview where they give no size
 * (`buildRuntimeFrameDefinitions`), and its enabled steps, each at least 1 ms and divided by
 * `playbackSpeed` (`buildRuntimeAnimationSteps`).
 */
const buildHabbiconDefinition = (entry: Record<string, unknown>, previewWidth: number, previewHeight: number): HabbiconDefinition => {
    const frameData = objectsOf(entry.frameData);
    const animation = (entry.animation && (typeof entry.animation === 'object')) ? entry.animation as Record<string, unknown> : undefined;
    const rawSteps = objectsOf(animation?.steps);
    let playbackSpeed = Number(animation?.playbackSpeed ?? 1);

    if (!Number.isFinite(playbackSpeed) || (playbackSpeed <= 0)) playbackSpeed = 1;

    const frames: HabbiconRuntimeFrameDefinition[] = frameData
        .map(frame => ({ id: Math.trunc(Number(frame.id)) || 0, ...rectOf(frame, 0), width: normalizeDimension(frame.width, previewWidth), height: normalizeDimension(frame.height, previewHeight) }))
        .sort((a, b) => a.id - b.id);
    const steps: HabbiconAnimationStep[] = rawSteps
        .filter(step => step.enabled !== false)
        .map(step => ({ sourceFrame: Math.max(0, Math.trunc(Number(step.sourceFrame)) || 0), durationMs: Math.max(1, Math.trunc(Math.max(1, Math.trunc(Number(step.durationMs)) || 0) / playbackSpeed)) }));

    return {
        previewWidth,
        previewHeight,
        direction: normalizeDirection(entry.dir),
        animated: ((Math.trunc(Number(entry.frameCount)) || 0) > 1) && (frames.length > 0) && (steps.length > 0),
        loop: !!entry.loop,
        frames,
        steps,
    };
};

/** `onMetadataLoaded`: throws on text that is not JSON, as `JSON.parse` did there. */
export const parseHabbiconMetadata = (text: string): HabbiconMetadata => {
    const data = JSON.parse(text) as Record<string, unknown> | null;
    const metadata: HabbiconMetadata = { frames: {}, nameKeys: {}, collectionIcons: {}, definitions: {} };

    for (const entry of entriesOf(data?.habbicons)) {
        const id = Math.trunc(Number(entry.id));

        metadata.frames[id] = rectOf(entry, HABBICON_DEFAULT_FRAME_SIZE);
        metadata.definitions[id] = buildHabbiconDefinition(entry, metadata.frames[id].width, metadata.frames[id].height);

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

/**
 * `createOutlinedBitmap(bitmap, size, white)`: the picture's white silhouette stamped at every offset
 * within `size` pixels, and the picture over it.
 */
export const outlineHabbiconBitmap = (source: HTMLCanvasElement, size: number): HTMLCanvasElement => {
    const silhouette = document.createElement('canvas');
    const canvas = document.createElement('canvas');

    silhouette.width = source.width;
    silhouette.height = source.height;
    canvas.width = source.width + (size * 2);
    canvas.height = source.height + (size * 2);

    const silhouetteContext = silhouette.getContext('2d');
    const context = canvas.getContext('2d');

    if (!silhouetteContext || !context) return canvas;

    silhouetteContext.drawImage(source, 0, 0);
    silhouetteContext.globalCompositeOperation = 'source-in';
    silhouetteContext.fillStyle = '#ffffff';
    silhouetteContext.fillRect(0, 0, silhouette.width, silhouette.height);

    for (let x = -size; x <= size; x++) {
        for (let y = -size; y <= size; y++) {
            if ((x !== 0) || (y !== 0)) context.drawImage(silhouette, size + x, size + y);
        }
    }

    context.drawImage(source, size, size);

    return canvas;
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
    const clampChannel = (value: number) => clamp(Math.trunc(value), 0, 255);

    for (let i = 0; i < data.length; i += 4) {
        data[i] = clampChannel((data[i] * 0.35) + 90);
        data[i + 1] = clampChannel((data[i + 1] * 0.35) + 85);
        data[i + 2] = clampChannel((data[i + 2] * 0.35) + 80);
        data[i + 3] = clampChannel(data[i + 3] * 0.65);
    }

    context.putImageData(image, 0, 0);

    return canvas;
};

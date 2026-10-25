import { NitroLogger } from '@nitrodevco/nitro-api';

import { createTransparentBitmap, getBitmapContext, VariableFxBitmap } from '../../variablefx/rendering/VariableFxBitmap';

/** `HabbiconDefinition`'s runtime frame: where a frame sits on the habbicon's `animation/<id>.png`. */
export interface HabbiconRuntimeFrameDefinition {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

/** A step of `buildRuntimeAnimationSteps`: which frame shows, and for how long (already over `playbackSpeed`). */
export interface HabbiconAnimationStep {
    sourceFrame: number;
    durationMs: number;
}

/** `HabbiconDefinition`: what `habbicons.json` says about one habbicon, as `buildDefinition` reads it. */
export interface HabbiconDefinition {
    previewWidth: number;
    previewHeight: number;
    /** `normalizeDirection(dir)`: -1, 0 or 1. */
    direction: number;
    /** `frameCount > 1` with frame data and steps. */
    animated: boolean;
    loop: boolean;
    frames: HabbiconRuntimeFrameDefinition[];
    steps: HabbiconAnimationStep[];
}

/** A frame of a runtime asset, at full size and resampled to half for the small room. */
export interface HabbiconRuntimeFrame {
    bitmap: VariableFxBitmap;
    smallBitmap: VariableFxBitmap;
}

/** `getRuntimeAsset`'s object, as `buildAnimatedRuntimeAsset` / `buildFallbackRuntimeAsset` make it. */
export interface HabbiconRuntimeAsset {
    animated: boolean;
    loop: boolean;
    direction: number;
    baseWidth: number;
    baseHeight: number;
    frames: HabbiconRuntimeFrame[];
    steps: HabbiconAnimationStep[];
    playbackDurationMs: number;
}

/** `resampleBitmapData(bitmap, 0.5)`: a halving with smoothing. */
const resampleHalf = (source: VariableFxBitmap): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(Math.max(1, Math.round(source.width / 2)), Math.max(1, Math.round(source.height / 2)));
    const context = getBitmapContext(bitmap);

    context.imageSmoothingEnabled = true;
    context.drawImage(source, 0, 0, bitmap.width, bitmap.height);

    return bitmap;
};

/** `createValidRectForSheet`: `y` counted from the sheet's bottom edge first, then as given. */
const cutFrame = (sheet: CanvasImageSource & { width: number; height: number }, frame: HabbiconRuntimeFrameDefinition): VariableFxBitmap | undefined => {
    const fits = (x: number, y: number) => (x >= 0) && (y >= 0) && ((x + frame.width) <= sheet.width) && ((y + frame.height) <= sheet.height);
    const flippedY = sheet.height - frame.y - frame.height;
    const y = fits(frame.x, flippedY) ? flippedY : (fits(frame.x, frame.y) ? frame.y : undefined);

    if (y === undefined) return undefined;

    const bitmap = createTransparentBitmap(frame.width, frame.height);

    getBitmapContext(bitmap).drawImage(sheet, frame.x, y, frame.width, frame.height, 0, 0, frame.width, frame.height);

    return bitmap;
};

/**
 * The room's half of Flash's `habbicons/assets/HabbiconAssetManager`: the preview of each habbicon
 * at full and half size (`getPreviewBitmap`), its facing (`getDirection`) and its runtime asset
 * (`getRuntimeAsset`) for `HabbiconBubble`. The client loads `habbicons.json` and the preview sheet
 * and hands them over with `configure`; an animated habbicon's own sheet (`animation/<id>.png`) is
 * fetched here the first time its bubble asks, and until it is in the bubble shows the preview
 * (`buildFallbackRuntimeAsset`).
 */
export class HabbiconAssetManager {
    private static _assetRoot: string = '';
    private static _previews: Map<number, VariableFxBitmap> = new Map();
    private static _smallPreviews: Map<number, VariableFxBitmap> = new Map();
    private static _definitions: Map<number, HabbiconDefinition> = new Map();
    private static _runtimeAssets: Map<number, HabbiconRuntimeAsset> = new Map();
    private static _fallbackAssets: Map<number, HabbiconRuntimeAsset> = new Map();
    private static _loading: Set<number> = new Set();

    /** The previews cut from `habbicons_spritesheet.png`, the definitions and the root the sheets live under. */
    public static configure(assetRoot: string, previews: Map<number, VariableFxBitmap>, definitions: Map<number, HabbiconDefinition>): void {
        HabbiconAssetManager._assetRoot = assetRoot;
        HabbiconAssetManager._previews = previews;
        HabbiconAssetManager._smallPreviews = new Map();
        HabbiconAssetManager._definitions = definitions;
        HabbiconAssetManager._runtimeAssets = new Map();
        HabbiconAssetManager._fallbackAssets = new Map();
        HabbiconAssetManager._loading = new Set();
    }

    /** `resolvePreviewBitmap`: the small one is resampled once and kept. */
    public static getPreviewBitmap(habbiconId: number, small: boolean): VariableFxBitmap | undefined {
        const preview = HabbiconAssetManager._previews.get(habbiconId);

        if (!preview || !small) return preview;

        let resampled = HabbiconAssetManager._smallPreviews.get(habbiconId);

        if (!resampled) {
            resampled = resampleHalf(preview);
            HabbiconAssetManager._smallPreviews.set(habbiconId, resampled);
        }

        return resampled;
    }

    public static getDirection(habbiconId: number): number {
        return HabbiconAssetManager._definitions.get(habbiconId)?.direction ?? 0;
    }

    /** `resolveRuntimeAsset`: the animated asset once loaded, else the preview standing in for it. */
    public static getRuntimeAsset(habbiconId: number): HabbiconRuntimeAsset | undefined {
        const loaded = HabbiconAssetManager._runtimeAssets.get(habbiconId);

        if (loaded) return loaded;

        const definition = HabbiconAssetManager._definitions.get(habbiconId);

        if (!definition) return undefined;

        if (definition.animated) HabbiconAssetManager.loadRuntimeAsset(habbiconId, definition);

        let fallback = HabbiconAssetManager._fallbackAssets.get(habbiconId);

        if (!fallback) {
            fallback = HabbiconAssetManager.buildFallbackRuntimeAsset(habbiconId, definition);

            if (fallback) HabbiconAssetManager._fallbackAssets.set(habbiconId, fallback);
        }

        return fallback;
    }

    private static buildFallbackRuntimeAsset(habbiconId: number, definition: HabbiconDefinition): HabbiconRuntimeAsset | undefined {
        const bitmap = HabbiconAssetManager.getPreviewBitmap(habbiconId, false);

        if (!bitmap) return undefined;

        return {
            animated: false,
            loop: false,
            direction: definition.direction,
            baseWidth: bitmap.width,
            baseHeight: bitmap.height,
            frames: [ { bitmap, smallBitmap: HabbiconAssetManager.getPreviewBitmap(habbiconId, true) ?? bitmap } ],
            steps: [ { sourceFrame: 0, durationMs: 0 } ],
            playbackDurationMs: 0,
        };
    }

    /** `loadRuntimeAsset` / `onRuntimeSheetLoaded`: the sheet once per habbicon; a failure is only logged. */
    private static loadRuntimeAsset(habbiconId: number, definition: HabbiconDefinition): void {
        const root = HabbiconAssetManager._assetRoot;

        if (!root.length || HabbiconAssetManager._loading.has(habbiconId)) return;

        HabbiconAssetManager._loading.add(habbiconId);

        void fetch(`${root}animation/${habbiconId}.png`)
            .then(response => (response.ok ? response.blob() : Promise.reject(new Error(String(response.status)))))
            .then(blob => createImageBitmap(blob))
            .then((sheet) => {
                if (HabbiconAssetManager._definitions.get(habbiconId) !== definition) return;

                const asset = HabbiconAssetManager.buildAnimatedRuntimeAsset(definition, sheet);

                if (asset) HabbiconAssetManager._runtimeAssets.set(habbiconId, asset);
            })
            .catch((error: unknown) => {
                NitroLogger.log(`[HabbiconAssetManager] Failed to load habbicon runtime asset: ${String(error)}`);
            });
    }

    private static buildAnimatedRuntimeAsset(definition: HabbiconDefinition, sheet: ImageBitmap): HabbiconRuntimeAsset | undefined {
        const frames: HabbiconRuntimeFrame[] = [];

        for (const frame of definition.frames) {
            const bitmap = cutFrame(sheet, frame);

            if (bitmap) frames.push({ bitmap, smallBitmap: resampleHalf(bitmap) });
        }

        if (!frames.length) return undefined;

        return {
            animated: true,
            loop: definition.loop,
            direction: definition.direction,
            baseWidth: definition.previewWidth,
            baseHeight: definition.previewHeight,
            frames,
            steps: definition.steps.length ? definition.steps : [ { sourceFrame: 0, durationMs: 0 } ],
            playbackDurationMs: definition.steps.reduce((total, step) => total + Math.max(1, Math.trunc(step.durationMs)), 0),
        };
    }
}

/**
 * The engine side of `addons/variablefx/presets/VariableFxPreviewPreset`: a `VariableFxVisualizer`
 * (the same one the room draws effects with) fed the editor's config
 * (`variableFxRuntimeConfig`) and a made-up status (`VariableFxPreviewStatus`), stepped every 16 ms
 * (`PREVIEW_ANIMATION_INTERVAL_MS`) and shown twice as large when that still fits 280 x 96.
 *
 * Flash takes the renderer registry and asset provider from `HabboUserDefinedRoomEvents`, which
 * builds its own registry over the room visualization's asset library
 * (`VariableFxRendererRegistry.createDefault(new AssetLibraryVariableFxAssetProvider(assets))`);
 * here the library is the renderer's shared `GetVariableFxAssetLibrary()` and the registry is made
 * the same way, once the library has loaded (before that, only the category / renderer name
 * fallback resolves).
 *
 * The frame is copied into a canvas the controller owns and wrapped as a Pixi texture, which is
 * re-uploaded in place on every redraw; a new texture is made only when the frame changes size.
 * React reads `{ texture, zoom }` through `subscribe` / `getSnapshot` (`useSyncExternalStore`); a
 * texture that was replaced is destroyed by `releaseRetired`, which the view calls once it has
 * committed the new one.
 */
import { GetVariableFxAssetLibrary, VariableFxRendererRegistry, VariableFxVisualizer } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { VariableFxPreviewStatus } from './model/VariableFxPreviewStatus';
import { variableFxRuntimeConfig, VariableFxState } from './model/VariableFxState';

/** `VariableFxPreviewPreset.PREVIEW_WIDTH` / `PREVIEW_HEIGHT` / `PREVIEW_ANIMATION_INTERVAL_MS` / `PREVIEW_ZOOM`. */
export const VARIABLE_FX_PREVIEW_WIDTH = 280;
export const VARIABLE_FX_PREVIEW_HEIGHT = 96;
const PREVIEW_ANIMATION_INTERVAL_MS = 16;
const PREVIEW_ZOOM = 2;

export interface VariableFxPreviewSnapshot {
    texture: Texture | null;
    /** `zoom` - 1 or 2. */
    zoom: number;
}

let registry: VariableFxRendererRegistry | null = null;
let registryComplete = false;

/** `_roomEvents.variableFxRendererRegistry` - rebuilt once after the asset library has loaded its renderer table. */
const getPreviewRegistry = (): VariableFxRendererRegistry => {
    const library = GetVariableFxAssetLibrary();

    if (!registry || (!registryComplete && library.isReady)) {
        registry = VariableFxRendererRegistry.createDefault(library);
        registryComplete = library.isReady;
    }

    return registry;
};

export class VariableFxPreviewController {
    private _status = new VariableFxPreviewStatus();
    private _visualizer: VariableFxVisualizer | null = null;
    private _canvas: HTMLCanvasElement | null = null;
    private _snapshot: VariableFxPreviewSnapshot = { texture: null, zoom: 1 };
    private _retired: Texture[] = [];
    private _listeners = new Set<() => void>();
    private _timer: ReturnType<typeof setInterval> | null = null;
    private _refreshKey: string | null = null;

    public subscribe = (listener: () => void): (() => void) => {
        this._listeners.add(listener);

        return () => {
            this._listeners.delete(listener);
        };
    };

    public getSnapshot = (): VariableFxPreviewSnapshot => this._snapshot;

    /** `refresh(state)` - a new visualizer for the config as it is now; nothing while `key` (the runtime config) is the one last drawn. */
    public refresh(state: VariableFxState, key: string): void {
        if (key === this._refreshKey) return;

        const time = performance.now();

        this._refreshKey = key;

        this.disposeVisualizer();
        this._visualizer = this.createVisualizer(state, time);
        this.renderCurrentFrame(time, true);
        this.startAnimation();
    }

    /** `randomize(state)` - the button: a new made-up value, animated to by the visualizer that is running. */
    public randomize(state: VariableFxState): void {
        const time = performance.now();

        this._status.randomize(state);

        if (!this._visualizer) {
            this._visualizer = this.createVisualizer(state, time);
            this.renderCurrentFrame(time, true);
        } else {
            this._visualizer.updateData(this._status.toStatusData(state), time);
            this.renderCurrentFrame(time);
        }

        this.startAnimation();
    }

    /** Destroys the textures a newer snapshot replaced - call after React committed that snapshot. */
    public releaseRetired(): void {
        for (const texture of this._retired) texture.destroy(true);

        this._retired = [];
    }

    /** `dispose` - stops the animation and lets go of the visualizer and the texture; `refresh` starts it again. */
    public dispose(): void {
        this.stopAnimation();
        this.disposeVisualizer();

        if (this._snapshot.texture) this._retired.push(this._snapshot.texture);

        this.releaseRetired();
        this._canvas = null;
        this._refreshKey = null;
        this._snapshot = { texture: null, zoom: 1 };
    }

    private createVisualizer(state: VariableFxState, time: number): VariableFxVisualizer | null {
        const library = GetVariableFxAssetLibrary();

        try {
            return new VariableFxVisualizer(variableFxRuntimeConfig(state), this._status.toStatusData(state), time, library, getPreviewRegistry());
        } catch {
            // No renderer for the config: Flash's constructor throws too and the preview stays empty.
            return null;
        }
    }

    private disposeVisualizer(): void {
        this._visualizer?.dispose();
        this._visualizer = null;
    }

    /** `renderCurrentFrame(time, updateScale)`. */
    private renderCurrentFrame(time: number, updateScale: boolean = false): void {
        if (!this._visualizer) {
            this.publish(null, 1);

            return;
        }

        const updated = this._visualizer.update(time);
        const frame = this._visualizer.frame;
        const bitmap = frame.bitmap;
        let zoom = this._snapshot.zoom;

        if (updateScale) zoom = (bitmap && ((frame.width * PREVIEW_ZOOM) <= VARIABLE_FX_PREVIEW_WIDTH) && ((frame.height * PREVIEW_ZOOM) <= VARIABLE_FX_PREVIEW_HEIGHT)) ? PREVIEW_ZOOM : 1;

        if (!bitmap || (bitmap.width === 0) || (bitmap.height === 0)) {
            this.publish(null, zoom);

            return;
        }

        if (!updated && !updateScale && this._snapshot.texture) return;

        let texture = this._snapshot.texture;

        if (!this._canvas || (this._canvas.width !== bitmap.width) || (this._canvas.height !== bitmap.height)) {
            this._canvas = document.createElement('canvas');
            this._canvas.width = bitmap.width;
            this._canvas.height = bitmap.height;
            texture = null;
        }

        const context = this._canvas.getContext('2d');

        if (!context) return;

        context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        context.drawImage(bitmap, 0, 0);

        if (texture) {
            texture.source.update();
        } else {
            texture = Texture.from(this._canvas, true);
            texture.source.scaleMode = 'nearest';
            texture.label = 'variable_fx_preview';
        }

        this.publish(texture, zoom);
    }

    private publish(texture: Texture | null, zoom: number): void {
        if ((texture === this._snapshot.texture) && (zoom === this._snapshot.zoom)) return;

        if (this._snapshot.texture && (this._snapshot.texture !== texture)) this._retired.push(this._snapshot.texture);

        this._snapshot = { texture, zoom };

        for (const listener of this._listeners) listener();
    }

    private startAnimation(): void {
        if (this._timer !== null) return;

        this._timer = setInterval(() => this.onAnimationTimer(), PREVIEW_ANIMATION_INTERVAL_MS);
    }

    private stopAnimation(): void {
        if (this._timer === null) return;

        clearInterval(this._timer);
        this._timer = null;
    }

    private onAnimationTimer(): void {
        if (!this._visualizer) {
            this.stopAnimation();

            return;
        }

        this.renderCurrentFrame(performance.now());
    }
}

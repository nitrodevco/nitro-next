import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';

import { IVariableFxAssetProvider, VariableFxIconMetadataEntry, VariableFxRendererMapping } from './IVariableFxAssetProvider';
import { createTransparentBitmap, getBitmapContext, VariableFxBitmap } from './rendering/VariableFxBitmap';
import { VariableFxServerTables } from './VariableFxTables';

interface VariableFxAtlasFrame {
    frame: { x: number; y: number; w: number; h: number };
}

interface VariableFxAtlasManifest {
    frames: Record<string, VariableFxAtlasFrame>;
    icons: Record<string, { x: number; y: number }>;
    renderers: { id: number; name: string; rendererClass: string }[];
    meta: { image: string };
}

const DEFAULT_ASSET_URL = '/assets/variablefx';

/**
 * The Flash client embedded every `variablefx_*` bitmap (and the icon/renderer XML tables) in
 * its room visualization library. Here they are packed into one atlas (`atlas.png` +
 * `manifest.json`, built by nitro-react's `scripts/build-variablefx-atlas.ts`) which this
 * loads once; the renderers compose on the CPU, so each asset is sliced out into its own
 * canvas on first use rather than uploaded as a texture.
 */
export class VariableFxAssetLibrary implements IVariableFxAssetProvider {
    private _manifest: VariableFxAtlasManifest | undefined = undefined;
    private _image: HTMLImageElement | undefined = undefined;
    private _bitmaps: Map<string, VariableFxBitmap> = new Map();
    private _iconMetadata: Map<string, VariableFxIconMetadataEntry> = new Map();
    private _rendererMappings: VariableFxRendererMapping[] = [];
    private _loading: Promise<boolean> | undefined = undefined;
    private _ready: boolean = false;

    public get isReady(): boolean {
        return this._ready;
    }

    public load(baseUrl?: string): Promise<boolean> {
        if (this._ready) return Promise.resolve(true);
        if (this._loading) return this._loading;

        const base = (baseUrl ?? GetConfigValue<string>('variablefx.asset.url') ?? DEFAULT_ASSET_URL).replace(/\/$/, '');

        this._loading = this.loadAtlas(base)
            .catch((err: unknown) => {
                NitroLogger.error('VariableFxAssetLibrary: failed to load atlas', err);

                return false;
            })
            .finally(() => {
                this._loading = undefined;
            });

        return this._loading;
    }

    public getBitmap(name: string): VariableFxBitmap | undefined {
        if (!this._manifest || !this._image) return undefined;

        const existing = this._bitmaps.get(name);

        if (existing) return existing;

        const entry = this._manifest.frames[name];

        if (!entry) return undefined;

        const { x, y, w, h } = entry.frame;
        const bitmap = createTransparentBitmap(w, h);

        getBitmapContext(bitmap).drawImage(this._image, x, y, w, h, 0, 0, w, h);

        this._bitmaps.set(name, bitmap);

        return bitmap;
    }

    public getIconMetadata(): Map<string, VariableFxIconMetadataEntry> {
        return this._iconMetadata;
    }

    public getRendererMappings(): VariableFxRendererMapping[] {
        return this._rendererMappings;
    }

    private async loadAtlas(base: string): Promise<boolean> {
        const response = await fetch(`${base}/manifest.json`);

        if (!response.ok) throw new Error(`manifest request failed (${response.status})`);

        const manifest = await response.json() as VariableFxAtlasManifest;
        const image = await this.loadImage(`${base}/${manifest.meta?.image ?? 'atlas.png'}`);

        this._manifest = manifest;
        this._image = image;
        this._iconMetadata = new Map();
        this._rendererMappings = [];

        for (const [ name, offsets ] of Object.entries(manifest.icons ?? {})) {
            this._iconMetadata.set(name, { offsetX: Math.trunc(offsets.x) || 0, offsetY: Math.trunc(offsets.y) || 0 });
        }

        for (const mapping of manifest.renderers ?? []) {
            const rendererName = VariableFxServerTables.resolveRendererById(mapping.id);

            if (rendererName === undefined || rendererName !== mapping.name || !mapping.rendererClass?.length) continue;

            this._rendererMappings.push({ rendererId: mapping.id, renderer: rendererName, rendererClass: mapping.rendererClass });
        }

        this._ready = true;

        return true;
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.crossOrigin = 'anonymous';
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`image request failed: ${url}`));
            image.src = url;
        });
    }
}

let library: VariableFxAssetLibrary | undefined = undefined;

export const GetVariableFxAssetLibrary = (): VariableFxAssetLibrary => {
    if (!library) library = new VariableFxAssetLibrary();

    return library;
};

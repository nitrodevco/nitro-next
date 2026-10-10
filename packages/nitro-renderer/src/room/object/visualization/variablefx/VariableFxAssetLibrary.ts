import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '../../../../assets/GetAssetManager';
import { IVariableFxAssetProvider, VariableFxIconMetadataEntry, VariableFxRendererMapping } from './IVariableFxAssetProvider';
import { createTransparentBitmap, getBitmapContext, VariableFxBitmap } from './rendering/VariableFxBitmap';
import { VariableFxServerTables } from './VariableFxTables';

/** The two XML tables the Flash library carried, as Nitro Studio converts them. */
interface VariableFxBundleTables {
    icons: Record<string, { x: number; y: number }>;
    renderers: { id: number; name: string; rendererClass: string }[];
}

/** The client library the bitmaps come from, whose bundle - named after it - carries them. */
const BUNDLE_NAME = 'habbo-room-object-visualization-lib';
const TABLES_FILE = 'variable-fx-tables';

/**
 * The Flash client embedded every `variablefx_*` bitmap (and the icon/renderer XML tables) in
 * its room visualization library, and so do we: `habbo-room-object-visualization-lib`'s bundle, with
 * the avatar additions - what the room engine draws, as against the UI's own art: the bitmaps packed into a
 * sheet the shared `AssetManager` decodes and uploads once, and the two tables beside them as
 * JSON. The renderers compose on the CPU, so each asset is still cut out into its own canvas on
 * first use - out of the decoded sheet rather than a separately fetched atlas image.
 *
 * The bitmaps keep the names the SWF gave them (`variablefx_*`), which is what the renderers ask
 * for, so a lookup here is the asset name unchanged.
 */
export class VariableFxAssetLibrary implements IVariableFxAssetProvider {
    private _bitmaps: Map<string, VariableFxBitmap> = new Map();
    private _iconMetadata: Map<string, VariableFxIconMetadataEntry> = new Map();
    private _rendererMappings: VariableFxRendererMapping[] = [];
    private _loading: Promise<boolean> | undefined = undefined;
    private _ready: boolean = false;

    public get isReady(): boolean {
        return this._ready;
    }

    public load(): Promise<boolean> {
        if (this._ready) return Promise.resolve(true);
        if (this._loading) return this._loading;

        this._loading = this.loadBundle()
            .catch((err: unknown) => {
                NitroLogger.error('VariableFxAssetLibrary: failed to load bundle', err);

                return false;
            })
            .finally(() => {
                this._loading = undefined;
            });

        return this._loading;
    }

    public getBitmap(name: string): VariableFxBitmap | undefined {
        if (!this._ready) return undefined;

        const existing = this._bitmaps.get(name);

        if (existing) return existing;

        const texture = GetAssetManager().getTexture(name);
        const resource = texture?.source.resource as CanvasImageSource | undefined;

        if (!texture || !resource || (typeof resource !== 'object')) return undefined;

        // The asset's rect within the packed sheet the bundle carries.
        const { x, y, width, height } = texture.frame;
        const bitmap = createTransparentBitmap(width, height);

        getBitmapContext(bitmap).drawImage(resource, x, y, width, height, 0, 0, width, height);

        this._bitmaps.set(name, bitmap);

        return bitmap;
    }

    public getIconMetadata(): Map<string, VariableFxIconMetadataEntry> {
        return this._iconMetadata;
    }

    public getRendererMappings(): VariableFxRendererMapping[] {
        return this._rendererMappings;
    }

    private async loadBundle(): Promise<boolean> {
        // The hotel serves the library's bundle beside every other library's (Nitro Studio's, of the
        // client's bitmaps and its own); with `asset.bundles.templates` unset, it is not loaded.
        const url = GetConfigValue<string>('asset.bundles.templates')?.replace('%libname%', BUNDLE_NAME);

        if (!url) return false;

        const assetManager = GetAssetManager();

        if (!await assetManager.downloadAssetBundle(BUNDLE_NAME, url)) throw new Error(`bundle request failed: ${url}`);

        const tables = assetManager.getBundleFile<VariableFxBundleTables>(BUNDLE_NAME, TABLES_FILE);

        this._iconMetadata = new Map();
        this._rendererMappings = [];

        for (const [ name, offsets ] of Object.entries(tables?.icons ?? {})) {
            this._iconMetadata.set(name, { offsetX: Math.trunc(offsets.x) || 0, offsetY: Math.trunc(offsets.y) || 0 });
        }

        for (const mapping of tables?.renderers ?? []) {
            const rendererName = VariableFxServerTables.resolveRendererById(mapping.id);

            if (rendererName === undefined || rendererName !== mapping.name || !mapping.rendererClass?.length) continue;

            this._rendererMappings.push({ rendererId: mapping.id, renderer: rendererName, rendererClass: mapping.rendererClass });
        }

        this._ready = true;

        return true;
    }
}

let library: VariableFxAssetLibrary | undefined = undefined;

export const GetVariableFxAssetLibrary = (): VariableFxAssetLibrary => {
    if (!library) library = new VariableFxAssetLibrary();

    return library;
};

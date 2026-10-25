import { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection, NitroLogger } from '@nitrodevco/nitro-api';
import { AnimatedGIF } from '@pixi/gif';
import { Spritesheet, SpritesheetData, Texture, TextureSource } from 'pixi.js';

import { LoadMetrics, NitroBundle, TextureUtils } from '../utils';
import { GraphicAssetCollection } from './GraphicAssetCollection';

/**
 * Nitro's asset store: every texture, graphic asset collection and `.nitro` bundle the room engine
 * and the UI draw from, by name. Flash keeps an `AssetLibrary` per component; the port has one.
 */
export class AssetManager implements IAssetManager {
    private _textures: Map<string, Texture> = new Map();
    private _collections: Map<string, IGraphicAssetCollection> = new Map();
    private _bundles: Map<string, NitroBundle> = new Map();
    private _bundlePromises: Map<string, Promise<IGraphicAssetCollection | undefined>> = new Map();

    public getTexture(name: string): Texture | undefined {
        return this._textures.get(name);
    }

    public setTexture(name: string, texture: Texture): void {
        if (!name || !texture) return;

        texture.label = name;

        this._textures.set(name, texture);
    }

    public removeTexture(name: string): void {
        this._textures.delete(name);
    }

    public getAsset(name: string): IGraphicAsset | undefined {
        if (!name || !name.length) return undefined;

        for (const collection of this._collections.values()) {
            if (!collection) continue;

            const existing = collection.getAsset(name);

            if (!existing) continue;

            return existing;
        }

        NitroLogger.warn(`AssetManager: Asset not found: ${name}`);

        return undefined;
    }

    public addAssetToCollection(
        collectionName: string,
        assetName: string,
        texture: Texture,
    ): IGraphicAsset | undefined {
        const collection = this.getCollection(collectionName);

        return collection?.addAsset(assetName, texture, 0, 0, false, false, false, true) ?? undefined;
    }

    public getCollection(name: string): IGraphicAssetCollection | undefined {
        return this._collections.get(name);
    }

    /**
     * Forgets a collection and frees what it drew with: its textures, and the sheets they are cut
     * from, which live on the GPU until destroyed. Flash's `dispose` of the collection and its asset
     * library. Only for a collection nothing draws any more - `RoomContentLoader.purge` asks its
     * reference count first; the next object of the type downloads it again.
     */
    public removeCollection(name: string): void {
        const collection = this._collections.get(name);

        if (!collection) return;

        const sources = new Set<TextureSource>();

        if (collection.textureSource) sources.add(collection.textureSource);

        for (const [ textureName, texture ] of collection.textures) {
            this.removeTexture(textureName);

            if (texture.source) sources.add(texture.source);

            // `destroyTexture` rebuilds the room's batches first, so none still binds the sheet.
            TextureUtils.destroyTexture(texture, false);
        }

        this._collections.delete(name);

        collection.dispose();

        for (const source of sources) TextureUtils.destroySource(source);
    }

    public createCollection(
        data: IAssetData,
        spritesheet: Spritesheet | undefined,
        textures?: Record<string, Texture>,
    ): IGraphicAssetCollection | undefined {
        if (!data) return undefined;

        const collection = new GraphicAssetCollection(data, spritesheet?.textureSource, { ...spritesheet?.textures, ...textures });

        for (const [ name, texture ] of collection.textures.entries()) this.setTexture(name, texture);

        this._collections.set(collection.name, collection);

        return collection;
    }

    public async downloadAssets(urls: string[]): Promise<boolean> {
        if (!urls || !urls.length) return true;

        try {
            await Promise.all(urls.map(url => this.downloadAsset(url)));

            return true;
        } catch (err) {
            NitroLogger.error(err);

            return false;
        }
    }

    /** The GIF's first frame, or nothing when the decoder finds no frame in the bytes. */
    private static firstGifFrame(data: ArrayBuffer): Texture | undefined {
        let animatedGif: AnimatedGIF;

        try {
            animatedGif = AnimatedGIF.fromBuffer(data, { autoPlay: false });
        } catch {
            return undefined;
        }

        const paintable = animatedGif as unknown as { dirty: boolean; updateFrame(): void };

        paintable.dirty = true;
        paintable.updateFrame();

        const source = animatedGif.texture.source.resource as HTMLCanvasElement;
        const canvas = document.createElement('canvas');

        canvas.width = animatedGif.texture.width;
        canvas.height = animatedGif.texture.height;
        canvas.getContext('2d')?.drawImage(source, 0, 0);

        animatedGif.destroy();

        return Texture.from(canvas);
    }

    public async downloadAsset(url: string): Promise<boolean> {
        const ext = url ? url.slice(url.lastIndexOf('.') + 1) : '';
        const measured = (ext === 'nitro') && LoadMetrics.enabled;

        let succeeded = false;

        try {
            if (!url || !url.length) throw new Error(`Invalid url: ${url}`);

            if (measured) LoadMetrics.mark(url, 'fetch');

            const response = await fetch(url);

            // The status and the file in the message, so a client error report says which file is missing.
            if (!response || response.status !== 200) throw new Error(`Invalid response ${response?.status} for ${url}`);

            if (measured) LoadMetrics.mark(url, 'headers');

            const responseData = await response.arrayBuffer();

            if (measured) {
                LoadMetrics.mark(url, 'body');
                LoadMetrics.addBytes(url, responseData.byteLength);
            }

            switch (ext) {
                case 'nitro': {
                    // Not retained, so nothing of it is kept beyond the collection it defines.
                    const bundle = await NitroBundle.fromBuffer(responseData, measured ? url : undefined);

                    if (measured) LoadMetrics.mark(url, 'decoded');

                    await this.processNitroBundle(bundle);
                    break;
                }
                case 'gif': {
                    // A ".gif" whose bytes the GIF decoder finds no frame in (a PNG under a .gif
                    // name, as badge packs ship, or an unusual GIF) still draws in a browser, as
                    // in Flash, whose Loader reads the bytes and not the name.
                    const texture = AssetManager.firstGifFrame(responseData)
                        ?? await TextureUtils.textureFromEncodedBytes(responseData, 'image/gif', url);

                    this.setTexture(url, texture);
                    break;
                }
                case 'png': {
                    this.setTexture(url, await TextureUtils.textureFromEncodedBytes(responseData, 'image/png', url));
                    break;
                }
                default: {
                    throw new Error(`Invalid asset extension: ${ext}`);
                }
            }

            succeeded = true;

            return true;
        } catch (err) {
            NitroLogger.error(err);

            return false;
        } finally {
            if (measured) LoadMetrics.end(url, succeeded);
        }
    }

    public get collections(): Map<string, IGraphicAssetCollection> {
        return this._collections;
    }

    /**
     * A UI asset bundle: the same `.nitro` archive furniture comes in, kept by name after it is
     * read so its JSON entries and encoded bitmaps stay reachable (`getBundleFile`,
     * `getBundleBinary`). Every asset in it lands in `_textures` under its own name, so a
     * bundled bitmap is `GetAssetManager().getTexture('habbo-room-ui-com-roomtools_gear')` from anywhere.
     *
     * Downloading the same bundle twice joins the first download rather than fetching again.
     */
    public downloadAssetBundle(name: string, url: string): Promise<IGraphicAssetCollection | undefined> {
        const existing = this._bundlePromises.get(name);

        if (existing) return existing;

        const promise = (async () => {
            try {
                if (!name || !name.length) throw new Error(`Invalid bundle name: ${name}`);
                if (!url || !url.length) throw new Error(`Invalid url: ${url}`);

                const response = await fetch(url);

                if (!response || response.status !== 200) throw new Error(`Invalid response for bundle ${name}: ${response?.status}`);

                const bundle = await NitroBundle.fromBuffer(await response.arrayBuffer());
                const collection = await this.processNitroBundle(bundle, name);

                this._bundles.set(name, bundle);

                return collection;
            } catch (err) {
                NitroLogger.error(err);

                // A failed bundle is not remembered, so a later call can try again.
                this._bundlePromises.delete(name);

                return undefined;
            }
        })();

        this._bundlePromises.set(name, promise);

        return promise;
    }

    public async downloadAssetBundles(bundles: { name: string; url: string }[]): Promise<boolean> {
        if (!bundles || !bundles.length) return true;

        const results = await Promise.all(bundles.map(bundle => this.downloadAssetBundle(bundle.name, bundle.url)));

        return results.every(collection => !!collection);
    }

    public getBundle(name: string): NitroBundle | undefined {
        return this._bundles.get(name);
    }

    /** A JSON entry of a retained bundle - the tables a bundle carries beside its bitmaps. */
    public getBundleFile<T>(bundleName: string, fileName: string): T | undefined {
        const files = this._bundles.get(bundleName)?.files;

        if (!files) return undefined;

        return (files[fileName] ?? files[`${fileName}.json`]) as T | undefined;
    }

    /**
     * Drops a retained bundle's raw entries - its parsed tables and any bytes it carried - once
     * the code that asked for the bundle has read them. The textures stay, as does any `blob:`
     * URL already handed out. Nothing re-reads them, so this is the caller's own call to make.
     */
    public releaseBundleData(name: string): void {
        this._bundles.get(name)?.releaseData();
    }

    /**
     * Forgets a retained bundle entirely: its raw entries, and its collection with every texture
     * and the GPU sources they sit on (`removeCollection`). Only for a bundle nothing draws any
     * more; asking for it again downloads it again.
     */
    public removeAssetBundle(name: string): void {
        this._bundles.get(name)?.releaseData();
        this._bundles.delete(name);
        this._bundlePromises.delete(name);

        this.removeCollection(name);
    }

    /**
     * A non-JSON, non-PNG entry of a retained bundle, as bytes - a `.ttf` face the client hands
     * to `FontFace`, and anything else carried through the archive verbatim.
     */
    public getBundleBinary(bundleName: string, fileName: string): ArrayBuffer | undefined {
        return this._bundles.get(bundleName)?.binaries[fileName];
    }

    /**
     * Reads one archive into a collection.
     *
     * `bundleName` is set for a retained UI bundle and names the one JSON entry that is asset
     * data (`<name>.json`, as a converted library writes it); every other JSON entry is a table
     * the bundle carries for its own consumer and is left in `bundle.files` instead of being
     * merged in. Without it - the furniture/pet/figure path through `downloadAsset` - every
     * JSON entry merges, which is what those archives expect.
     *
     * A PNG the spritesheet does not claim as its sheet is an asset in its own right: bundles
     * that would gain nothing from packing (large art, or bitmaps a consumer slices itself)
     * ship one PNG per asset, and those become collection textures directly.
     */
    private async processNitroBundle(bundle: NitroBundle, bundleName?: string): Promise<IGraphicAssetCollection | undefined> {
        if (!bundle) return undefined;

        let assetData: IAssetData = { type: bundleName ?? '' };
        let spritesheet: Spritesheet | undefined = undefined;
        let spritesheetImage: string | undefined = undefined;

        for (const key in bundle.files) {
            const name = key.substring(0, key.lastIndexOf('.'));
            const value = bundle.files[key];

            try {
                if (name.endsWith('_spritesheet')) {
                    const spritesheetData = value as SpritesheetData;

                    if (!spritesheetData.meta?.image) continue;

                    const texture = bundle.textures[spritesheetData.meta.image];

                    if (texture) {
                        spritesheet = new Spritesheet(texture, spritesheetData);

                        await spritesheet.parse();

                        spritesheetImage = spritesheetData.meta.image;

                        this.setTexture(name, texture);
                    }
                } else if (!bundleName || (name === bundleName)) {
                    assetData = { ...assetData, ...value };
                }
            } catch (err) {
                NitroLogger.error(err);

                continue;
            }
        }

        const textures: Record<string, Texture> = {};

        for (const key in bundle.textures) {
            if (key === spritesheetImage) continue;

            textures[key] = bundle.textures[key];
        }

        return this.createCollection(assetData, spritesheet, textures);
    }
}

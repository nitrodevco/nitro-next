import { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection, NitroLogger } from '@nitrodevco/nitro-api';
import { AnimatedGIF } from '@pixi/gif';
import { Spritesheet, SpritesheetData, Texture } from 'pixi.js';

import { NitroBundle, TextureUtils } from '../utils';
import { GraphicAssetCollection } from './GraphicAssetCollection';

export class AssetManager implements IAssetManager {
    private _textures: Map<string, Texture> = new Map();
    private _collections: Map<string, IGraphicAssetCollection> = new Map();
    private _bundles: Map<string, NitroBundle> = new Map();
    /**
     * Whether a retained bundle keeps each bitmap's encoded bytes, so `getBundleImageUrl` can hand
     * out a `blob:` URL for it. Only the DOM render target needs that - Pixi draws the `Texture` -
     * and it is ~2.6 MB held for the session, so it is off unless that target sets it at boot.
     */
    public keepBundleImageBytes: boolean = false;
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

    public removeCollection(name: string): void {
        const collection = this._collections.get(name);

        if (!collection) return;

        for (const textureName of collection.textures.keys()) this.removeTexture(textureName);

        this._collections.delete(name);

        collection.dispose();
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

    public async downloadAsset(url: string): Promise<boolean> {
        try {
            if (!url || !url.length) throw new Error(`Invalid url: ${url}`);

            const ext = url.slice(url.lastIndexOf('.') + 1);
            const response = await fetch(url);

            if (!response || response.status !== 200) throw new Error('Invalid response');

            const responseData = await response.arrayBuffer();

            switch (ext) {
                case 'nitro': {
                    // Not retained, so nothing of it is kept beyond the collection it defines.
                    await this.processNitroBundle(await NitroBundle.fromBuffer(responseData));
                    break;
                }
                case 'gif': {
                    const animatedGif = AnimatedGIF.fromBuffer(responseData, { autoPlay: false });
                    const paintable = animatedGif as unknown as { dirty: boolean; updateFrame(): void };

                    paintable.dirty = true;
                    paintable.updateFrame();

                    const source = animatedGif.texture.source.resource as HTMLCanvasElement;
                    const canvas = document.createElement('canvas');

                    canvas.width = animatedGif.texture.width;
                    canvas.height = animatedGif.texture.height;
                    canvas.getContext('2d')?.drawImage(source, 0, 0);

                    const texture = Texture.from(canvas);

                    animatedGif.destroy();
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

            return true;
        } catch (err) {
            NitroLogger.error(err);

            return false;
        }
    }

    public get collections(): Map<string, IGraphicAssetCollection> {
        return this._collections;
    }

    /**
     * A UI asset bundle: the same `.nitro` archive furniture comes in, kept by name after it is
     * read so its JSON entries and encoded bitmaps stay reachable (`getBundleFile`,
     * `getBundleImageUrl`). Every asset in it lands in `_textures` under its own name, so a
     * bundled bitmap is `GetAssetManager().getTexture('room-ui-roomtools_gear')` from anywhere.
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

                const bundle = await NitroBundle.fromBuffer(await response.arrayBuffer(), this.keepBundleImageBytes);
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
     * A non-JSON, non-PNG entry of a retained bundle, as bytes - a `.ttf` face the client hands
     * to `FontFace`, and anything else carried through the archive verbatim.
     */
    public getBundleBinary(bundleName: string, fileName: string): ArrayBuffer | undefined {
        return this._bundles.get(bundleName)?.binaries[fileName];
    }

    /** A `blob:` URL for one of a retained bundle's bitmaps - see `NitroBundle.getObjectUrl`. */
    public getBundleImageUrl(bundleName: string, fileName: string): string | undefined {
        const bundle = this._bundles.get(bundleName);

        if (!bundle) return undefined;

        return bundle.getObjectUrl(fileName) ?? bundle.getObjectUrl(`${fileName}.png`);
    }

    /**
     * The same, without knowing which bundle holds the file. Asset names are unique across every
     * bundle (the builder fails the build if two ever collide), so the first hit is the only hit
     * - and a caller drawing a bitmap has its name, not the archive it happens to ship in.
     */
    public findBundleImageUrl(fileName: string): string | undefined {
        for (const bundle of this._bundles.values()) {
            const url = bundle.getObjectUrl(fileName) ?? bundle.getObjectUrl(`${fileName}.png`);

            if (url) return url;
        }

        return undefined;
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

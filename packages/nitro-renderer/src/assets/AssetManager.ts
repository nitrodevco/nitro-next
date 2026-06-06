import type { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatedGIF } from '@pixi/gif';
import JSZip from 'jszip';
import type { SpritesheetData, Texture } from 'pixi.js';
import { Assets, Spritesheet } from 'pixi.js';

import { NitroBundle } from '../utils';
import { GraphicAssetCollection } from './GraphicAssetCollection';

export class AssetManager implements IAssetManager {
    private _textures: Map<string, Texture> = new Map();
    private _collections: Map<string, IGraphicAssetCollection> = new Map();

    public getTexture(name: string): Texture | undefined {
        return this._textures.get(name);
    }

    public setTexture(name: string, texture: Texture): void {
        if (!name || !texture) return;

        texture.label = name;

        this._textures.set(name, texture);
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
        texture: Texture
    ): IGraphicAsset | undefined {
        const collection = this.getCollection(collectionName);

        return collection?.addAsset(assetName, texture, 0, 0, false, false, false, true) ?? undefined;
    }

    public getCollection(name: string): IGraphicAssetCollection | undefined {
        return this._collections.get(name);
    }

    public createCollection(
        data: IAssetData,
        spritesheet: Spritesheet | undefined,
    ): IGraphicAssetCollection | undefined {
        if (!data) return undefined;

        const collection = new GraphicAssetCollection(data, spritesheet?.textureSource, spritesheet?.textures);

        for (const [name, texture] of collection.textures.entries()) this.setTexture(name, texture);

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

            if (!response || response.status !== 200) throw new Error(`Invalid response`);

            const responseData = await response.arrayBuffer();

            switch (ext) {
                case 'nitro': {
                    const zip = await JSZip.loadAsync(responseData);
                    const bundle = await NitroBundle.fromZip(zip);

                    await this.processNitroBundle(bundle);
                    break;
                }
                case 'gif': {
                    const animatedGif = AnimatedGIF.fromBuffer(responseData);
                    const texture = animatedGif.texture;

                    this.setTexture(url, texture);
                    break;
                }
                case 'png': {
                    const bytes = new Uint8Array(responseData);

                    let binary = '';

                    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);

                    const base64 = btoa(binary);
                    const texture = await Assets.load<Texture>(`data:image/png;base64,${base64}`);

                    this.setTexture(url, texture);
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

    private async processNitroBundle(bundle: NitroBundle): Promise<void> {
        if (!bundle) return;

        let assetData: IAssetData = { type: '' };
        let spritesheet: Spritesheet | undefined = undefined;

        for (const key in bundle.files) {
            const name = key.substring(0, key.lastIndexOf('.'))
            const value = bundle.files[key];

            try {
                if (name.endsWith('_spritesheet')) {
                    const assetData = value as SpritesheetData;

                    if (!assetData.meta?.image) continue;

                    const texture = bundle.textures[assetData.meta.image];

                    if (texture) {
                        spritesheet = new Spritesheet(bundle.textures[assetData.meta?.image], assetData);

                        await spritesheet.parse();

                        //if (spritesheet.textureSource) spritesheet.textureSource.label = bundle.name;

                        this.setTexture(name, texture);
                    }
                } else {
                    assetData = { ...assetData, ...value };
                }
            }
            catch (err) {
                NitroLogger.error(err);

                continue;
            }
        }

        this.createCollection(assetData, spritesheet);
    }
}

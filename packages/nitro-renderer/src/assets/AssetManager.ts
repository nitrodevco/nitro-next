import type { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection, ISpritesheetData } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatedGIF } from '@pixi/gif';
import JSZip from 'jszip';
import type { Texture } from 'pixi.js';
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
        texture: Texture,
        override: boolean = true,
    ): boolean {
        const collection = this.getCollection(collectionName);

        if (!collection) return false;

        return collection.addAsset(assetName, texture, override, 0, 0, false, false);
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
                    const texture = await Assets.load(`data:image/png;base64,${base64}`);

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

        const keys = Object.keys(bundle.files).filter(x => !x.endsWith('_spritesheet.json'));

        for (const key of keys) {
            try {
                const asset = bundle.files[key] as IAssetData;

                if (!asset) continue;

                const name: string | undefined = asset.name ?? key.slice(0, key.lastIndexOf('.'));

                let spritesheetData: ISpritesheetData | undefined = asset.spritesheet;
                let spritesheet: Spritesheet | undefined = undefined;
                let texture: Texture | undefined = undefined;

                if (!spritesheetData) spritesheetData = bundle.files[`${name}_spritesheet.json`] as ISpritesheetData;

                if (spritesheetData) {
                    texture = bundle.textures[spritesheetData.meta.image];
                } else texture = bundle.textures[`${name}.png`];

                if (texture) {
                    if (spritesheetData) {
                        spritesheet = new Spritesheet(texture, spritesheetData);

                        await spritesheet.parse();

                        if (spritesheet.textureSource) spritesheet.textureSource.label = name ?? null;
                    } else {
                        this.setTexture(name, texture);
                    }
                }

                this.createCollection(asset, spritesheet);
            }
            catch (err) {
                NitroLogger.error(err);

                continue;
            }
        }
    }
}

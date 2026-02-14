import type { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatedGIF } from '@pixi/gif';
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
        if (!urls || !urls.length) return Promise.resolve(true);

        try {
            await Promise.all(urls.map(url => this.downloadAsset(url)));

            return true;
        } catch (err) {
            NitroLogger.error(err);
        }

        return false;
    }

    public async downloadAsset(url: string): Promise<boolean> {
        try {
            if (!url || !url.length) return false;

            if (url.endsWith('.nitro') || url.endsWith('.gif')) {
                const response = await fetch(url);

                if (!response || response.status !== 200) return false;

                const arrayBuffer = await response.arrayBuffer();

                if (url.endsWith('.nitro')) {
                    const nitroBundle = await NitroBundle.from(arrayBuffer);

                    await this.processAsset(nitroBundle.texture, nitroBundle.jsonFile as IAssetData);
                } else {
                    const animatedGif = AnimatedGIF.fromBuffer(arrayBuffer);
                    const texture = animatedGif.texture;

                    if (texture) this.setTexture(url, texture);
                }
            } else {
                const texture = await Assets.load<Texture>(url);

                if (texture) this.setTexture(url, texture);
            }

            return true;
        } catch (err) {
            NitroLogger.error(err);

            return false;
        }
    }

    private async processAsset(texture: Texture | undefined, data: IAssetData | undefined): Promise<void> {
        if(!data) return;

        let spritesheet: Spritesheet<SpritesheetData> | undefined = undefined;

        if (texture && data.spritesheet && Object.keys(data.spritesheet).length) {
            spritesheet = new Spritesheet(texture, data.spritesheet);

            await spritesheet.parse();

            if (spritesheet.textureSource) spritesheet.textureSource.label = data.name ?? null;
        }

        this.createCollection(data, spritesheet);
    }

    public get collections(): Map<string, IGraphicAssetCollection> {
        return this._collections;
    }
}

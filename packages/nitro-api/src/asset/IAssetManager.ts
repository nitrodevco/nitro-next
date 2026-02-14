import type { Spritesheet, Texture } from 'pixi.js';

import type { IAssetData } from './IAssetData';
import type { IGraphicAsset } from './IGraphicAsset';
import type { IGraphicAssetCollection } from './IGraphicAssetCollection';

export interface IAssetManager {
    getTexture(name: string): Texture | undefined;
    setTexture(name: string, texture: Texture): void;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture, override?: boolean): boolean;
    getAsset(name: string): IGraphicAsset | undefined;
    getCollection(name: string): IGraphicAssetCollection | undefined;
    createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection | undefined;
    downloadAssets(urls: string[]): Promise<boolean>;
    downloadAsset(url: string): Promise<boolean>;
    readonly collections: Map<string, IGraphicAssetCollection>;
}

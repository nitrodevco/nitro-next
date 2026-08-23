import { Spritesheet, Texture } from 'pixi.js';

import { IAssetData } from './IAssetData';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetCollection } from './IGraphicAssetCollection';

export interface IAssetManager {
    getTexture(name: string): Texture | undefined;
    setTexture(name: string, texture: Texture): void;
    getAsset(name: string): IGraphicAsset | undefined;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture): IGraphicAsset | undefined;
    getCollection(name: string): IGraphicAssetCollection | undefined;
    createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection | undefined;
    downloadAssets(urls: string[]): Promise<boolean>;
    downloadAsset(url: string): Promise<boolean>;
    readonly collections: Map<string, IGraphicAssetCollection>;
}

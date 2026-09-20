import { Spritesheet, Texture } from 'pixi.js';

import { IAssetData } from './IAssetData';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetCollection } from './IGraphicAssetCollection';

export interface IAssetManager {
    getTexture(name: string): Texture | undefined;
    setTexture(name: string, texture: Texture): void;
    removeTexture(name: string): void;
    getAsset(name: string): IGraphicAsset | undefined;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture): IGraphicAsset | undefined;
    getCollection(name: string): IGraphicAssetCollection | undefined;
    removeCollection(name: string): void;
    createCollection(data: IAssetData, spritesheet: Spritesheet | undefined, textures?: Record<string, Texture>): IGraphicAssetCollection | undefined;
    downloadAssets(urls: string[]): Promise<boolean>;
    downloadAsset(url: string): Promise<boolean>;
    /** A `.nitro` bundle kept by name after it is read - see `AssetManager.downloadAssetBundle`. */
    downloadAssetBundle(name: string, url: string): Promise<IGraphicAssetCollection | undefined>;
    downloadAssetBundles(bundles: { name: string; url: string }[]): Promise<boolean>;
    /** A JSON entry a retained bundle carries beside its bitmaps. */
    getBundleFile<T>(bundleName: string, fileName: string): T | undefined;
    /** A non-JSON, non-PNG entry of a retained bundle, as bytes (a `.ttf` face, ...). */
    getBundleBinary(bundleName: string, fileName: string): ArrayBuffer | undefined;
    /** A `blob:` URL for one of a retained bundle's bitmaps, for the DOM render target. */
    getBundleImageUrl(bundleName: string, fileName: string): string | undefined;
    /** The same, searching every retained bundle - asset names are unique across all of them. */
    findBundleImageUrl(fileName: string): string | undefined;
    /** Drops a retained bundle's tables and raw bytes once its consumer has read them. */
    releaseBundleData(name: string): void;
    /** Whether retained bundles keep encoded bitmap bytes for `getBundleImageUrl` (DOM target only). */
    keepBundleImageBytes: boolean;
    readonly collections: Map<string, IGraphicAssetCollection>;
}

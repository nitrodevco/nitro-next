import type { Texture, TextureSource } from 'pixi.js';

import type { IAssetData } from './IAssetData';
import type { IGraphicAsset } from './IGraphicAsset';
import type { IGraphicAssetPalette } from './IGraphicAssetPalette';

export interface IGraphicAssetCollection {
    dispose(): void;
    addReference(): void;
    removeReference(): void;
    define(data: IAssetData): void;
    getAsset(name: string): IGraphicAsset | undefined;
    getAssetWithPalette(name: string, paletteId: number): IGraphicAsset | undefined;
    getTexture(name: string): Texture | undefined;
    getPaletteColors(paletteId: number): number[];
    getPalette(paletteId: number): IGraphicAssetPalette | undefined;
    addAsset(
        name: string,
        texture: Texture,
        override: boolean,
        x?: number,
        y?: number,
        flipH?: boolean,
        flipV?: boolean,
    ): boolean;
    disposeAsset(name: string): void;
    getLibraryAsset(name: string): Texture | undefined;
    readonly referenceCount: number;
    readonly name: string;
    readonly data: IAssetData;
    readonly textureSource: TextureSource | undefined;
    readonly textures: Map<string, Texture>;
    readonly assets: Map<string, IGraphicAsset>;
    readonly palettes: Map<number, IGraphicAssetPalette>;
}

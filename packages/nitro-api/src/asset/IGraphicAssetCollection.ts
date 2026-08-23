import { Texture, TextureSource } from 'pixi.js';

import { IAssetData } from './IAssetData';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetPalette } from './IGraphicAssetPalette';

export interface IGraphicAssetCollection {
    dispose(): void;
    define(data: IAssetData): void;
    getAssetWithPalette(name: string, paletteId: number): IGraphicAsset | undefined;
    getPaletteColors(paletteId: number): number[];
    addAsset(
        name: string,
        texture: Texture,
        x?: number,
        y?: number,
        flipH?: boolean,
        flipV?: boolean,
        usesPalette?: boolean,
        replace?: boolean
    ): IGraphicAsset | undefined;
    disposeAsset(name: string): void;
    getAsset(name: string): IGraphicAsset | undefined;
    getTexture(name: string): Texture | undefined;
    getPalette(paletteId: number): IGraphicAssetPalette | undefined;
    addReference(): void;
    removeReference(): void;
    readonly referenceCount: number;
    readonly name: string;
    readonly data: IAssetData;
    readonly textureSource: TextureSource | undefined;
    readonly textures: Map<string, Texture>;
    readonly assets: Map<string, IGraphicAsset>;
    readonly palettes: Map<number, IGraphicAssetPalette>;
}

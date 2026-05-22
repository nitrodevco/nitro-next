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
    getAssetWithPalette(name: string, paletteName: string): IGraphicAsset | undefined;
    getTexture(name: string): Texture | undefined;
    getPaletteNames(): string[];
    getPaletteColors(paletteName: string): number[];
    getPalette(name: string): IGraphicAssetPalette | undefined;
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
    getLibraryAsset(name: string): Texture | null;
    readonly referenceCount: number;
    readonly name: string;
    readonly data: IAssetData;
    readonly textureSource: TextureSource | undefined;
    readonly textures: Map<string, Texture>;
    readonly assets: Map<string, IGraphicAsset>;
}

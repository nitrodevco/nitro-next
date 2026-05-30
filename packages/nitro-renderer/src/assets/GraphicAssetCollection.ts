import type {
    IAsset,
    IAssetData,
    IAssetPalette,
    IGraphicAsset,
    IGraphicAssetCollection,
    IGraphicAssetPalette,
} from '@nitrodevco/nitro-api';
import type { Texture, TextureSource } from 'pixi.js';

import { GraphicAsset } from './GraphicAsset';
import { GraphicAssetPalette } from './GraphicAssetPalette';

export class GraphicAssetCollection implements IGraphicAssetCollection {
    private static PALETTE_ASSET_DISPOSE_THRESHOLD: number = 10;

    private _referenceCount: number = 0;

    private _type: string;
    private _textureSource: TextureSource | undefined;
    private _data: IAssetData;
    private _textures: Map<string, Texture>;
    private _assets: Map<string, IGraphicAsset>;
    private _palettes: Map<number, IGraphicAssetPalette>;
    private _paletteAssetNames: string[];

    constructor(data: IAssetData, source: TextureSource | undefined, textures: Record<string, Texture> | undefined) {
        if (!data) throw new Error('invalid_collection');

        this._type = data.type;
        this._textureSource = source;
        this._data = data;
        this._textures = new Map();
        this._assets = new Map();
        this._palettes = new Map();
        this._paletteAssetNames = [];

        this.addLibraryAsset(textures);
        this.define(data);
    }

    public static removeFileExtension(name: string): string {
        return name.substring(0, name.lastIndexOf('.')) || name;
    }

    public dispose(): void {
        if (this._palettes) this._palettes.clear();

        if (this._paletteAssetNames) {
            this.disposePaletteAssets();

            this._paletteAssetNames = [];
        }

        if (this._assets) {
            for (const asset of this._assets.values()) asset.recycle();

            this._assets.clear();
        }
    }

    public addReference(): void {
        this._referenceCount++;
    }

    public removeReference(): void {
        this._referenceCount--;

        if (this._referenceCount <= 0) {
            this._referenceCount = 0;

            this.disposePaletteAssets(false);
        }
    }

    public define(data: IAssetData): void {
        const assets = data.assets;
        const palettes = data.palettes;

        if (assets) this.defineAssets(assets);

        if (palettes) this.definePalettes(palettes);
    }

    public getAsset(name: string): IGraphicAsset | undefined {
        return this._assets.get(name);
    }

    public getAssetWithPalette(name: string, paletteId: number): IGraphicAsset | undefined {
        const saveName = name + '@' + paletteId;

        const asset = this.getAsset(saveName) || this.getAsset(name);

        if (!asset || !asset.texture || !asset.usesPalette) return undefined;

        const palette = this.getPalette(paletteId);

        if (!palette) return asset;

        const texture = palette.applyPalette(asset.texture);

        this._paletteAssetNames.push(saveName);

        this.createAsset(
            saveName,
            asset.source + '@' + paletteId,
            texture,
            asset.flipH,
            asset.flipV,
            asset.x,
            asset.y,
            false,
        );

        return this.getAsset(saveName);
    }

    public getTexture(name: string): Texture | undefined {
        return this._textures.get(name);
    }

    public getPaletteColors(paletteId: number): number[] {
        const palette = this.getPalette(paletteId);

        if (palette) return [palette.primaryColor, palette.secondaryColor];

        return [0, 0];
    }

    public getPalette(paletteId: number): IGraphicAssetPalette | undefined {
        return this._palettes.get(paletteId);
    }

    public addAsset(
        name: string,
        texture: Texture,
        override: boolean,
        x: number = 0,
        y: number = 0,
        flipH: boolean = false,
        flipV: boolean = false,
    ): boolean {
        if (!name || !texture) return false;

        const existingTexture = this.getLibraryAsset(name);

        if (!existingTexture) {
            this._textures.set(name, texture);

            return this.createAsset(name, name, texture, flipH, flipV, x, y, false);
        }

        if (override) {
            existingTexture.source = texture.source;

            //@ts-expect-error we need to manually do it
            existingTexture.frame = texture.frame;

            //@ts-expect-error we need to manually do it
            existingTexture.trim = texture.trim;

            existingTexture.updateUvs();

            return true;
        }

        return false;
    }

    public disposeAsset(name: string): void {
        const existing = this._assets.get(name);

        if (!existing) return;

        this._assets.delete(name);

        if (!existing.source) return;

        const texture = this.getLibraryAsset(existing.source);

        if (texture) {
            this._textures.delete(existing.source);

            texture.destroy(true);
        }

        existing.recycle();
    }

    public getLibraryAsset(name: string): Texture | undefined {
        return this._textures.get(name);
    }

    public get referenceCount(): number {
        return this._referenceCount;
    }

    public get name(): string {
        return this._type;
    }

    public get data(): IAssetData {
        return this._data;
    }

    public get textureSource(): TextureSource | undefined {
        return this._textureSource;
    }

    public get textures(): Map<string, Texture> {
        return this._textures;
    }

    public get assets(): Map<string, IGraphicAsset> {
        return this._assets;
    }

    public get palettes(): Map<number, IGraphicAssetPalette> {
        return this._palettes;
    }

    private defineAssets(assets: IAsset[]): void {
        if (!assets) return;

        for (const asset of assets) {
            const source = asset.source ?? asset.name;
            const x = -(asset.x || 0);
            const y = -(asset.y || 0);
            const flipH = asset.flipH ?? false;
            const flipV = false;
            const usesPalette = asset.usesPalette ?? false;

            // if(asset.flipV && source.length) flipV = true;

            const texture = this.getLibraryAsset(source);

            if (!texture) continue;

            let didAddAsset = this.createAsset(asset.name, source, texture, flipH, flipV, x, y, usesPalette);

            if (!didAddAsset) {
                const existingAsset = this.getAsset(asset.name);

                if (existingAsset && existingAsset.name !== existingAsset.source) {
                    didAddAsset = this.replaceAsset(asset.name, source, texture, flipH, flipV, x, y, usesPalette);
                }
            }
        }
    }

    private definePalettes(palettes: IAssetPalette[]): void {
        if (!palettes) return;

        for (const palette of palettes) {
            if (this._palettes.get(palette.id)) continue;

            let colorOne = 0xffffff;
            let colorTwo = 0xffffff;

            let color = palette.color1;

            if (color && color.length > 0) colorOne = parseInt(color, 16);

            color = palette.color2;

            if (color && color.length > 0) colorTwo = parseInt(color, 16);

            if (palette.rgb) this._palettes.set(palette.id, new GraphicAssetPalette(palette.rgb, colorOne, colorTwo));
        }
    }

    private createAsset(
        name: string,
        source: string,
        texture: Texture,
        flipH: boolean,
        flipV: boolean,
        x: number,
        y: number,
        usesPalette: boolean,
    ): boolean {
        if (this._assets.get(name)) return false;

        const graphicAsset = GraphicAsset.createAsset(name, source, texture, x, y, flipH, flipV, usesPalette);

        this._assets.set(name, graphicAsset);

        return true;
    }

    private replaceAsset(
        name: string,
        source: string,
        texture: Texture,
        flipH: boolean,
        flipV: boolean,
        x: number,
        y: number,
        usesPalette: boolean,
    ): boolean {
        const existing = this._assets.get(name);

        if (existing) {
            this._assets.delete(name);

            existing.recycle();
        }

        return this.createAsset(name, source, texture, flipH, flipV, x, y, usesPalette);
    }

    private addLibraryAsset(textures: Record<string, Texture> | undefined): void {
        if (!textures) return;

        for (const name in textures) {
            const texture = textures[name];

            if (!texture) continue;

            this._textures.set(GraphicAssetCollection.removeFileExtension(name), texture);
        }
    }

    private disposePaletteAssets(disposeAll: boolean = true): void {
        if (this._paletteAssetNames) {
            if (disposeAll || this._paletteAssetNames.length > GraphicAssetCollection.PALETTE_ASSET_DISPOSE_THRESHOLD) {
                for (const name of this._paletteAssetNames) this.disposeAsset(name);

                this._paletteAssetNames = [];
            }
        }
    }
}

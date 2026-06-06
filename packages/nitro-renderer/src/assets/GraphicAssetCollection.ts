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

    public define(data: IAssetData): void {
        const assets = data.assets;
        const palettes = data.palettes;

        if (assets) this.defineAssets(assets);

        if (palettes) this.definePalettes(palettes);
    }

    public getAssetWithPalette(name: string, paletteId: number): IGraphicAsset | undefined {
        const saveName = name + '@' + paletteId;

        let asset = this.getAsset(saveName);

        if (asset) return asset;

        asset = this.getAsset(name);

        if (!asset || !asset.texture || !asset.usesPalette) return undefined;

        const palette = this.getPalette(paletteId);

        if (!palette) return asset;

        const texture = palette.applyPalette(asset.texture);

        if (!texture) return asset;

        this._paletteAssetNames.push(saveName);

        return this.addAsset(
            saveName,
            texture,
            asset.x,
            asset.y,
            asset.flipH,
            asset.flipV,);
    }

    public getPaletteColors(paletteId: number): number[] {
        const palette = this.getPalette(paletteId);

        if (palette) return [palette.primaryColor, palette.secondaryColor];

        return [0, 0];
    }

    public addAsset(
        name: string,
        texture: Texture,
        x: number = 0,
        y: number = 0,
        flipH: boolean = false,
        flipV: boolean = false,
        usesPalette: boolean = false,
        replace: boolean = false
    ): IGraphicAsset | undefined {
        if (!name || !texture) return undefined;

        let asset = this._assets.get(name) as GraphicAsset;

        if (asset) {
            if (!replace) return undefined;

            this.disposeAsset(name);
        }

        asset = GraphicAsset.createAsset(name, name, texture, x, y, flipH, flipV, usesPalette);

        this._assets.set(name, asset);

        return asset;
    }

    public disposeAsset(name: string): void {
        const asset = this._assets.get(name);

        if (!asset || !this._assets.delete(name)) return;

        if (asset.texture) {

            const isSubTexture = asset.texture.frame.x !== 0 ||
                asset.texture.frame.y !== 0 ||
                asset.texture.frame.width !== asset.texture.source.width ||
                asset.texture.frame.height !== asset.texture.source.height;

            if (!isSubTexture) asset.texture.destroy(true);
        }

        asset.recycle();
    }

    public getAsset(name: string): IGraphicAsset | undefined {
        return this._assets.get(name);
    }

    public getTexture(name: string): Texture | undefined {
        return this._textures.get(name);
    }

    public getPalette(paletteId: number): IGraphicAssetPalette | undefined {
        return this._palettes.get(paletteId);
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
        for (const asset of assets) {
            const source = asset.source ?? asset.name;
            const x = -(asset.x || 0);
            const y = -(asset.y || 0);
            const flipH = asset.flipH ?? false;
            const flipV = asset.flipV ?? false;
            const usesPalette = asset.usesPalette ?? false;
            const texture = this.getTexture(source);

            if (!texture) continue;

            this._assets.set(asset.name, GraphicAsset.createAsset(asset.name, source, texture, x, y, flipH, flipV, usesPalette));
        }
    }

    private definePalettes(palettes: IAssetPalette[]): void {
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

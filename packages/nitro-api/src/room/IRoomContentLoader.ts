import type { Texture } from 'pixi.js';

import type { IGraphicAssetCollection } from '../asset';
import type { IEventDispatcher } from '../events';
import type { IFurnitureData } from '../session';
import type { IPetColorResult } from './IPetColorResult';
import type { IRoomContentListener } from './IRoomContentListener';

export interface IRoomContentLoader {
    init(): Promise<void>;
    processFurnitureData(furnitureData: IFurnitureData[]): void;
    downloadAsset(type: string): Promise<boolean>;
    isLoaderType(type: string): boolean;
    getCollection(name: string): IGraphicAssetCollection | undefined;
    getPlaceholderName(type: string): string;
    getCategoryForType(type: string): number;
    getFurnitureFloorNameForTypeId(typeId: number): string;
    getFurnitureWallNameForTypeId(typeId: number, extra?: number): string;
    getFurnitureFloorColorIndex(typeId: number): number;
    getFurnitureWallColorIndex(typeId: number): number;
    getImage(name: string): HTMLImageElement;
    getAssetIconUrl(type: string, colorIndex: string): string | undefined;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture, override?: boolean): boolean;
    getPetNameForType(type: number): string | undefined;
    downloadImage(id: number, type: string, param: string, events?: IEventDispatcher): boolean;
    getRoomObjectAdUrl(type: string): string;
    getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult | undefined;
    getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[];
    setIconListener(listener: IRoomContentListener): void;
    pets: { [index: string]: number };
}

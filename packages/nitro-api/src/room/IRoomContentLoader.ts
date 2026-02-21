import type { Texture } from 'pixi.js';

import type { IGraphicAssetCollection } from '../asset';
import type { IFurnitureData } from '../session';
import type { IEventDispatcher } from '../utils';
import type { IPetColorResult } from './IPetColorResult';
import type { IRoomContentListener } from './IRoomContentListener';
import type { IRoomObject } from './object/IRoomObject';

export interface IRoomContentLoader {
    init(): Promise<void>;
    processFurnitureData(furnitureData: IFurnitureData[]): void;
    downloadAsset(type: string): Promise<void>;
    isLoaderType(type: string): boolean;
    getCollection(name: string): IGraphicAssetCollection | undefined;
    getPlaceholderName(type: string): string;
    getCategoryForType(type: string): number;
    setRoomObjectRoomId(object: IRoomObject, roomId: string): void;
    getFurnitureFloorNameForTypeId(typeId: number): string;
    getFurnitureWallNameForTypeId(typeId: number, extra?: string): string;
    getFurnitureFloorColorIndex(typeId: number): number;
    getFurnitureWallColorIndex(typeId: number): number;
    getImage(name: string): HTMLImageElement;
    getAssetIconUrl(type: string, colorIndex: string): string | undefined;
    addAssetToCollection(collectionName: string, assetName: string, texture: Texture, override?: boolean): boolean;
    getPetNameForType(type: number): string;
    downloadImage(id: number, type: string, param: string, events?: IEventDispatcher): boolean;
    getRoomObjectAdUrl(type: string): string;
    getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult | undefined;
    getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[];
    setIconListener(listener: IRoomContentListener): void;
    pets: { [index: string]: number };
}

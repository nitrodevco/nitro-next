import type {
    IFurnitureData,
    IGraphicAssetCollection,
    IPetColorResult,
    IRoomContentListener,
    IRoomContentLoader,
    IRoomObject,
} from '@nitrodevco/nitro-api';
import {
    EventStore,
    FurnitureType,
    GetConfigValue,
    NitroLogger,
    RoomObjectCategory,
    RoomObjectUserType,
    RoomObjectVariable,
    RoomObjectVisualizationType,
} from '@nitrodevco/nitro-api';
import { RoomContentLoadedEvent } from '@nitrodevco/nitro-events';
import type { Texture } from 'pixi.js';

import { GetAssetManager } from '../assets';
import { PetColorResult } from './PetColorResult';

export class RoomContentLoader implements IRoomContentLoader {
    private static PLACE_HOLDER: string = 'place_holder';
    private static PLACE_HOLDER_WALL: string = 'place_holder_wall';
    private static PLACE_HOLDER_PET: string = 'place_holder_pet';
    private static PLACE_HOLDER_DEFAULT: string = RoomContentLoader.PLACE_HOLDER;
    private static ROOM: string = 'room';
    private static TILE_CURSOR: string = 'tile_cursor';
    private static SELECTION_ARROW: string = 'selection_arrow';

    public static MANDATORY_LIBRARIES: string[] = [
        RoomContentLoader.PLACE_HOLDER,
        RoomContentLoader.PLACE_HOLDER_WALL,
        RoomContentLoader.PLACE_HOLDER_PET,
        RoomContentLoader.ROOM,
        RoomContentLoader.TILE_CURSOR,
        RoomContentLoader.SELECTION_ARROW,
    ];

    private _iconListener: IRoomContentListener;
    private _images: Map<string, HTMLImageElement> = new Map();

    private _activeObjects: { [index: string]: number } = {};
    private _activeObjectTypes: Map<number, string> = new Map();
    private _activeObjectTypeIds: Map<string, number> = new Map();
    private _objectTypeAdUrls: Map<string, string> = new Map();
    private _wallItems: { [index: string]: number } = {};
    private _wallItemTypes: Map<number, string> = new Map();
    private _wallItemTypeIds: Map<string, number> = new Map();
    private _furniRevisions: Map<string, number> = new Map();
    private _pets: { [index: string]: number } = {};
    private _petColors: Map<number, Map<number, IPetColorResult>> = new Map();
    private _objectAliases: Map<string, string> = new Map();
    private _objectOriginalNames: Map<string, string> = new Map();

    private _pendingContentTypes: string[] = [];

    public async init(): Promise<void> {
        this.processFurnitureData(GetSessionDataManager().getAllFurnitureData());

        for (const [index, name] of GetConfigValue<string[]>('renderer.petTypes').entries()) this._pets[name] = index;

        await Promise.all(RoomContentLoader.MANDATORY_LIBRARIES.map(value => this.downloadAsset(value)));
    }

    public processFurnitureData(furnitureData: IFurnitureData[]): void {
        if (!furnitureData) return;

        for (const furniture of furnitureData) {
            if (!furniture) continue;

            const id = furniture.id;

            let className = furniture.className;

            if (furniture.hasIndexedColor) className = className + '*' + furniture.colorIndex;

            const revision = furniture.revision;
            const adUrl = furniture.adUrl;

            if (adUrl && adUrl.length > 0) this._objectTypeAdUrls.set(className, adUrl);

            let name = furniture.className;

            if (furniture.type === FurnitureType.FLOOR) {
                this._activeObjectTypes.set(id, className);
                this._activeObjectTypeIds.set(className, id);

                if (!this._activeObjects[name]) this._activeObjects[name] = 1;
            } else if (furniture.type === FurnitureType.WALL) {
                if (name === 'post.it') {
                    className = 'post_it';
                    name = 'post_it';
                }

                if (name === 'post.it.vd') {
                    className = 'post_it_vd';
                    name = 'post_id_vd';
                }

                this._wallItemTypes.set(id, className);
                this._wallItemTypeIds.set(className, id);

                if (!this._wallItems[name]) this._wallItems[name] = 1;
            }

            const existingRevision = this._furniRevisions.get(name);

            if (existingRevision && revision > existingRevision) {
                this._furniRevisions.delete(name);
                this._furniRevisions.set(name, revision);
            }
        }
    }

    public getFurnitureFloorNameForTypeId(typeId: number): string {
        return this.removeColorIndex(this._activeObjectTypes.get(typeId) ?? '');
    }

    public getFurnitureWallNameForTypeId(typeId: number, extra: string = ''): string {
        let type = this._wallItemTypes.get(typeId);

        if (type === 'poster' && extra) type = type + extra;

        return this.removeColorIndex(type ?? '');
    }

    public getFurnitureFloorColorIndex(typeId: number): number {
        return this.getColorIndexFromName(this._activeObjectTypes.get(typeId) ?? '');
    }

    public getFurnitureWallColorIndex(typeId: number): number {
        return this.getColorIndexFromName(this._wallItemTypes.get(typeId) ?? '');
    }

    private getColorIndexFromName(name: string): number {
        const index = name.indexOf('*');

        if (index === -1) return 0;

        return parseInt(name.substr(index + 1));
    }

    private removeColorIndex(name: string): string {
        const index = name.indexOf('*');

        if (index === -1) return name;

        return name.substr(0, index);
    }

    public getRoomObjectAdUrl(type: string): string {
        return this._objectTypeAdUrls.get(type) ?? '';
    }

    public getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult | undefined {
        return this._petColors.get(petIndex)?.get(paletteIndex);
    }

    public getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[] {
        const colorResults = this._petColors.get(petIndex);
        const results: IPetColorResult[] = [];

        if (colorResults) {
            for (const result of colorResults.values()) {
                if (result.tag === tagName) results.push(result);
            }
        }

        return results;
    }

    public getCollection(name: string): IGraphicAssetCollection | undefined {
        return GetAssetManager().getCollection(name);
    }

    public getImage(name: string): HTMLImageElement {
        const image = new Image();
        const cached = this._images.get(name);

        if (cached) image.src = cached.src;

        return image;
    }

    public addAssetToCollection(
        collectionName: string,
        assetName: string,
        texture: Texture,
        override: boolean = true,
    ): boolean {
        return GetAssetManager().addAssetToCollection(collectionName, assetName, texture, override);
    }

    public getPlaceholderName(type: string): string {
        const category = this.getCategoryForType(type);

        switch (category) {
            case RoomObjectCategory.FLOOR:
                return RoomContentLoader.PLACE_HOLDER;
            case RoomObjectCategory.WALL:
                return RoomContentLoader.PLACE_HOLDER_WALL;
            default:
                if (this._pets[type] !== undefined) return RoomContentLoader.PLACE_HOLDER_PET;

                return RoomContentLoader.PLACE_HOLDER_DEFAULT;
        }
    }

    public getCategoryForType(type: string): number {
        if (!type) return RoomObjectCategory.MINIMUM;

        if (this._activeObjects[type] !== undefined) return RoomObjectCategory.FLOOR;

        if (this._wallItems[type] !== undefined) return RoomObjectCategory.WALL;

        if (this._pets[type] !== undefined) return RoomObjectCategory.UNIT;

        if (type.indexOf('poster') === 0) return RoomObjectCategory.WALL;

        if (type === 'room') return RoomObjectCategory.ROOM;

        if (type === RoomObjectUserType.USER) return RoomObjectCategory.UNIT;

        if (type === RoomObjectUserType.PET) return RoomObjectCategory.UNIT;

        if (type === RoomObjectUserType.BOT) return RoomObjectCategory.UNIT;

        if (type === RoomObjectUserType.RENTABLE_BOT) return RoomObjectCategory.UNIT;

        if (type === RoomContentLoader.TILE_CURSOR || type === RoomContentLoader.SELECTION_ARROW)
            return RoomObjectCategory.CURSOR;

        return RoomObjectCategory.MINIMUM;
    }

    public getPetNameForType(type: number): string {
        return GetConfigValue<string[]>('renderer.petTypes')[type] || null;
    }

    public isLoaderType(type: string): boolean {
        type = RoomObjectUserType.getRealType(type);

        if (type === RoomObjectVisualizationType.USER) return false;

        return true;
    }

    public downloadImage(id: number, type: string, param: string): boolean {
        let typeName: string = '';
        let assetUrls: string[] = [];

        if (type && type.indexOf(',') >= 0) {
            typeName = type;
            type = typeName.split(',')[0];
        }

        if (typeName && typeName.length > 0) {
            assetUrls = this.getAssetUrls(typeName, param, true);
        } else {
            assetUrls = this.getAssetUrls(type, param, true);
        }

        if (assetUrls && assetUrls.length) {
            const url = assetUrls[0];

            const image = new Image();

            image.src = url;

            image.onload = () => {
                image.onerror = null;

                this._images.set([type, param].join('_'), image);

                this._iconListener.onRoomContentLoaded(id, [type, param].join('_'), true);
            };

            image.onerror = () => {
                image.onload = null;

                NitroLogger.error('Failed to download asset', url);

                this._iconListener.onRoomContentLoaded(id, [type, param].join('_'), false);
            };

            return true;
        }

        return false;
    }

    public async downloadAsset(type: string): Promise<void> {
        const assetUrl: string = this.getAssetUrls(type)?.[0];

        if (!assetUrl || !assetUrl.length) return;

        if (this._pendingContentTypes.indexOf(type) >= 0) return;

        this._pendingContentTypes.push(type);

        if (!(await GetAssetManager().downloadAsset(assetUrl))) {
            EventStore.getState().emit(new RoomContentLoadedEvent(RoomContentLoadedEvent.RCLE_FAILURE, type));

            return;
        }

        const petIndex = this._pets[type];
        const collection = this.getCollection(type);

        if (petIndex && collection) {
            const keys = collection.getPaletteNames();
            const palettes: Map<number, IPetColorResult> = new Map();

            for (const key of keys) {
                const palette = collection.getPalette(key);

                if (palette && collection.data.palettes) {
                    const paletteData = collection.data.palettes[key];

                    const primaryColor = palette.primaryColor;
                    const secondaryColor = palette.secondaryColor;
                    const breed = paletteData.breed !== undefined ? paletteData.breed : 0;
                    const tag = paletteData.colorTag !== undefined ? paletteData.colorTag : -1;
                    const master = paletteData.master !== undefined ? paletteData.master : false;
                    const layerTags = paletteData.tags !== undefined ? paletteData.tags : [];

                    palettes.set(
                        parseInt(key),
                        new PetColorResult(primaryColor, secondaryColor, breed, tag, key, master, layerTags),
                    );
                }
            }

            this._petColors.set(petIndex, palettes);
        }

        EventStore.getState().emit(new RoomContentLoadedEvent(RoomContentLoadedEvent.RCLE_SUCCESS, type));
    }

    public getAssetAliasName(name: string): string {
        const existing = this._objectAliases.get(name);

        if (!existing) return name;

        return existing;
    }

    public setAssetAliasName(name: string, originalName: string): void {
        this._objectAliases.set(name, originalName);
        this._objectOriginalNames.set(originalName, name);
    }

    public getAssetUrls(type: string, param: string = '', icon: boolean = false): string[] {
        switch (type) {
            case RoomContentLoader.PLACE_HOLDER:
                return [this.getAssetUrlWithGenericBase(RoomContentLoader.PLACE_HOLDER)];
            case RoomContentLoader.PLACE_HOLDER_WALL:
                return [this.getAssetUrlWithGenericBase(RoomContentLoader.PLACE_HOLDER_WALL)];
            case RoomContentLoader.PLACE_HOLDER_PET:
                return [this.getAssetUrlWithGenericBase(RoomContentLoader.PLACE_HOLDER_PET)];
            case RoomContentLoader.ROOM:
                return [this.getAssetUrlWithGenericBase('room')];
            case RoomContentLoader.TILE_CURSOR:
                return [this.getAssetUrlWithGenericBase(RoomContentLoader.TILE_CURSOR)];
            case RoomContentLoader.SELECTION_ARROW:
                return [this.getAssetUrlWithGenericBase(RoomContentLoader.SELECTION_ARROW)];
            default: {
                const category = this.getCategoryForType(type);

                if (category === RoomObjectCategory.FLOOR || category === RoomObjectCategory.WALL) {
                    const name = this.getAssetAliasName(type);

                    let assetUrl = icon ? this.getAssetUrlWithFurniIconBase(name) : this.getAssetUrlWithFurniBase(type);

                    if (icon) {
                        const active = param && param !== '' && this._activeObjectTypeIds.has(name + '*' + param);

                        assetUrl = assetUrl.replace(/%param%/gi, active ? '_' + param : '');
                    }

                    return [assetUrl];
                }

                if (category === RoomObjectCategory.UNIT) {
                    return [this.getAssetUrlWithPetBase(type)];
                }
            }
        }

        return [];
    }

    public getAssetIconUrl(type: string, colorIndex: string): string | undefined {
        let assetName: string = '';
        let assetUrls: string[] = [];

        if (type && type.indexOf(',') >= 0) {
            assetName = type;

            type = assetName.split(',')[0];
        }

        if (assetName && assetName.length > 0) {
            assetUrls = this.getAssetUrls(assetName, colorIndex, true);
        } else {
            assetUrls = this.getAssetUrls(type, colorIndex, true);
        }

        if (assetUrls && assetUrls.length) return assetUrls[0];

        return undefined;
    }

    private getAssetUrlWithGenericBase(assetName: string): string {
        return GetConfigValue<string>('asset.urls.generic').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithFurniBase(assetName: string): string {
        return GetConfigValue<string>('asset.urls.furni').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithFurniIconBase(assetName: string): string {
        return GetConfigValue<string>('asset.urls.icons.furni').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithPetBase(assetName: string): string {
        return GetConfigValue<string>('asset.urls.pet').replace(/%libname%/gi, assetName);
    }

    public setRoomObjectRoomId(object: IRoomObject, roomId: string): void {
        object.model.setValue(RoomObjectVariable.OBJECT_ROOM_ID, roomId);
    }

    public setIconListener(listener: IRoomContentListener): void {
        this._iconListener = listener;
    }

    public get pets(): { [index: string]: number } {
        return this._pets;
    }
}

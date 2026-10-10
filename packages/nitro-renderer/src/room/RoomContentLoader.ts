import {
    FurnitureTypeEnum,
    GetConfigValue, IEventDispatcher,
    IFurnitureData,
    IGraphicAsset,
    IGraphicAssetCollection,
    IPetColorResult,
    IRoomContentListener,
    IRoomContentLoader,
    NitroLogger,
    RoomContentLoadedEvent, RoomObjectCategoryEnum,
    RoomObjectUserType,
    RoomObjectUserTypeName,
    RoomObjectUserTypeUtils } from '@nitrodevco/nitro-api';
import { Texture, TextureSource } from 'pixi.js';

import { GetAssetManager } from '../assets';
import { GetTickerTime, LoadMetrics, TextureUtils } from '../utils';
import { chooseFurnitureDownloadConcurrency, readDeviceHints } from './furnitureDownloadConcurrency';
import { GetRoomEngine } from './GetRoomEngine';
import { PetColorResult } from './PetColorResult';

export class RoomContentLoader implements IRoomContentLoader {
    public static ROOM_CONTENT: string = 'room' as const;
    public static TILE_CURSOR: string = 'tile_cursor' as const;
    public static SELECTION_ARROW: string = 'selection_arrow' as const;
    public static PLACE_HOLDER: string = 'place_holder' as const;
    public static PLACE_HOLDER_WALL: string = 'wall_place_holder' as const;
    public static PLACE_HOLDER_PET: string = 'pet_place_holder' as const;
    public static PLACE_HOLDER_DEFAULT: string = RoomContentLoader.PLACE_HOLDER;
    public static MANDATORY_LIBRARIES: string[] = [
        RoomContentLoader.ROOM_CONTENT,
        RoomContentLoader.TILE_CURSOR,
        RoomContentLoader.SELECTION_ARROW,
        RoomContentLoader.PLACE_HOLDER,
        RoomContentLoader.PLACE_HOLDER_WALL,
        RoomContentLoader.PLACE_HOLDER_PET,
    ];

    /** Flash `purge`: how long a collection nothing references is kept before it is released. */
    public static PURGE_IDLE_MS: number = 20000;
    /**
     * How many furniture downloads run at once is `maxConcurrentDownloads`; the rest wait their
     * turn. A large room asks for hundreds of types together, and decoding them all at once - each
     * sheet's bitmap and GPU upload at the same moment - is what runs a phone's tab out of memory.
     * A slot is held until the sheet is decoded and built, so the number is also how many sheets
     * are in memory at once.
     */
    /**
     * Furniture that changes how the room itself looks - the dimmers and the background toners -
     * skips the queue: its logic, and so the room's colour, only applies once its asset is in.
     */
    public static PRIORITY_FURNITURE_PATTERN: RegExp = /dimmer|roombg|bg_color/i;

    private _iconListener: IRoomContentListener;
    private _images: Map<string, HTMLImageElement> = new Map();
    private _listeners: Map<string, Set<IEventDispatcher>> = new Map();
    private _downloads: Map<string, Promise<boolean>> = new Map();
    /** Furniture downloads waiting for a slot, oldest first. */
    private _downloadQueue: { type: string; start: () => void; cancel: () => void }[] = [];
    private _activeQueuedDownloads: number = 0;
    private _maxConcurrentDownloads: number | undefined = undefined;
    /** The types a `downloadAssetAsync` caller waits on: never dropped from the queue. */
    private _awaitedTypes: Set<string> = new Set();
    /** The types this loader downloaded - the collections `purge` may release (Flash's own collection map). */
    private _downloadedTypes: Set<string> = new Set();

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
    /** Flash's `_petLayers`: per pet type, per visualization size, each tagged layer's id. */
    private _petLayers: Map<number, Map<number, Map<string, number>>> = new Map();
    private _objectAliases: Map<string, string> = new Map();
    private _objectOriginalNames: Map<string, string> = new Map();

    public async init(): Promise<void> {
        const petTypes = GetConfigValue<string[]>('renderer.petTypes') ?? [];

        if (petTypes) for (const [ index, name ] of petTypes.entries()) this._pets[name] = index;

        await Promise.all(RoomContentLoader.MANDATORY_LIBRARIES.map(value => this.downloadAssetAsync(value)));
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

            if (furniture.type === FurnitureTypeEnum.Floor) {
                this._activeObjectTypes.set(id, className);
                this._activeObjectTypeIds.set(className, id);

                if (!this._activeObjects[name]) this._activeObjects[name] = 1;
            } else if (furniture.type === FurnitureTypeEnum.Wall) {
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

    public getFurnitureFloorTypeIdForName(name: string): number {
        return this._activeObjectTypeIds.get(name) ?? -1;
    }

    public getFurnitureWallNameForTypeId(typeId: number, extra?: string): string {
        let type = this._wallItemTypes.get(typeId);

        // `RoomContentLoader.getWallItemType`: the poster id is appended as it is - `poster5`, the asset each
        // poster is. `poster 5` is its productdata code, a different thing.
        if (type === 'poster' && extra) type = `${type}${extra}`;

        return this.removeColorIndex(type ?? '');
    }

    public getFurnitureWallTypeIdForName(name: string): number {
        return this._wallItemTypeIds.get(name) ?? -1;
    }

    /**
     * What Flash's `FurniIconImageManager` read from the furni data to name and fetch an icon: the
     * class name, and the colour index when the furni has an indexed colour (`undefined` when it
     * has not). `undefined` for a type id the furni data does not know.
     */
    public getFurnitureIconData(wallItem: boolean, typeId: number): { className: string; colorIndex: number | undefined } | undefined {
        const type = wallItem ? this._wallItemTypes.get(typeId) : this._activeObjectTypes.get(typeId);

        if (type === undefined) return undefined;

        const index = type.indexOf('*');

        if (index === -1) return { className: type, colorIndex: undefined };

        return { className: type.substring(0, index), colorIndex: parseInt(type.substring(index + 1)) };
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

    /** Flash `RoomContentLoader.getPetLayerIdForTag`: the id of the layer tagged `tagName` in the pet's visualization of `size`, -1 for none. */
    public getPetLayerIdForTag(petIndex: number, tagName: string, size: number = 64): number {
        return this._petLayers.get(petIndex)?.get(size)?.get(tagName) ?? -1;
    }

    /** Flash `RoomContentLoader.getPetDefaultPalette`: the master palette whose layer tags include `tagName`. */
    public getPetDefaultPalette(petIndex: number, tagName: string): IPetColorResult | undefined {
        const colorResults = this._petColors.get(petIndex);

        if (colorResults) {
            for (const result of colorResults.values()) {
                if (result.layerTags.includes(tagName) && result.isMaster) return result;
            }
        }

        return undefined;
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
    ): IGraphicAsset | undefined {
        return GetAssetManager().addAssetToCollection(collectionName, assetName, texture);
    }

    public getPlaceholderName(type: string): string {
        const category = this.getCategoryForType(type);

        switch (category) {
            case RoomObjectCategoryEnum.Floor:
                return RoomContentLoader.PLACE_HOLDER;
            case RoomObjectCategoryEnum.Wall:
                return RoomContentLoader.PLACE_HOLDER_WALL;
            default:
                if (this._pets[type] !== undefined) return RoomContentLoader.PLACE_HOLDER_PET;

                return RoomContentLoader.PLACE_HOLDER_DEFAULT;
        }
    }

    public getCategoryForType(type: string): RoomObjectCategoryEnum {
        if (!type) return RoomObjectCategoryEnum.Minimum;

        if (this._activeObjects[type] !== undefined) return RoomObjectCategoryEnum.Floor;

        if (this._wallItems[type] !== undefined) return RoomObjectCategoryEnum.Wall;

        if (this._pets[type] !== undefined) return RoomObjectCategoryEnum.Unit;

        if (type.indexOf('poster') === 0) return RoomObjectCategoryEnum.Wall;

        if (type === 'room') return RoomObjectCategoryEnum.Room;

        if (type === RoomObjectUserTypeName.User) return RoomObjectCategoryEnum.Unit;

        if (type === RoomObjectUserTypeName.Pet) return RoomObjectCategoryEnum.Unit;

        if (type === RoomObjectUserTypeName.Bot) return RoomObjectCategoryEnum.Unit;

        if (type === RoomObjectUserTypeName.RentableBot) return RoomObjectCategoryEnum.Unit;

        if (type === RoomContentLoader.TILE_CURSOR || type === RoomContentLoader.SELECTION_ARROW)
            return RoomObjectCategoryEnum.Cursor;

        return RoomObjectCategoryEnum.Minimum;
    }

    public getPetNameForType(type: number): string | undefined {
        return GetConfigValue<string[]>('renderer.petTypes')?.[type] ?? undefined;
    }

    public isLoaderType(type: string): boolean {
        if (RoomObjectUserTypeUtils.getAvatarRealTypeByName(type) === RoomObjectUserType.User) return false;

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

                this._images.set([ type, param ].join('_'), image);

                this._iconListener.onRoomContentLoaded(id, [ type, param ].join('_'), true);
            };

            image.onerror = () => {
                image.onload = null;

                NitroLogger.error('Failed to download asset', url);

                this._iconListener.onRoomContentLoaded(id, [ type, param ].join('_'), false);
            };

            return true;
        }

        return false;
    }

    public downloadAsset(type: string, events: IEventDispatcher): void {
        if (this.getCollection(type)) {
            events.dispatchEvent(new RoomContentLoadedEvent(RoomContentLoadedEvent.RCLE_SUCCESS, type));

            return;
        }

        let listeners = this._listeners.get(type);

        if (!listeners) {
            listeners = new Set();

            this._listeners.set(type, listeners);
        }

        listeners.add(events);

        void this.download(type).then((flag) => {
            const waiting = this._listeners.get(type);

            this._listeners.delete(type);

            const status = flag ? RoomContentLoadedEvent.RCLE_SUCCESS : RoomContentLoadedEvent.RCLE_FAILURE;

            for (const dispatcher of waiting ?? []) dispatcher.dispatchEvent(new RoomContentLoadedEvent(status, type));

            GetRoomEngine().initalizeTemporaryObjectsByType(type, flag);
        });
    }

    public async downloadAssetAsync(type: string): Promise<boolean> {
        if (this.getCollection(type)) return true;

        this._awaitedTypes.add(type);

        try {
            return await this.download(type);
        } finally {
            this._awaitedTypes.delete(type);
        }
    }

    /**
     * A disposed room no longer waits for its content: it leaves every listener set, and a queued
     * download (not yet started) nothing else waits for is dropped - leaving a big room does not
     * go on loading its furniture alongside the next one.
     */
    public cancelDownloads(events: IEventDispatcher): void {
        for (const [ type, listeners ] of this._listeners) {
            listeners.delete(events);

            if (!listeners.size) this._listeners.delete(type);
        }

        this._downloadQueue = this._downloadQueue.filter((entry) => {
            if (this._listeners.has(entry.type) || this._awaitedTypes.has(entry.type)) return true;

            entry.cancel();

            return false;
        });
    }

    /** Whether a type's download waits for a slot: furniture, but not the kind that changes the room. */
    private isQueuedType(type: string): boolean {
        if (RoomContentLoader.MANDATORY_LIBRARIES.includes(type) || (this._pets[type] !== undefined)) return false;

        if ((this._activeObjects[type] === undefined) && (this._wallItems[type] === undefined)) return false;

        return !RoomContentLoader.PRIORITY_FURNITURE_PATTERN.test(type);
    }

    /**
     * How many furniture downloads run at once: the hotel's `furniture.download.concurrency` if it
     * sets one, else 8 on a desktop and 4 where memory is short (`furnitureDownloadConcurrency`).
     * Chosen once, when the first download is queued, since a device does not change under a page.
     */
    public get maxConcurrentDownloads(): number {
        if (this._maxConcurrentDownloads === undefined) {
            this._maxConcurrentDownloads = chooseFurnitureDownloadConcurrency(GetConfigValue<number>('furniture.download.concurrency'), readDeviceHints());

            LoadMetrics.event('download-concurrency', { slots: this._maxConcurrentDownloads, ...readDeviceHints() });
        }

        return this._maxConcurrentDownloads;
    }

    /** Starts queued downloads while a slot is free. */
    private pumpDownloadQueue(): void {
        while ((this._activeQueuedDownloads < this.maxConcurrentDownloads) && this._downloadQueue.length) {
            this._downloadQueue.shift()?.start();
        }
    }

    private download(type: string): Promise<boolean> {
        const existing = this._downloads.get(type);

        if (existing) return existing;

        const assetUrl: string = this.getAssetUrls(type)?.[0];

        if (!assetUrl || !assetUrl.length) return Promise.resolve(false);

        const queued = this.isQueuedType(type);
        const furniture = queued || RoomContentLoader.PRIORITY_FURNITURE_PATTERN.test(type);

        LoadMetrics.begin(assetUrl, type);

        const fetchAsset = (): Promise<boolean> => {
            LoadMetrics.mark(assetUrl, 'slot');

            return GetAssetManager().downloadAsset(assetUrl);
        };
        // A queued type takes a slot when one is free; dropped from the queue, it settles as a failure.
        const downloaded: Promise<boolean> = queued
            ? new Promise<boolean>((resolve) => {
                    this._downloadQueue.push({
                        type,
                        start: () => {
                            this._activeQueuedDownloads++;

                            fetchAsset().then(resolve, () => resolve(false)).finally(() => {
                                this._activeQueuedDownloads--;
                                this.pumpDownloadQueue();
                            });
                        },
                        cancel: () => resolve(false),
                    });

                    this.pumpDownloadQueue();
                })
            : fetchAsset();

        const promise = downloaded
            .then((flag) => {
                if (!flag) return false;

                this._downloadedTypes.add(type);

                if (furniture) this.makeSheetsGpuResident(type);

                const petIndex = this._pets[type];
                const collection = this.getCollection(type);

                // Type 0 (the dog) is a pet too: Flash keys both tables by the type, whatever it is.
                if ((petIndex !== undefined) && collection && collection.data.visualizations) {
                    const layers: Map<number, Map<string, number>> = new Map();

                    for (const visualization of collection.data.visualizations) {
                        const tagged: Map<string, number> = new Map();

                        for (const layer of visualization.layers ?? []) {
                            if (layer.tag !== undefined) tagged.set(layer.tag, layer.id);
                        }

                        layers.set(visualization.size ?? 0, tagged);
                    }

                    this._petLayers.set(petIndex, layers);
                }

                if ((petIndex !== undefined) && collection && collection.data.palettes) {
                    const palettes: Map<number, IPetColorResult> = new Map();

                    for (const palette of collection.data.palettes) {
                        const paletteData = collection.palettes.get(palette.id);

                        if (!paletteData) continue;

                        palettes.set(
                            palette.id,
                            new PetColorResult(paletteData.primaryColor, paletteData.secondaryColor, palette.breed ?? 0, palette.colorTag ?? -1, palette.id, palette.master ?? false, palette.tags ?? []),
                        );
                    }

                    this._petColors.set(petIndex, palettes);
                }

                return true;
            })
            .catch((err) => {
                NitroLogger.error('Failed to download asset', assetUrl, err);

                return false;
            })
            .finally(() => this._downloads.delete(type));

        this._downloads.set(type, promise);

        return promise;
    }

    /**
     * Flash `RoomContentLoader.purge`: every collection this loader downloaded that nothing has
     * referenced for `PURGE_IDLE_MS` - no room object draws with it, and none has let go of it
     * recently - is removed with its textures, and the next object of the type downloads it again
     * (`downloadAsset` finds no collection). Flash spares the placeholders; the port spares every
     * mandatory library it loads at `init`, which it never asks for again.
     */
    public purge(): void {
        const now = GetTickerTime();
        const purged: string[] = [];

        for (const type of [ ...this._downloadedTypes ]) {
            if (RoomContentLoader.MANDATORY_LIBRARIES.includes(type) || this._downloads.has(type)) continue;

            const collection = this.getCollection(type);

            if (!collection) {
                this._downloadedTypes.delete(type);

                continue;
            }

            if ((collection.referenceCount >= 1) || ((now - collection.lastReferenceTimestamp) < RoomContentLoader.PURGE_IDLE_MS)) continue;

            GetAssetManager().removeCollection(type);

            this._downloadedTypes.delete(type);

            purged.push(type);
        }

        if (purged.length) LoadMetrics.event('purge', { count: purged.length, types: purged.slice(0, 30) });
    }

    /**
     * With `furniture.sheets.gpu_resident` on, a furniture collection's sheets are uploaded to the
     * GPU as soon as they are in and their decoded bitmaps closed (`TextureUtils.makeGpuResident`):
     * each sheet is then held once, on the GPU, rather than as a bitmap too until its first draw.
     * Off by default - a lost GPU context cannot restore such a sheet until the collection is
     * purged and downloaded again.
     */
    private makeSheetsGpuResident(type: string): void {
        if (GetConfigValue<boolean>('furniture.sheets.gpu_resident') !== true) return;

        const collection = this.getCollection(type);

        if (!collection) return;

        const sources = new Set<TextureSource>();

        if (collection.textureSource) sources.add(collection.textureSource);

        for (const texture of collection.textures.values()) {
            if (texture?.source) sources.add(texture.source);
        }

        for (const source of sources) TextureUtils.makeGpuResident(source);
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
                return [ this.getAssetUrlWithGenericBase('PlaceHolderFurniture') ];
            case RoomContentLoader.PLACE_HOLDER_WALL:
                return [ this.getAssetUrlWithGenericBase('PlaceHolderWallItem') ];
            case RoomContentLoader.PLACE_HOLDER_PET:
                return [ this.getAssetUrlWithGenericBase('PlaceHolderPet') ];
            case RoomContentLoader.ROOM_CONTENT:
                return [ this.getAssetUrlWithGenericBase('HabboRoomContent') ];
            case RoomContentLoader.TILE_CURSOR:
                return [ this.getAssetUrlWithGenericBase('TileCursor') ];
            case RoomContentLoader.SELECTION_ARROW:
                return [ this.getAssetUrlWithGenericBase('SelectionArrow') ];
            default: {
                const category = this.getCategoryForType(type);

                if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                    const name = this.getAssetAliasName(type);

                    let assetUrl = icon ? this.getAssetUrlWithFurniIconBase(name) : this.getAssetUrlWithFurniBase(type);

                    if (icon) {
                        const active = param && param !== '' && this._activeObjectTypeIds.has(name + '*' + param);

                        assetUrl = assetUrl.replace(/%param%/gi, active ? '_' + param : '');
                    }

                    return [ assetUrl ];
                }

                if (category === RoomObjectCategoryEnum.Unit) {
                    return [ this.getAssetUrlWithPetBase(type) ];
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
        return (GetConfigValue<string>('asset.bundles.room') ?? '').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithFurniBase(assetName: string): string {
        return (GetConfigValue<string>('asset.bundles.furni') ?? '').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithFurniIconBase(assetName: string): string {
        return (GetConfigValue<string>('asset.urls.icons.furni') ?? '').replace(/%libname%/gi, assetName);
    }

    public getAssetUrlWithPetBase(assetName: string): string {
        return (GetConfigValue<string>('asset.bundles.pets') ?? '').replace(/%libname%/gi, assetName);
    }

    public setIconListener(listener: IRoomContentListener): void {
        this._iconListener = listener;
    }

    public get pets(): { [index: string]: number } {
        return this._pets;
    }
}

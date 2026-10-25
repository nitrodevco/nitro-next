import { IRoomObjectController, NitroLogger } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { TextureUtils } from '#renderer/utils';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { ObjectFurniIconUpdateMessage } from './messages';

/**
 * Port of Flash `FurniIconImageManager` (session) together with the room engine's end of it -
 * `RoomEngine.requestFurniIconAsset`, `addFurniIconGraphicAssets` and `onFurniIconLoaded`: a furni
 * that wants another furni's icon (the furni chest, for what it holds) asks by type id through
 * `RoomObjectFurniIconAssetEvent`; the icon is fetched once, kept as `furni_icon_<class><extra>`
 * (plus `_<colour>` for an indexed colour), registered on the asking furni's own asset collection
 * and its name handed back to the furni's logic (`ObjectFurniIconUpdateMessage`) - at once when
 * it is already here, `loading_icon` first and the real name later when it is not.
 *
 * Flash built the url from `flash.dynamic.download.url` and
 * `flash.dynamic.icon.download.name.template` (`%typeid%%param%_icon.png`); this client serves
 * icons from `asset.urls.icons.furni`, whose `%libname%` / `%param%` are the same two parts.
 */
export class FurniIconImageManager {
    private static ASSET_PREFIX: string = 'furni_icon_';
    private static LOADING_ICON: string = 'loading_icon';

    private _textures: Map<string, Texture> = new Map();
    private _loadingInfo: Set<string> = new Set();
    private _listeners: Map<string, IRoomObjectController[]> = new Map();

    /** Flash `RoomEngine.furniIconListenerKey`. */
    public static furniIconListenerKey(wallItem: boolean, typeId: number, extra: string): string {
        return (wallItem ? '1' : '0') + '-' + typeId + '-' + extra;
    }

    private getClassName(wallItem: boolean, typeId: number, extra: string): string {
        const data = GetRoomContentLoader().getFurnitureIconData(wallItem, typeId);

        if (!data) return String(wallItem) + '_' + typeId + '_' + extra;

        return data.className + extra;
    }

    private getAssetName(wallItem: boolean, typeId: number, extra: string): string {
        let name = FurniIconImageManager.ASSET_PREFIX + this.getClassName(wallItem, typeId, extra);
        const data = GetRoomContentLoader().getFurnitureIconData(wallItem, typeId);

        if (data && data.colorIndex !== undefined) name += '_' + data.colorIndex;

        return name;
    }

    /** Flash `getFurniIconImageAssetName`: the icon's name once it is here; asks for it and says nothing until then. */
    public getFurniIconImageAssetName(wallItem: boolean, typeId: number, extra: string): string | undefined {
        const name = this.getAssetName(wallItem, typeId, extra);

        if (this._textures.has(name)) return name;

        this.loadFurniIconImage(wallItem, typeId, extra);

        return undefined;
    }

    public getFurniIconImage(wallItem: boolean, typeId: number, extra: string): Texture | undefined {
        return this._textures.get(this.getAssetName(wallItem, typeId, extra));
    }

    /** Flash `getFurniIconImageInternal`: one download per icon; a type the furni data does not know is never fetched. */
    private loadFurniIconImage(wallItem: boolean, typeId: number, extra: string): void {
        const name = this.getAssetName(wallItem, typeId, extra);

        if (this._loadingInfo.has(name)) return;

        const data = GetRoomContentLoader().getFurnitureIconData(wallItem, typeId);

        if (!data) return;

        const url = GetRoomContentLoader().getAssetUrlWithFurniIconBase(data.className + extra)
            .replace(/%param%/gi, (data.colorIndex !== undefined) ? '_' + data.colorIndex : '');

        if (!url) return;

        this._loadingInfo.add(name);

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

                return response.blob();
            })
            .then(blob => TextureUtils.textureFromEncodedBytes(blob, 'image/png', name))
            .then((texture) => {
                if (!this._loadingInfo.delete(name)) return;

                this._textures.set(name, texture);

                this.onFurniIconLoaded(name, wallItem, typeId, extra);
            })
            .catch((error) => {
                this._loadingInfo.delete(name);
                // Nothing will ever answer them: holding on kept the furni - and their rooms - alive.
                this._listeners.delete(FurniIconImageManager.furniIconListenerKey(wallItem, typeId, extra));

                NitroLogger.warn('Failed to load furni icon', url, error);
            });
    }

    /**
     * Flash `RoomEngine.requestFurniIconAsset`: registers the icon on `object` and tells its logic
     * the name, or tells it `loading_icon` and waits for the download.
     */
    public requestFurniIconAsset(object: IRoomObjectController, wallItem: boolean, typeId: number, extra: string): void {
        if (!object || !object.logic) return;

        let assetName = this.getFurniIconImageAssetName(wallItem, typeId, extra);

        if (!assetName) {
            assetName = FurniIconImageManager.LOADING_ICON;

            const key = FurniIconImageManager.furniIconListenerKey(wallItem, typeId, extra);
            const listeners = this._listeners.get(key) ?? [];

            listeners.push(object);

            this._listeners.set(key, listeners);
        } else {
            this.addFurniIconGraphicAssets(object, wallItem, typeId, extra);
        }

        object.logic.processUpdateMessage(new ObjectFurniIconUpdateMessage(assetName, wallItem, typeId, extra));
    }

    /**
     * Flash `addFurniIconGraphicAssets`: onto the collection of the object's type, without
     * replacing one already there - the texture is shared by every collection that holds it, and
     * a replace would destroy it under the others.
     */
    private addFurniIconGraphicAssets(object: IRoomObjectController, wallItem: boolean, typeId: number, extra: string): void {
        const name = this.getAssetName(wallItem, typeId, extra);
        const texture = this._textures.get(name);
        const collection = GetRoomContentLoader().getCollection(object.type);

        if (!texture || !collection || collection.getAsset(name)) return;

        collection.addAsset(name, texture, 0, 0, false, false, false, false);
    }

    private onFurniIconLoaded(assetName: string, wallItem: boolean, typeId: number, extra: string): void {
        const key = FurniIconImageManager.furniIconListenerKey(wallItem, typeId, extra);
        const listeners = this._listeners.get(key);

        if (!listeners) {
            NitroLogger.log('Could not find matching objects for furni icon asset request ' + key);

            return;
        }

        this._listeners.delete(key);

        for (const object of listeners) {
            // The furni may have gone while the icon downloaded.
            if (!object.logic) continue;

            this.addFurniIconGraphicAssets(object, wallItem, typeId, extra);

            object.logic.processUpdateMessage(new ObjectFurniIconUpdateMessage(assetName, wallItem, typeId, extra));
        }
    }
}

const furniIconImageManager = new FurniIconImageManager();

export const GetFurniIconImageManager = () => furniIconImageManager;

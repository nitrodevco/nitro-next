import { GetConfigValue, IGraphicAsset, IRoomObjectSprite, NitroLogger, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RenderTexture, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '#renderer/utils';

import { ExtraDataManager, IExtraDataClient } from '../data';
import { ExternalIsometricImageFurniVisualization } from './ExternalIsometricImageFurniVisualization';

/**
 * Port of Flash `FurnitureExternalImageVisualization` (`furniture_external_image`): the photo and
 * poster wall items, whose picture is a camera image named in the furni data.
 *
 * The data is JSON. With a `w` (or `url`) it names the picture outright - relative to
 * `stories.image_url_base`, under `postcards/selfie/` unless the furni is one of the
 * `external_image_wallitem_poster` types - and the room draws its `_small` copy. With an `id`
 * the url has to be asked for: from the extra data service (`extra_data_service_url`), batched
 * through `ExtraDataManager` when `extra_data_batches_enabled`, else one `GET` of the url plus
 * the id. A `REJECTED` answer, or an image base of `disabled`, leaves the frame empty.
 *
 * Flash was handed the three settings by `RoomManager` (`setExternalBaseUrls`) as it made the
 * visualization; here the visualization reads them itself when it is made.
 */
export class FurnitureExternalImageVisualization extends ExternalIsometricImageFurniVisualization implements IExtraDataClient {
    private static POSTER_TYPE: string = 'external_image_wallitem_poster';
    private static SELFIE_PATH: string = 'postcards/selfie/';

    private _imageUrlBase: string | undefined = GetConfigValue<string>('stories.image_url_base');
    private _extraDataServiceUrl: string | undefined = GetConfigValue<string>('extra_data_service_url');
    private _extraDataBatchesEnabled: boolean = GetConfigValue<boolean>('extra_data_batches_enabled') === true;
    private _url: string | undefined = undefined;
    private _extraDataRequested: boolean = false;
    private _typePrefix: string = '';
    private _externalImageUUID: string | undefined = undefined;

    public override dispose(): void {
        ExtraDataManager.furnitureDisposed(this);

        super.dispose();
    }

    protected override getThumbnailURL(): string | undefined {
        if (!this.object || this._imageUrlBase === 'disabled' || this._url === ExtraDataManager.STATUS_REJECTED) return undefined;

        if (this._url) return this._url;

        const data = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

        if (data === undefined || data === null) return undefined;

        let url: string | undefined = undefined;

        try {
            this._typePrefix = (this.object.type.indexOf(FurnitureExternalImageVisualization.POSTER_TYPE) !== -1) ? '' : FurnitureExternalImageVisualization.SELFIE_PATH;

            const id = FurnitureExternalImageVisualization.getJsonValue(data, 'id');

            if (id && id.length > 0) {
                if (!this._extraDataRequested) {
                    this._externalImageUUID = id;
                    this._extraDataRequested = true;

                    if (this._extraDataBatchesEnabled) ExtraDataManager.requestExtraDataUrl(this);
                    else this.loadExtraData(id);
                }

                return undefined;
            }

            url = this.buildThumbnailUrl(FurnitureExternalImageVisualization.getJsonValue(data, 'w', 'url'), this._typePrefix);
        } catch {
            return undefined;
        }

        this._url = url;

        // Flash handed a `REJECTED` url to the loader once, which failed; nothing is fetched here.
        return (url === ExtraDataManager.STATUS_REJECTED) ? undefined : url;
    }

    public getExternalImageUUID(): string | undefined {
        return this._externalImageUUID;
    }

    public getExtraDataUrl(): string | undefined {
        return this._extraDataServiceUrl;
    }

    public onUrlFromExtraDataService(url: string): void {
        this._url = this.buildThumbnailUrl(url, this._typePrefix);
    }

    private buildThumbnailUrl(url: string | undefined, prefix: string): string | undefined {
        if (!url) return undefined;

        if (url === ExtraDataManager.STATUS_REJECTED) return url;

        if (url.indexOf('http') !== 0) url = (this._imageUrlBase ?? '') + prefix + url;

        url = url.replace('.png', '_small.png');

        if (url.indexOf('.png') === -1) url = url + '_small.png';

        return url;
    }

    private static getJsonValue(json: string, key: string, fallbackKey: string | undefined = undefined): string | undefined {
        const data = JSON.parse(json) as Record<string, unknown>;
        let value = data[key];

        if ((value === undefined || value === null) && fallbackKey) value = data[fallbackKey];

        if (typeof value === 'string') return value;

        return (typeof value === 'number' || typeof value === 'boolean') ? String(value) : undefined;
    }

    /** Flash `loadExtraData`: without batching, the service answers one id at a time. */
    private loadExtraData(id: string): void {
        this._extraDataRequested = true;

        fetch((this._extraDataServiceUrl ?? '') + id)
            .then((response) => {
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

                return response.text();
            })
            .then((text) => {
                if (!text.length) return;

                this._url = this.buildThumbnailUrl(FurnitureExternalImageVisualization.getJsonValue(text, 'w', 'url'), this._typePrefix);
            })
            .catch(error => NitroLogger.warn('Extra data failed to load', error));
    }

    /**
     * Flash `getImage`: the picture the room shows at size 32, or the furni's own icon while there
     * is none. Flash looked the picture up by the id of the furni the image was asked for; the
     * engine's image objects are made with an id of their own, so here that is the icon.
     */
    public override getRenderTexture(): Texture | undefined {
        const collection = this.asset;

        if (!collection || !this.object) return RenderTexture.create({ width: 1, height: 1 });

        let asset: IGraphicAsset | undefined = collection.getAsset(this.getFullThumbnailAssetName(this.object.id, 32));

        if (!asset) asset = collection.getAsset(this.object.type + '_icon_a');

        if (!asset?.texture) return RenderTexture.create({ width: 1, height: 1 });

        const sprite = new Sprite(asset.texture);
        const texture = TextureUtils.generateTexture(sprite);

        sprite.destroy();

        return texture;
    }

    protected override getLibraryAssetNameForSprite(_asset: IGraphicAsset, _sprite: IRoomObjectSprite): string | undefined {
        return this._url;
    }
}

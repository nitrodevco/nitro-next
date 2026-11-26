import { IAssetData, IRoomGeometry, IRoomObjectUpdateMessage, IRoomSpriteMouseEvent, MapDataType, MouseEventType, RoomObjectRoomAdEvent, RoomObjectVariableEnum, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '../../../../assets';
import { ObjectAdUpdateMessage, ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

/** Port of Flash `FurnitureRoomBrandingLogic`. */
export class FurnitureRoomBrandingLogic extends FurnitureLogic {
    public static STATE: string = 'state' as const;
    public static IMAGEURL_KEY: string = 'imageUrl' as const;
    public static CLICKURL_KEY: string = 'clickUrl' as const;
    public static OFFSETX_KEY: string = 'offsetX' as const;
    public static OFFSETY_KEY: string = 'offsetY' as const;
    public static OFFSETZ_KEY: string = 'offsetZ' as const;

    protected _disableFurnitureSelection: boolean = true;
    protected _hasClickUrl: boolean = false;
    private _loadingImageUrl: string | undefined = undefined;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectRoomAdEvent.ROOM_AD_LOAD_IMAGE ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (this._disableFurnitureSelection)
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureSelectionDisabled, 1);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            this.processAdDataUpdateMessage(message);

            return;
        }

        if (message instanceof ObjectAdUpdateMessage) {
            switch (message.type) {
                case ObjectAdUpdateMessage.IMAGE_LOADED:
                    this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageStatus, 1);
                    break;
                case ObjectAdUpdateMessage.IMAGE_LOADING_FAILED:
                    this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageStatus, -1);
                    break;
            }

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (event.type === MouseEventType.MOUSE_MOVE || event.type === MouseEventType.DOUBLE_CLICK) return;

        super.mouseEvent(event, geometry);
    }

    /** `FurnitureRoomBrandingLogic.setupImageFromFurnitureData` */
    private processAdDataUpdateMessage(message: ObjectDataUpdateMessage): void {
        if (!message) return;

        const model = this.object.model;
        const objectData = new MapDataType();

        objectData.initializeFromRoomObjectModel(model);

        // Flash reads no state out of the data: a branding furni always shows state 0.
        if (this.object.getState(0) !== 0) this.object.setState(0, 0);

        const imageUrl = FurnitureRoomBrandingLogic.forceImageUrlToUseHttps(
            objectData.getValue(FurnitureRoomBrandingLogic.IMAGEURL_KEY),
        );

        if (imageUrl !== undefined) {
            const existingUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingImageUrl);

            if (
                existingUrl === undefined
                || existingUrl === null
                || FurnitureRoomBrandingLogic.forceImageUrlToUseHttps(existingUrl) !== imageUrl
            ) {
                model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageUrl, imageUrl);
                model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageStatus, 0);
            }
        }

        const clickUrl = objectData.getValue(FurnitureRoomBrandingLogic.CLICKURL_KEY);

        if (clickUrl !== undefined && clickUrl !== null) {
            if (model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingUrl) !== clickUrl)
                model.setValue(RoomObjectVariableEnum.FurnitureBrandingUrl, clickUrl);
        }

        this.updateOffset(RoomObjectVariableEnum.FurnitureBrandingOffsetX, objectData.getValue(FurnitureRoomBrandingLogic.OFFSETX_KEY));
        this.updateOffset(RoomObjectVariableEnum.FurnitureBrandingOffsetY, objectData.getValue(FurnitureRoomBrandingLogic.OFFSETY_KEY));
        this.updateOffset(RoomObjectVariableEnum.FurnitureBrandingOffsetZ, objectData.getValue(FurnitureRoomBrandingLogic.OFFSETZ_KEY));

        // The infostand options come from what the model holds, not from this update alone.
        const storedImageUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingImageUrl);
        const storedClickUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingUrl);
        const offsetX = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureBrandingOffsetX)) || 0;
        const offsetY = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureBrandingOffsetY)) || 0;
        const offsetZ = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureBrandingOffsetZ)) || 0;

        // Flash dispatches RORAE_ROOM_AD_LOAD_IMAGE on every data update while a url is stored,
        // which also retries an image that failed. The port loads the image itself.
        if (storedImageUrl !== undefined && storedImageUrl !== null) void this.downloadBackground();

        let options = FurnitureRoomBrandingLogic.IMAGEURL_KEY + '=' + (storedImageUrl ?? '') + '\t';

        if (this._hasClickUrl) options += FurnitureRoomBrandingLogic.CLICKURL_KEY + '=' + (storedClickUrl ?? '') + '\t';

        options += FurnitureRoomBrandingLogic.OFFSETX_KEY + '=' + offsetX + '\t';
        options += FurnitureRoomBrandingLogic.OFFSETY_KEY + '=' + offsetY + '\t';
        options += FurnitureRoomBrandingLogic.OFFSETZ_KEY + '=' + offsetZ + '\t';

        model.setValue(
            RoomObjectVariableEnum.InfostandExtraParam,
            RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS + options,
        );
    }

    private updateOffset(key: RoomObjectVariableEnum, value: string): void {
        const offset = parseInt(value);

        if (isNaN(offset)) return;

        if ((Math.trunc(this.object.model.getValue<number>(key)) || 0) !== offset) this.object.model.setValue(key, offset);
    }

    private static forceImageUrlToUseHttps(url: string | undefined | null): string | undefined {
        return (url !== undefined && url !== null) ? url.replace('http:', 'https:') : undefined;
    }

    private async downloadBackground(): Promise<void> {
        const model = this.object && this.object.model;

        if (!model) return;

        const imageUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingImageUrl);
        const imageStatus = model.getValue<number>(RoomObjectVariableEnum.FurnitureBrandingImageStatus);

        if (!imageUrl || imageUrl === '' || imageStatus === 1 || this._loadingImageUrl === imageUrl) return;

        const asset = GetAssetManager();

        if (!asset) return;

        const texture = asset.getTexture(imageUrl);

        if (!texture) {
            this._loadingImageUrl = imageUrl;

            const status = await asset.downloadAsset(imageUrl);

            if (this._loadingImageUrl === imageUrl) this._loadingImageUrl = undefined;

            // The room may have gone while the image downloaded. Flash's engine only tells live
            // objects that their image loaded or failed (FurnitureRoomBrandingLogic.as:60-71), so a
            // disposed one hears nothing.
            if (!this.object?.model) return;

            if (!status) {
                this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADING_FAILED));

                return;
            }
        }

        this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
    }
}

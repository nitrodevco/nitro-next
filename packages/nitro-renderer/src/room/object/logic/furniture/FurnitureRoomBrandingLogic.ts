import type { IAssetData, IRoomGeometry, IRoomObjectUpdateMessage, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import {
    MapDataType,
    MouseEventType,
    RoomObjectVariableEnum,
    RoomWidgetEnumItemExtradataParameter,
} from '@nitrodevco/nitro-api';
import { RoomObjectRoomAdEvent } from '@nitrodevco/nitro-shared';

import { GetAssetManager } from '../../../../assets';
import { ObjectAdUpdateMessage, ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRoomBrandingLogic extends FurnitureLogic {
    public static STATE: string = 'state';
    public static IMAGEURL_KEY: string = 'imageUrl';
    public static CLICKURL_KEY: string = 'clickUrl';
    public static OFFSETX_KEY: string = 'offsetX';
    public static OFFSETY_KEY: string = 'offsetY';
    public static OFFSETZ_KEY: string = 'offsetZ';

    protected _disableFurnitureSelection: boolean = true;
    protected _hasClickUrl: boolean = false;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectRoomAdEvent.ROOM_AD_LOAD_IMAGE]);
    }

    public override initialize(asset: IAssetData): void {
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

    private processAdDataUpdateMessage(message: ObjectDataUpdateMessage): void {
        if (!message) return;

        const objectData = new MapDataType();

        objectData.initializeFromRoomObjectModel(this.object.model);

        const state = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.STATE));

        if (!isNaN(state) && this.object.getState(0) !== state) this.object.setState(state, 0);

        const imageUrl = objectData.getValue(FurnitureRoomBrandingLogic.IMAGEURL_KEY);
        const existingUrl = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingImageUrl);

        if (!existingUrl || existingUrl !== imageUrl) {
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageUrl, imageUrl);
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingImageStatus, 0);

            void this.downloadBackground();
        }

        const clickUrl = objectData.getValue(FurnitureRoomBrandingLogic.CLICKURL_KEY);

        if (clickUrl) {
            const existingUrl = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingUrl);

            if (!existingUrl || existingUrl !== clickUrl) {
                if (this.object.model)
                    this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingUrl, clickUrl);
            }
        }

        const offsetX = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETX_KEY));
        const offsetY = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETY_KEY));
        const offsetZ = parseInt(objectData.getValue(FurnitureRoomBrandingLogic.OFFSETZ_KEY));

        if (!isNaN(offsetX)) this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingOffsetX, offsetX);
        if (!isNaN(offsetY)) this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingOffsetY, offsetY);
        if (!isNaN(offsetZ)) this.object.model.setValue(RoomObjectVariableEnum.FurnitureBrandingOffsetZ, offsetZ);

        let options = FurnitureRoomBrandingLogic.IMAGEURL_KEY + '=' + (imageUrl !== null ? imageUrl : '') + '\t';

        if (this._hasClickUrl)
            options =
                options + (FurnitureRoomBrandingLogic.CLICKURL_KEY + '=' + (clickUrl !== null ? clickUrl : '') + '\t');

        options = options + (FurnitureRoomBrandingLogic.OFFSETX_KEY + '=' + offsetX + '\t');
        options = options + (FurnitureRoomBrandingLogic.OFFSETY_KEY + '=' + offsetY + '\t');
        options = options + (FurnitureRoomBrandingLogic.OFFSETZ_KEY + '=' + offsetZ + '\t');

        this.object.model.setValue(
            RoomObjectVariableEnum.InfostandExtraParam,
            RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS + options,
        );
    }

    private async downloadBackground(): Promise<void> {
        const model = this.object && this.object.model;

        if (!model) return;

        const imageUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingImageUrl);
        const imageStatus = model.getValue<number>(RoomObjectVariableEnum.FurnitureBrandingImageStatus);

        if (!imageUrl || imageUrl === '' || imageStatus === 1) return;

        const asset = GetAssetManager();

        if (!asset) return;

        const texture = asset.getTexture(imageUrl);

        if (!texture) {
            const status = await asset.downloadAsset(imageUrl);

            if (!status) {
                this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADING_FAILED));

                return;
            }
        }

        this.processUpdateMessage(new ObjectAdUpdateMessage(ObjectAdUpdateMessage.IMAGE_LOADED));
    }
}

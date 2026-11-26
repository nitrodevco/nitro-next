import {
    IAssetData,
    IParticleSystem,
    IRoomGeometry,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
    MapDataType,
    MouseEventType,
    RoomObjectFurnitureActionEvent,
    RoomObjectVariableEnum,
    RoomObjectWidgetRequestEvent,
} from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage, ObjectModelDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurniturePresentLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_present`.
 */
export class FurniturePresentLogic extends FurnitureLogic {
    private static MESSAGE: string = 'MESSAGE';
    private static PRODUCT_CODE: string = 'PRODUCT_CODE';
    private static EXTRA_PARAM: string = 'EXTRA_PARAM';
    private static PURCHASER_NAME: string = 'PURCHASER_NAME';
    private static PURCHASER_FIGURE: string = 'PURCHASER_FIGURE';
    private static TRUSTED_SENDER: string = 'TRUSTED_SENDER';

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.PRESENT ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (asset?.logic?.particleSystems) this.object.model.setValue<IParticleSystem[]>(
            RoomObjectVariableEnum.FurnitureFireworksData,
            asset.logic.particleSystems,
        );
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage && message.data) {
            message.data.writeRoomObjectModel(this.object.model);

            this.setObjectVariables();
        }

        if (message instanceof ObjectModelDataUpdateMessage) {
            if (message.numberKey === RoomObjectVariableEnum.FurnitureDisablePickingAnimation.toString()) {
                this.object.model.setValue(
                    RoomObjectVariableEnum.FurnitureDisablePickingAnimation,
                    message.numberValue,
                );
            }
        }
    }

    /** `FurniturePresentLogic.setObjectVariables` */
    private setObjectVariables(): void {
        const model = this.object.model;
        const stuffData = new MapDataType();

        stuffData.initializeFromRoomObjectModel(model);

        const presentMessage = stuffData.getValue(FurniturePresentLogic.MESSAGE);
        const data = model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

        if ((presentMessage === undefined || presentMessage === null) && typeof data === 'string') {
            model.setValue(RoomObjectVariableEnum.FurnitureData, data.substr(1));
        } else {
            model.setValue(RoomObjectVariableEnum.FurnitureData, presentMessage);
        }

        /*
         * Flash also stores PRODUCT_CODE as the string `furniture_type_id`. Its model keeps strings
         * apart from numbers, so the numeric type id stays, and nothing reads the string. This
         * model has one value per key, so the string is left out and the type id kept.
         */
        const purchaserName = stuffData.getValue(FurniturePresentLogic.PURCHASER_NAME);
        const purchaserFigure = stuffData.getValue(FurniturePresentLogic.PURCHASER_FIGURE);

        if (purchaserName !== undefined && purchaserName !== null)
            model.setValue(RoomObjectVariableEnum.FurniturePurchaserName, purchaserName);

        if (purchaserFigure !== undefined && purchaserFigure !== null)
            model.setValue(RoomObjectVariableEnum.FurniturePurchaserFigure, purchaserFigure);

        // Set by the server for gifts from staff; anything else gets the untrusted-sender banner.
        model.setValue(
            RoomObjectVariableEnum.FurnitureTrustedSender,
            (stuffData.getValue(FurniturePresentLogic.TRUSTED_SENDER) === 'true') ? 1 : 0,
        );
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.ROLL_OVER:
                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object),
                );
                break;
            case MouseEventType.ROLL_OUT:
                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object),
                );
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PRESENT, this.object));
    }
}

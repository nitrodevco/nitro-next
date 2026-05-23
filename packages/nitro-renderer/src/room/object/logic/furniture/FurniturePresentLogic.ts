import type {
    IAssetData,
    IParticleSystem,
    IRoomGeometry,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
} from '@nitrodevco/nitro-api';
import { MapDataType, MouseEventType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage, ObjectModelDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePresentLogic extends FurnitureLogic {
    private static MESSAGE: string = 'MESSAGE';
    private static PRODUCT_CODE: string = 'PRODUCT_CODE';
    private static EXTRA_PARAM: string = 'EXTRA_PARAM';
    private static PURCHASER_NAME: string = 'PURCHASER_NAME';
    private static PURCHASER_FIGURE: string = 'PURCHASER_FIGURE';

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.PRESENT]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.particleSystems && asset.logic.particleSystems.length)
            this.object.model.setValue<IParticleSystem[]>(
                RoomObjectVariableEnum.FurnitureFireworksData,
                asset.logic.particleSystems,
            );
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            message.data?.writeRoomObjectModel(this.object.model);

            const stuffData = new MapDataType();

            stuffData.initializeFromRoomObjectModel(this.object.model);

            const presentMessage = stuffData.getValue(FurniturePresentLogic.MESSAGE);
            const data = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

            if (!presentMessage && typeof data === 'string') {
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureData, data.substr(1));
            } else {
                this.object.model.setValue(
                    RoomObjectVariableEnum.FurnitureData,
                    stuffData.getValue(FurniturePresentLogic.MESSAGE),
                );
            }

            this.object.model.setValue(
                RoomObjectVariableEnum.FurnitureTypeId,
                stuffData.getValue(FurniturePresentLogic.PRODUCT_CODE),
            );
            this.object.model.setValue(
                RoomObjectVariableEnum.FurniturePurchaserName,
                stuffData.getValue(FurniturePresentLogic.PURCHASER_NAME),
            );
            this.object.model.setValue(
                RoomObjectVariableEnum.FurniturePurchaserFigure,
                stuffData.getValue(FurniturePresentLogic.PURCHASER_FIGURE),
            );
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

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
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

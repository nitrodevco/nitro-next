import type {
    IAssetData,
    IParticleSystem,
    IRoomGeometry,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
} from '@nitrodevco/nitro-api';
import { MapDataType, MouseEventType, RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

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
                RoomObjectVariable.FURNITURE_FIREWORKS_DATA,
                asset.logic.particleSystems,
            );
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            message.data.writeRoomObjectModel(this.object.model);

            const stuffData = new MapDataType();

            stuffData.initializeFromRoomObjectModel(this.object.model);

            const presentMessage = stuffData.getValue(FurniturePresentLogic.MESSAGE);
            const data = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

            if (!presentMessage && typeof data === 'string') {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_DATA, data.substr(1));
            } else {
                this.object.model.setValue(
                    RoomObjectVariable.FURNITURE_DATA,
                    stuffData.getValue(FurniturePresentLogic.MESSAGE),
                );
            }

            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_TYPE_ID,
                stuffData.getValue(FurniturePresentLogic.PRODUCT_CODE),
            );
            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_PURCHASER_NAME,
                stuffData.getValue(FurniturePresentLogic.PURCHASER_NAME),
            );
            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_PURCHASER_FIGURE,
                stuffData.getValue(FurniturePresentLogic.PURCHASER_FIGURE),
            );
        }

        if (message instanceof ObjectModelDataUpdateMessage) {
            if (message.numberKey === RoomObjectVariable.FURNITURE_DISABLE_PICKING_ANIMATION) {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_DISABLE_PICKING_ANIMATION, message.numberValue);
            }
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.ROLL_OVER:
                this.dispatchEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object),
                );
                break;
            case MouseEventType.ROLL_OUT:
                this.dispatchEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object),
                );
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PRESENT, this.object));
    }
}

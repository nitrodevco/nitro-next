import { type IRoomObjectUpdateMessage, MapDataType, RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureMannequinLogic extends FurnitureLogic {
    private static GENDER: string = 'GENDER';
    private static FIGURE: string = 'FIGURE';
    private static OUTFIT_NAME: string = 'OUTFIT_NAME';

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.MANNEQUIN]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            message.data.writeRoomObjectModel(this.object.model);

            const data = new MapDataType();

            data.initializeFromRoomObjectModel(this.object.model);

            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_MANNEQUIN_GENDER,
                data.getValue(FurnitureMannequinLogic.GENDER),
            );
            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_MANNEQUIN_FIGURE,
                data.getValue(FurnitureMannequinLogic.FIGURE),
            );
            this.object.model.setValue(
                RoomObjectVariable.FURNITURE_MANNEQUIN_NAME,
                data.getValue(FurnitureMannequinLogic.OUTFIT_NAME),
            );
        }
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MANNEQUIN, this.object));
    }
}

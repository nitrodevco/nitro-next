import { FurnitureLabelData, IRoomObjectUpdateMessage, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ObjectFurnitureLabelUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureLabelDataLogic` (WIN63-202610121624), the logic `RoomObjectFactory`
 * builds for `furniture_label`: a label update becomes the furni's `furniture_label_data`, none
 * when it has no text.
 */
export class FurnitureLabelDataLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (message instanceof ObjectFurnitureLabelUpdateMessage) {
            const data = (message.text === undefined) ? undefined : new FurnitureLabelData(this.object.id, message.text, FurnitureLabelData.TYPE_LABEL, message.bubbleColor, message.visibility, message.alwaysOpen);

            this.object.model.setValue(RoomObjectVariableEnum.FurnitureLabelData, data);

            return;
        }

        super.processUpdateMessage(message);
    }
}

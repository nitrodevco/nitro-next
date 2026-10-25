import { FurnitureRegionData, IRoomObjectUpdateMessage, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ObjectFurnitureRegionUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureRegionDataLogic` (WIN63-202610121624), the logic for
 * `furniture_region`: a region update becomes the furni's `furniture_region_data` (the decompile
 * lost the store of the built data; the region it builds is what `applyFurnitureLabelOrRegion`
 * compares against).
 */
export class FurnitureRegionDataLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (message instanceof ObjectFurnitureRegionUpdateMessage) {
            const region = message.region;

            this.object.model.setValue(RoomObjectVariableEnum.FurnitureRegionData, region ? new FurnitureRegionData(this.object.id, region.title, region.description, region.xOffset, region.yOffset, region.minWidth, region.minHeight, region.color, region.areas) : undefined);

            return;
        }

        super.processUpdateMessage(message);
    }
}

import { FurnitureRegionData } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

/**
 * Port of Flash `RoomObjectFurnitureRegionUpdateMessage` (WIN63-202610121624): a region for a
 * `furniture_region` furni; none takes the region away.
 */
export class ObjectFurnitureRegionUpdateMessage extends RoomObjectUpdateMessage {
    constructor(public readonly region: FurnitureRegionData | undefined) {
        super(undefined, undefined);
    }
}

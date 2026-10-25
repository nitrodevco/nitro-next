import { IRoomObjectUpdateMessage, MapDataType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/** A channel of the map data that is not up to three digits, or above 255, reads as 255. */
const readChannel = (data: MapDataType, key: string): number => {
    const value = data.getValue(key);

    if (value === undefined || value === null || !/^[0-9]{1,3}$/.test(value) || parseInt(value) > 255) return 255;

    return parseInt(value);
};

/**
 * Port of Flash's obfuscated `_-Y2f` (WIN63-202610121624), the logic `RoomObjectFactory` builds
 * for `furniture_recolorable`: the map data's `r`, `g` and `b` become one colour in the model
 * (`furniture_recolorable_color`), white when the data is not a map.
 */
export class FurnitureRecolorableLogic extends FurnitureMultiStateLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (!(message instanceof ObjectDataUpdateMessage) || !message.data) return;

        const data = message.data;
        const color = (data instanceof MapDataType)
            ? ((readChannel(data, 'r') << 16) | (readChannel(data, 'g') << 8) | readChannel(data, 'b')) >>> 0
            : 0xffffff;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureRecolorableColor, color);
    }
}

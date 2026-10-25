import { FurnitureLabelData, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseFurnitureLabelDataList } from './Data/FurnitureLabelDataParser';

export type FurnitureLabelsAndRegionsUpdateMessageType = {
    /** False when the message did not parse: Flash then never hands it on. */
    valid: boolean;
    addedOrUpdated: FurnitureLabelData[];
    /** Furni whose label or region is gone. */
    removedIds: number[];
};

/**
 * Flash `FurnitureLabelsAndRegionsUpdateMessageParser` (WIN63-202610121624): the labels and
 * regions added or changed, then int count and the furni ids that lost theirs; handed to
 * `RoomEngine.updateFurnitureLabelsAndRegions`. A message that does not parse is not valid.
 */
export class FurnitureLabelsAndRegionsUpdateMessage implements IIncomingPacket<FurnitureLabelsAndRegionsUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurnitureLabelsAndRegionsUpdateMessageType {
        const addedOrUpdated = parseFurnitureLabelDataList(wrapper);

        if (!addedOrUpdated) return { valid: false, addedOrUpdated: [], removedIds: [] };

        const totalRemoved = wrapper.readInt();

        if (totalRemoved < 0) return { valid: false, addedOrUpdated: [], removedIds: [] };

        const removedIds: number[] = [];

        for (let i = 0; i < totalRemoved; i++) removedIds.push(wrapper.readInt());

        return { valid: true, addedOrUpdated, removedIds };
    }
}

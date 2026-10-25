import { FurnitureLabelData, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseFurnitureLabelDataList } from './Data/FurnitureLabelDataParser';

export type FurnitureLabelsAndRegionsMessageType = {
    /** False when the message did not parse: Flash then never hands it on. */
    valid: boolean;
    entries: FurnitureLabelData[];
};

/**
 * Flash `FurnitureLabelsAndRegionsMessageParser` (WIN63-202610121624): every label and region of
 * the room, sent on each entry (empty when there are none); `RoomMessageHandler` hands them to
 * `RoomEngine.replaceFurnitureLabelsAndRegions`. A message that does not parse is not valid.
 */
export class FurnitureLabelsAndRegionsMessage implements IIncomingPacket<FurnitureLabelsAndRegionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurnitureLabelsAndRegionsMessageType {
        const entries = parseFurnitureLabelDataList(wrapper);

        return { valid: !!entries, entries: entries ?? [] };
    }
}

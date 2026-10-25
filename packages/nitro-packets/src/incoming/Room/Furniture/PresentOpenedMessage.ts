// The two `ProductType` fields the generator could not map are plain strings - confirmed against
// the Flash `PresentOpenedMessageParser`, which reads them with `readString`. Filled by hand, so
// re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PresentOpenedMessageType = {
    itemType: string;
    classId: number;
    productCode: string;
    placedItemId: number;
    placedItemType: string;
    placedInRoom: boolean;
    petFigureString: string;
};

export class PresentOpenedMessage implements IIncomingPacket<PresentOpenedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PresentOpenedMessageType {
        const packet: PresentOpenedMessageType = {
            itemType: wrapper.readString(),
            classId: wrapper.readInt(),
            productCode: wrapper.readString(),
            placedItemId: wrapper.readInt(),
            placedItemType: wrapper.readString(),
            placedInRoom: wrapper.readBoolean(),
            petFigureString: wrapper.readString(),
        };

        return packet;
    }
}

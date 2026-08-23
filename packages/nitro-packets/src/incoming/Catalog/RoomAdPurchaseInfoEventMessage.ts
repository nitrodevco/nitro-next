import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomAdPurchaseInfoEventMessageType = object;

export class RoomAdPurchaseInfoEventMessage implements IIncomingPacket<RoomAdPurchaseInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomAdPurchaseInfoEventMessageType {
        const packet: RoomAdPurchaseInfoEventMessageType = {
        };

        return packet;
    }
}

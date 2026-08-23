import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UnseenItemsEventMessageType = object;

export class UnseenItemsEventMessage implements IIncomingPacket<UnseenItemsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): UnseenItemsEventMessageType {
        const packet: UnseenItemsEventMessageType = {
        };

        return packet;
    }
}

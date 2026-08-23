import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WardrobeMessageType = object;

export class WardrobeMessage implements IIncomingPacket<WardrobeMessageType> {
    public parse(wrapper: IMessageDataWrapper): WardrobeMessageType {
        const packet: WardrobeMessageType = {
        };

        return packet;
    }
}

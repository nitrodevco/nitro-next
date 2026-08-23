import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PostItPlacedEventMessageType = {
    id: number;
    itemsLeft: number;
};

export class PostItPlacedEventMessage implements IIncomingPacket<PostItPlacedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PostItPlacedEventMessageType {
        const packet: PostItPlacedEventMessageType = {
            id: wrapper.readInt(),
            itemsLeft: wrapper.readInt(),
        };

        return packet;
    }
}

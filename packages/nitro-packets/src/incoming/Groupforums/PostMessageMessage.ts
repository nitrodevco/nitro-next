import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PostMessageMessageType = object;

export class PostMessageMessage implements IIncomingPacket<PostMessageMessageType> {
    public parse(wrapper: IMessageDataWrapper): PostMessageMessageType {
        const packet: PostMessageMessageType = {
        };

        return packet;
    }
}

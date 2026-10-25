import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UnreadForumsCountMessageType = {
    unreadForumsCount: number;
};

export class UnreadForumsCountMessage implements IIncomingPacket<UnreadForumsCountMessageType> {
    public parse(wrapper: IMessageDataWrapper): UnreadForumsCountMessageType {
        const packet: UnreadForumsCountMessageType = {
            unreadForumsCount: wrapper.readInt(),
        };

        return packet;
    }
}

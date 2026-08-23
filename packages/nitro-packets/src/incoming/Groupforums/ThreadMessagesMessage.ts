import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ThreadMessagesMessageType = object;

export class ThreadMessagesMessage implements IIncomingPacket<ThreadMessagesMessageType> {
    public parse(wrapper: IMessageDataWrapper): ThreadMessagesMessageType {
        const packet: ThreadMessagesMessageType = {
        };

        return packet;
    }
}

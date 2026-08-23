import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PollContentsEventMessageType = object;

export class PollContentsEventMessage implements IIncomingPacket<PollContentsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PollContentsEventMessageType {
        const packet: PollContentsEventMessageType = {
        };

        return packet;
    }
}

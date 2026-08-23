import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupJoinFailedMessageType = object;

export class HabboGroupJoinFailedMessage implements IIncomingPacket<HabboGroupJoinFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupJoinFailedMessageType {
        const packet: HabboGroupJoinFailedMessageType = {
        };

        return packet;
    }
}

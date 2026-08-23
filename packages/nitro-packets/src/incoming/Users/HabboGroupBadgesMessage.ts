import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupBadgesMessageType = object;

export class HabboGroupBadgesMessage implements IIncomingPacket<HabboGroupBadgesMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupBadgesMessageType {
        const packet: HabboGroupBadgesMessageType = {
        };

        return packet;
    }
}

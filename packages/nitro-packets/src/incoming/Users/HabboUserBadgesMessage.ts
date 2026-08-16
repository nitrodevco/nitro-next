import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboUserBadgesMessageType = {
    userId: number;
    badges: Map<number, string>;
};

export class HabboUserBadgesMessage implements IIncomingPacket<HabboUserBadgesMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboUserBadgesMessageType {
        const packet: HabboUserBadgesMessageType = {
            userId: wrapper.readInt(),
            badges: new Map<number, string>(),
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.badges.set(wrapper.readInt(), wrapper.readString());
            count--;
        }

        return packet;
    }
}

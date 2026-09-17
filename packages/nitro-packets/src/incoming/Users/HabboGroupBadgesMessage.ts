// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupBadgesMessageType = {
    /** Group id against the badge code it is drawn from. */
    badges: Map<number, string>;
};

export class HabboGroupBadgesMessage implements IIncomingPacket<HabboGroupBadgesMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupBadgesMessageType {
        const badges = new Map<number, string>();

        let count = wrapper.readInt();

        while (count > 0) {
            badges.set(wrapper.readInt(), wrapper.readString());

            count--;
        }

        return { badges };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One badge a user wears, in the slot it is worn in. */
export interface IHabboUserBadge {
    badgeIndex: number;
    badgeCode: string;
    /** How many people own it - the badge details tooltip shows it for uncommon badges. */
    ownerCount: number;
    badgeRarityId: number;
}

export type HabboUserBadgesMessageType = {
    userId: number;
    selectedBadges: IHabboUserBadge[];
};

export class HabboUserBadgesMessage implements IIncomingPacket<HabboUserBadgesMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboUserBadgesMessageType {
        const userId = wrapper.readInt();
        const selectedBadges: IHabboUserBadge[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            selectedBadges.push({
                badgeIndex: wrapper.readInt(),
                badgeCode: wrapper.readString(),
                ownerCount: wrapper.readInt(),
                badgeRarityId: wrapper.readInt(),
            });

            count--;
        }

        return { userId, selectedBadges };
    }
}

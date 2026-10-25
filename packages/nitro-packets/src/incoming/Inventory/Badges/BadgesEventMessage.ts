// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One badge of the inventory, as Flash's `BadgesMessageParser` reads it. */
export interface IInventoryBadge {
    badgeId: number;
    badgeCode: string;
    /** How many users own the badge. */
    ownerCount: number;
    badgeRarityId: number;
}

export type BadgesEventMessageType = {
    totalFragments: number;
    fragmentNo: number;
    /** Badge code by badge id - what the inventory has always read. */
    fragment: Map<number, string>;
    /** The same badges with the ownership count and rarity the client now receives. */
    badges: IInventoryBadge[];
};

export class BadgesEventMessage implements IIncomingPacket<BadgesEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgesEventMessageType {
        const packet: BadgesEventMessageType = {
            totalFragments: wrapper.readInt(),
            fragmentNo: wrapper.readInt(),
            fragment: new Map<number, string>(),
            badges: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const badge: IInventoryBadge = {
                badgeId: wrapper.readInt(),
                badgeCode: wrapper.readString(),
                ownerCount: wrapper.readInt(),
                badgeRarityId: wrapper.readInt(),
            };

            packet.fragment.set(badge.badgeId, badge.badgeCode);
            packet.badges.push(badge);

            count--;
        }

        return packet;
    }
}

// Body filled by hand from the AS3 parser (`users/BadgeLeaderboardResultMessageParser`, an obfuscated class in this build).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BadgeLeaderboardEntryDataParser, IBadgeLeaderboardEntryData } from '../Data/BadgeLeaderboardEntryDataParser';

export type BadgeLeaderboardResultMessageType = {
    /** 0 total badges, 1 badges of one rarity, 2 achievement level. */
    type: number;
    /** The rarity tier of a type 1 board; -1 otherwise. */
    rarity: number;
    /** The chunk the entries are: `GetBadgeLeaderboard`'s chunk index. */
    page: number;
    /** The chunk size asked for (50). */
    size: number;
    totalEntries: number;
    entries: IBadgeLeaderboardEntryData[];
    /** The user's own entry, when the server sends one. */
    ownEntry: IBadgeLeaderboardEntryData | undefined;
};

export class BadgeLeaderboardResultMessage implements IIncomingPacket<BadgeLeaderboardResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgeLeaderboardResultMessageType {
        const type = wrapper.readInt();
        const rarity = wrapper.readInt();
        const page = wrapper.readInt();
        const size = wrapper.readInt();
        const totalEntries = wrapper.readInt();
        const entries: IBadgeLeaderboardEntryData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            entries.push(BadgeLeaderboardEntryDataParser(wrapper));

            count--;
        }

        const ownEntry = wrapper.readBoolean() ? BadgeLeaderboardEntryDataParser(wrapper) : undefined;

        return { type, rarity, page, size, totalEntries, entries, ownEntry };
    }
}

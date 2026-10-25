// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { HabboGroupEntryDataParser, IHabboGroupEntryData } from '../Data/HabboGroupEntryDataParser';

export type GuildMembershipsMessageType = {
    /** The groups the user is a member of - Flash `HabboGroupEntryData`, the tool's `GuildMembershipsData` under the repo's name. */
    guilds: IHabboGroupEntryData[];
};

/** The answer to `GetGuildMembershipsComposer`. Flash parser `_-m17._-qL`: a count, then one `HabboGroupEntryData` each. */
export class GuildMembershipsMessage implements IIncomingPacket<GuildMembershipsMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipsMessageType {
        return {
            guilds: ParseArray(wrapper, HabboGroupEntryDataParser),
        };
    }
}

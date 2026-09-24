// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { BadgePartDataParser, IBadgePartData } from '../Data/BadgePartDataParser';
import { GuildColorDataParser, IGuildColorData } from '../Data/GuildColorDataParser';

/**
 * Flash `GuildEditorData` - the badge parts and colour palettes the badge editor draws from. Sent
 * once per session: `HabboGroupsManager.requestGuildEditorData` asks for it only while it is null.
 */
export interface IGuildEditorData {
    /** The base shapes - layer 0 of the badge. */
    baseParts: IBadgePartData[];
    /** The symbols layers 1-4 may carry. */
    layerParts: IBadgePartData[];
    /** The palette every badge layer is tinted from. */
    badgeColors: IGuildColorData[];
    guildPrimaryColors: IGuildColorData[];
    guildSecondaryColors: IGuildColorData[];
}

export type GuildEditorDataMessageType = {
    data: IGuildEditorData;
};

/** The answer to `GetGuildEditorDataComposer` - `HabboGroupsManager.onGuildEditorData`. */
export class GuildEditorDataMessage implements IIncomingPacket<GuildEditorDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildEditorDataMessageType {
        return {
            data: {
                baseParts: ParseArray(wrapper, BadgePartDataParser),
                layerParts: ParseArray(wrapper, BadgePartDataParser),
                badgeColors: ParseArray(wrapper, GuildColorDataParser),
                guildPrimaryColors: ParseArray(wrapper, GuildColorDataParser),
                guildSecondaryColors: ParseArray(wrapper, GuildColorDataParser),
            },
        };
    }
}

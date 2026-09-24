// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IRoomEntryData } from '../Catalog/RoomAdPurchaseInfoEventMessage';
import { GuildBadgeSettingsParser, IGuildBadgeSettings } from '../Data/GuildBadgeSettingsParser';

/**
 * Flash `GuildCreationData` - what the creation wizard starts from. Its `exists` is false, which
 * is how `GuildManagementWindowCtrl` tells creating from editing, and every group field it answers
 * is the empty default rather than a wire value.
 */
export interface IGuildCreationData {
    costInCredits: number;
    /** The rooms the user owns, one of which becomes the group's base. */
    ownedRooms: IRoomEntryData[];
    /** The badge the wizard opens with. */
    badgeSettings: IGuildBadgeSettings[];
}

export type GuildCreationInfoMessageType = {
    data: IGuildCreationData;
};

/** The answer to `GetGuildCreationInfoComposer` - `HabboGroupsManager.onGuildCreationInfo`. */
export class GuildCreationInfoMessage implements IIncomingPacket<GuildCreationInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildCreationInfoMessageType {
        return {
            data: {
                costInCredits: wrapper.readInt(),
                ownedRooms: ParseArray(wrapper, wrapper => ({
                    roomId: wrapper.readInt(),
                    roomName: wrapper.readString(),
                    hasControllers: wrapper.readBoolean(),
                })),
                badgeSettings: ParseArray(wrapper, GuildBadgeSettingsParser),
            },
        };
    }
}

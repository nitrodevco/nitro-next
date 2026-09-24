// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IRoomEntryData } from '../Catalog/RoomAdPurchaseInfoEventMessage';
import { GuildBadgeSettingsParser, IGuildBadgeSettings } from '../Data/GuildBadgeSettingsParser';

/** Flash `GuildEditData` - an existing group as the management window edits it (`exists` is true). */
export interface IGuildEditData {
    ownedRooms: IRoomEntryData[];
    isOwner: boolean;
    groupId: number;
    groupName: string;
    groupDescription: string;
    baseRoomId: number;
    primaryColorId: number;
    secondaryColorId: number;
    /** `GUILD_TYPE_*`. */
    guildType: number;
    /** `GUILD_RIGHTS_*`. */
    rightsLevel: number;
    locked: boolean;
    url: string;
    badgeSettings: IGuildBadgeSettings[];
    badgeCode: string;
    membershipCount: number;
}

export type GuildEditInfoMessageType = {
    data: IGuildEditData;
};

/** The answer to `GetGuildEditInfoComposer` - `HabboGroupsManager.onGuildEditInfo`. */
export class GuildEditInfoMessage implements IIncomingPacket<GuildEditInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildEditInfoMessageType {
        return {
            data: {
                ownedRooms: ParseArray(wrapper, wrapper => ({
                    roomId: wrapper.readInt(),
                    roomName: wrapper.readString(),
                    hasControllers: wrapper.readBoolean(),
                })),
                isOwner: wrapper.readBoolean(),
                groupId: wrapper.readInt(),
                groupName: wrapper.readString(),
                groupDescription: wrapper.readString(),
                baseRoomId: wrapper.readInt(),
                primaryColorId: wrapper.readInt(),
                secondaryColorId: wrapper.readInt(),
                guildType: wrapper.readInt(),
                rightsLevel: wrapper.readInt(),
                locked: wrapper.readBoolean(),
                url: wrapper.readString(),
                badgeSettings: ParseArray(wrapper, GuildBadgeSettingsParser),
                badgeCode: wrapper.readString(),
                membershipCount: wrapper.readInt(),
            },
        };
    }
}

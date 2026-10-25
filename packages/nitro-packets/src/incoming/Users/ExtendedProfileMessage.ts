// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Parses Flash's `ExtendedProfileData` (`_SafeStr_2218`), including its embedded group entries. */
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** A group shown in the profile - Flash's `ExtendedProfileData` embedded group entry. */
export interface IExtendedProfileGroup {
    groupId: number;
    groupName: string;
    badgeCode: string;
    primaryColor: string;
    secondaryColor: string;
    favourite: boolean;
    ownerId: number;
    hasForum: boolean;
}

/** `ExtendedProfileData` in `ExtendedProfileMessageEvent` (`_SafeStr_2218` in the current SWF). */
export type ExtendedProfileMessageType = {
    userId: number;
    userName: string;
    figure: string;
    motto: string;
    creationDate: string;
    achievementScore: number;
    friendCount: number;
    isFriend: boolean;
    isFriendRequestSent: boolean;
    /** 0 offline, 1 online, 2 hidden; see `ExtendedProfileWindowCtrl.refreshHeader`. */
    onlineStatus: number;
    guilds: IExtendedProfileGroup[];
    lastAccessSinceInSeconds: number;
    openProfileWindow: boolean;
    isHidden: boolean;
    accountLevel: number;
    starGemCount: number;
    totalBadges: number;
    achievementLevel: number;
    totalBadgesRank: number;
    badgeRarityCounts: { rarityId: number; count: number }[];
};

export class ExtendedProfileMessage implements IIncomingPacket<ExtendedProfileMessageType> {
    public parse(wrapper: IMessageDataWrapper): ExtendedProfileMessageType {
        const userId = wrapper.readInt();
        const userName = wrapper.readString();
        const figure = wrapper.readString();
        const motto = wrapper.readString();
        const creationDate = wrapper.readString();
        const achievementScore = wrapper.readInt();
        const friendCount = wrapper.readInt();
        const isFriend = wrapper.readBoolean();
        const isFriendRequestSent = wrapper.readBoolean();
        const onlineStatus = wrapper.readByte();
        const guilds: IExtendedProfileGroup[] = [];
        let count = wrapper.readInt();

        while (count > 0) {
            guilds.push({
                groupId: wrapper.readInt(),
                groupName: wrapper.readString(),
                badgeCode: wrapper.readString(),
                primaryColor: wrapper.readString(),
                secondaryColor: wrapper.readString(),
                favourite: wrapper.readBoolean(),
                ownerId: wrapper.readInt(),
                hasForum: wrapper.readBoolean(),
            });

            count--;
        }

        const lastAccessSinceInSeconds = wrapper.readInt();
        const openProfileWindow = wrapper.readBoolean();
        const isHidden = wrapper.readBoolean();
        const accountLevel = wrapper.readInt();
        wrapper.readInt(); // `_SafeStr_7464`: read by Flash, with no public data getter.
        const starGemCount = wrapper.readInt();
        wrapper.readBoolean(); // `_SafeStr_7466`: read by Flash, with no public data getter.
        wrapper.readBoolean(); // `_SafeStr_7467`: read by Flash, with no public data getter.
        const totalBadges = wrapper.readInt();
        const achievementLevel = wrapper.readInt();
        const badgeRarityCounts: { rarityId: number; count: number }[] = [];
        count = wrapper.readInt();

        while (count > 0) {
            badgeRarityCounts.push({ rarityId: wrapper.readByte(), count: wrapper.readInt() });
            count--;
        }

        const totalBadgesRank = wrapper.readInt();
        const packet: ExtendedProfileMessageType = {
            userId,
            userName,
            figure,
            motto,
            creationDate,
            achievementScore,
            friendCount,
            isFriend,
            isFriendRequestSent,
            onlineStatus,
            guilds,
            lastAccessSinceInSeconds,
            openProfileWindow,
            isHidden,
            accountLevel,
            starGemCount,
            totalBadges,
            achievementLevel,
            totalBadgesRank,
            badgeRarityCounts,
        };

        return packet;
    }
}

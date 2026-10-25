import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * `BadgeInfoMessageEvent` (`BadgeInfoMessageParser.parse`): one badge's figures across the hotel,
 * the reply to `GetBadgeInfo` - its id (0 when the asker does not own it), code, how many users own
 * it and its `BadgeRarity` tier.
 */
export type BadgeInfoMessageType = {
    badgeId: number;
    badgeCode: string;
    ownerCount: number;
    badgeRarityId: number;
};

export class BadgeInfoMessage implements IIncomingPacket<BadgeInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgeInfoMessageType {
        return {
            badgeId: wrapper.readInt(),
            badgeCode: wrapper.readString(),
            ownerCount: wrapper.readInt(),
            badgeRarityId: wrapper.readInt(),
        };
    }
}

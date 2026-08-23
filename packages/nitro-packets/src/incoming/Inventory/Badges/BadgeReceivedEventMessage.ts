import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BadgeReceivedEventMessageType = {
    badgeId: number;
    badgeCode: string;
    ownerCount: number;
    badgeRarityId: number;
};

export class BadgeReceivedEventMessage implements IIncomingPacket<BadgeReceivedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgeReceivedEventMessageType {
        const packet: BadgeReceivedEventMessageType = {
            badgeId: wrapper.readInt(),
            badgeCode: wrapper.readString(),
            ownerCount: wrapper.readInt(),
            badgeRarityId: wrapper.readInt(),
        };

        return packet;
    }
}

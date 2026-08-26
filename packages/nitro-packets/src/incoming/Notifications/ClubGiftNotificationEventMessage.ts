import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ClubGiftNotificationEventMessageType = {
    numGifts: number;
};

export class ClubGiftNotificationEventMessage implements IIncomingPacket<ClubGiftNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClubGiftNotificationEventMessageType {
        const packet: ClubGiftNotificationEventMessageType = {
            numGifts: wrapper.readInt()
        };

        return packet;
    }
}

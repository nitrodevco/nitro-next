import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionInvitedToGuideRoomMessageType = object;

export class GuideSessionInvitedToGuideRoomMessage implements IIncomingPacket<GuideSessionInvitedToGuideRoomMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuideSessionInvitedToGuideRoomMessageType {
        const packet: GuideSessionInvitedToGuideRoomMessageType = {
        };

        return packet;
    }
}

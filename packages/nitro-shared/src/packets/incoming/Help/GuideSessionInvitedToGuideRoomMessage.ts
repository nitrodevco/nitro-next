import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionInvitedToGuideRoomMessageType = {
  // no fields

};

export class GuideSessionInvitedToGuideRoomMessage implements IIncomingPacket<GuideSessionInvitedToGuideRoomMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionInvitedToGuideRoomMessageType
  {

    const packet: GuideSessionInvitedToGuideRoomMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionRequesterRoomMessageType = {
  // no fields

};

export class GuideSessionRequesterRoomMessage implements IIncomingPacket<GuideSessionRequesterRoomMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionRequesterRoomMessageType
  {

    const packet: GuideSessionRequesterRoomMessageType = {
    };

    return packet;
  }
}

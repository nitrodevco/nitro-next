import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionMessageMessageType = {
  // no fields

};

export class GuideSessionMessageMessage implements IIncomingPacket<GuideSessionMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuideSessionMessageMessageType
  {

    const packet: GuideSessionMessageMessageType = {
    };

    return packet;
  }
}

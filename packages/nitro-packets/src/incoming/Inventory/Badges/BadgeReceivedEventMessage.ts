import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BadgeReceivedEventMessageType = {
  // no fields

};

export class BadgeReceivedEventMessage implements IIncomingPacket<BadgeReceivedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BadgeReceivedEventMessageType
  {

    const packet: BadgeReceivedEventMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HandItemReceivedMessageType = {
  // no fields

};

export class HandItemReceivedMessage implements IIncomingPacket<HandItemReceivedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HandItemReceivedMessageType
  {

    const packet: HandItemReceivedMessageType = {
    };

    return packet;
  }
}

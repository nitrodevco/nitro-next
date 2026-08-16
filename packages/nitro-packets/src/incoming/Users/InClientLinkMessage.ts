import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type InClientLinkMessageType = {
  // no fields

};

export class InClientLinkMessage implements IIncomingPacket<InClientLinkMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InClientLinkMessageType
  {

    const packet: InClientLinkMessageType = {
    };

    return packet;
  }
}

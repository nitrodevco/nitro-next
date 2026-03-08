import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredMenuErrorEventMessageType = {
  // no fields

};

export class WiredMenuErrorEventMessage implements IIncomingPacket<WiredMenuErrorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredMenuErrorEventMessageType
  {

    const packet: WiredMenuErrorEventMessageType = {
    };

    return packet;
  }
}

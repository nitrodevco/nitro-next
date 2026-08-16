import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PingMessageType = {
  // no fields

};

export class PingMessage implements IIncomingPacket<PingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PingMessageType
  {

    const packet: PingMessageType = {
    };

    return packet;
  }
}

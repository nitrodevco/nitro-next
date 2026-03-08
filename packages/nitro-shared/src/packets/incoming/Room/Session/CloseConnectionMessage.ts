import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CloseConnectionMessageType = {
  // no fields

};

export class CloseConnectionMessage implements IIncomingPacket<CloseConnectionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CloseConnectionMessageType
  {

    const packet: CloseConnectionMessageType = {
    };

    return packet;
  }
}

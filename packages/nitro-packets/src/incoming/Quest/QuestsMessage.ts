import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestsMessageType = {
  // no fields

};

export class QuestsMessage implements IIncomingPacket<QuestsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): QuestsMessageType
  {

    const packet: QuestsMessageType = {
    };

    return packet;
  }
}

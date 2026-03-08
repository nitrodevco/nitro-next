import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ForumsListMessageType = {
  // no fields

};

export class ForumsListMessage implements IIncomingPacket<ForumsListMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ForumsListMessageType
  {

    const packet: ForumsListMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ForumDataMessageType = {
  // no fields

};

export class ForumDataMessage implements IIncomingPacket<ForumDataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ForumDataMessageType
  {

    const packet: ForumDataMessageType = {
    };

    return packet;
  }
}

import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ForumThreadsMessageType = {
  // no fields

};

export class ForumThreadsMessage implements IIncomingPacket<ForumThreadsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ForumThreadsMessageType
  {

    const packet: ForumThreadsMessageType = {
    };

    return packet;
  }
}

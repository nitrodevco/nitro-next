import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ThreadMessagesMessageType = {
  // no fields

};

export class ThreadMessagesMessage implements IIncomingPacket<ThreadMessagesMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ThreadMessagesMessageType
  {

    const packet: ThreadMessagesMessageType = {
    };

    return packet;
  }
}

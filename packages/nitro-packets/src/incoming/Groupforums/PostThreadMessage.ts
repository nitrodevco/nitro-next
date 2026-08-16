import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PostThreadMessageType = {
  // no fields

};

export class PostThreadMessage implements IIncomingPacket<PostThreadMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PostThreadMessageType
  {

    const packet: PostThreadMessageType = {
    };

    return packet;
  }
}

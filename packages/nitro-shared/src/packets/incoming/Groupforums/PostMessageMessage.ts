import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PostMessageMessageType = {
  // no fields

};

export class PostMessageMessage implements IIncomingPacket<PostMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PostMessageMessageType
  {

    const packet: PostMessageMessageType = {
    };

    return packet;
  }
}

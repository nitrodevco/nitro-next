import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PostItPlacedEventMessageType = {
  // no fields

};

export class PostItPlacedEventMessage implements IIncomingPacket<PostItPlacedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PostItPlacedEventMessageType
  {

    const packet: PostItPlacedEventMessageType = {
    };

    return packet;
  }
}

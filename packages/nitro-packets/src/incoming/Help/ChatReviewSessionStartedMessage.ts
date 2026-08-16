import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionStartedMessageType = {
  // no fields

};

export class ChatReviewSessionStartedMessage implements IIncomingPacket<ChatReviewSessionStartedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChatReviewSessionStartedMessageType
  {

    const packet: ChatReviewSessionStartedMessageType = {
    };

    return packet;
  }
}

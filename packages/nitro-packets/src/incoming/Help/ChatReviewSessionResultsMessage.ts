import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionResultsMessageType = {
  // no fields

};

export class ChatReviewSessionResultsMessage implements IIncomingPacket<ChatReviewSessionResultsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChatReviewSessionResultsMessageType
  {

    const packet: ChatReviewSessionResultsMessageType = {
    };

    return packet;
  }
}

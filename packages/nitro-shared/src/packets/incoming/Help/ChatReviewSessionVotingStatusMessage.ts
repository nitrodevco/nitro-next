import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionVotingStatusMessageType = {
  // no fields

};

export class ChatReviewSessionVotingStatusMessage implements IIncomingPacket<ChatReviewSessionVotingStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChatReviewSessionVotingStatusMessageType
  {

    const packet: ChatReviewSessionVotingStatusMessageType = {
    };

    return packet;
  }
}

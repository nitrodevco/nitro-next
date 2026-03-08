import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionOfferedToGuideMessageType = {
  // no fields

};

export class ChatReviewSessionOfferedToGuideMessage implements IIncomingPacket<ChatReviewSessionOfferedToGuideMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ChatReviewSessionOfferedToGuideMessageType
  {

    const packet: ChatReviewSessionOfferedToGuideMessageType = {
    };

    return packet;
  }
}

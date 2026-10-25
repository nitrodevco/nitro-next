import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionOfferedToGuideMessageType = object;

export class ChatReviewSessionOfferedToGuideMessage implements IIncomingPacket<ChatReviewSessionOfferedToGuideMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChatReviewSessionOfferedToGuideMessageType {
        const packet: ChatReviewSessionOfferedToGuideMessageType = {
        };

        return packet;
    }
}

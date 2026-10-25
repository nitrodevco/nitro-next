import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionDetachedMessageType = object;

export class ChatReviewSessionDetachedMessage implements IIncomingPacket<ChatReviewSessionDetachedMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChatReviewSessionDetachedMessageType {
        const packet: ChatReviewSessionDetachedMessageType = {
        };

        return packet;
    }
}

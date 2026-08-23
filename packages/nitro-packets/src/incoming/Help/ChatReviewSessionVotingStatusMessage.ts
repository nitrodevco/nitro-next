import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChatReviewSessionVotingStatusMessageType = object;

export class ChatReviewSessionVotingStatusMessage implements IIncomingPacket<ChatReviewSessionVotingStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChatReviewSessionVotingStatusMessageType {
        const packet: ChatReviewSessionVotingStatusMessageType = {
        };

        return packet;
    }
}

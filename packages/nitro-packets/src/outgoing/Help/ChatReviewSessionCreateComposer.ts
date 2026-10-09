import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `ChatReviewSessionCreateMessageComposer(reportedUserId, roomId)`. */
export type ChatReviewSessionCreateComposerType = {
    reportedUserId: number;
    roomId: number;
};

export class ChatReviewSessionCreateComposer implements IOutgoingPacket<ChatReviewSessionCreateComposerType> {
    public constructor(private params: ChatReviewSessionCreateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.reportedUserId,
            this.params.roomId,
        ];
    }
}

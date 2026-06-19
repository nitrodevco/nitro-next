import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatReviewGuideVoteComposerType = object;

export class ChatReviewGuideVoteComposer implements IOutgoingPacket<ChatReviewGuideVoteComposerType> {
    public constructor(private params: ChatReviewGuideVoteComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

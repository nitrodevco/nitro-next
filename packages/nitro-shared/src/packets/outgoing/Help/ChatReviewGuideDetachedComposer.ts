import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatReviewGuideDetachedComposerType = object;

export class ChatReviewGuideDetachedComposer implements IOutgoingPacket<ChatReviewGuideDetachedComposerType> {
    public constructor(private params: ChatReviewGuideDetachedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

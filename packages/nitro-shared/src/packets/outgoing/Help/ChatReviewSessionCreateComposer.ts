import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatReviewSessionCreateComposerType = object;

export class ChatReviewSessionCreateComposer implements IOutgoingPacket<ChatReviewSessionCreateComposerType> {
    public constructor(private params: ChatReviewSessionCreateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

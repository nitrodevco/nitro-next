import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatReviewGuideDecidesOnOfferComposerType = object;

export class ChatReviewGuideDecidesOnOfferComposer implements IOutgoingPacket<ChatReviewGuideDecidesOnOfferComposerType> {
    public constructor(private params: ChatReviewGuideDecidesOnOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionIsTypingComposerType = object;

export class GuideSessionIsTypingComposer implements IOutgoingPacket<GuideSessionIsTypingComposerType> {
    public constructor(private params: GuideSessionIsTypingComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

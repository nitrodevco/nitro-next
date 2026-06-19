import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionFeedbackComposerType = object;

export class GuideSessionFeedbackComposer implements IOutgoingPacket<GuideSessionFeedbackComposerType> {
    public constructor(private params: GuideSessionFeedbackComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

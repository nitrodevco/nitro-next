import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionGuideDecidesComposerType = object;

export class GuideSessionGuideDecidesComposer implements IOutgoingPacket<GuideSessionGuideDecidesComposerType> {
    public constructor(private params: GuideSessionGuideDecidesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

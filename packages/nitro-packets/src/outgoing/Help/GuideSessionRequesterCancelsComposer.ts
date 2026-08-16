import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionRequesterCancelsComposerType = object;

export class GuideSessionRequesterCancelsComposer implements IOutgoingPacket<GuideSessionRequesterCancelsComposerType> {
    public constructor(private params: GuideSessionRequesterCancelsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

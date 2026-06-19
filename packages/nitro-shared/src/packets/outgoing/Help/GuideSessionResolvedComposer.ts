import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionResolvedComposerType = object;

export class GuideSessionResolvedComposer implements IOutgoingPacket<GuideSessionResolvedComposerType> {
    public constructor(private params: GuideSessionResolvedComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

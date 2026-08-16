import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionMessageComposerType = object;

export class GuideSessionMessageComposer implements IOutgoingPacket<GuideSessionMessageComposerType> {
    public constructor(private params: GuideSessionMessageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

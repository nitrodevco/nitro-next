import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionCreateComposerType = object;

export class GuideSessionCreateComposer implements IOutgoingPacket<GuideSessionCreateComposerType> {
    public constructor(private params: GuideSessionCreateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

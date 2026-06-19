import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PresentOpenComposerType = object;

export class PresentOpenComposer implements IOutgoingPacket<PresentOpenComposerType> {
    public constructor(private params: PresentOpenComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

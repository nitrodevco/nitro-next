import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DanceComposerType = object;

export class DanceComposer implements IOutgoingPacket<DanceComposerType> {
    public constructor(private params: DanceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

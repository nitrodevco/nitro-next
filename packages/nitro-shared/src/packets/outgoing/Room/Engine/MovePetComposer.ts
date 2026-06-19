import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MovePetComposerType = object;

export class MovePetComposer implements IOutgoingPacket<MovePetComposerType> {
    public constructor(private params: MovePetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

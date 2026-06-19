import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ThrowDiceComposerType = object;

export class ThrowDiceComposer implements IOutgoingPacket<ThrowDiceComposerType> {
    public constructor(private params: ThrowDiceComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

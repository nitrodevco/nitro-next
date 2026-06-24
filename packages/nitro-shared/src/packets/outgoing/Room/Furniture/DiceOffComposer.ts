import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DiceOffComposerType = object;

export class DiceOffComposer implements IOutgoingPacket<DiceOffComposerType> {
    public constructor(private params: DiceOffComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

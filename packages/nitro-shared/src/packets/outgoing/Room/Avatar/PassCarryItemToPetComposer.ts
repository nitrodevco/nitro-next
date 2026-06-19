import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PassCarryItemToPetComposerType = object;

export class PassCarryItemToPetComposer implements IOutgoingPacket<PassCarryItemToPetComposerType> {
    public constructor(private params: PassCarryItemToPetComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

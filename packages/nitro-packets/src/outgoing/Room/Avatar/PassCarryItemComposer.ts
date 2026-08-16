import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PassCarryItemComposerType = object;

export class PassCarryItemComposer implements IOutgoingPacket<PassCarryItemComposerType> {
    public constructor(private params: PassCarryItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

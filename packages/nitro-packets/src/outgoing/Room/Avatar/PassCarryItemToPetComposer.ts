import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PassCarryItemToPetComposerType = {
    petId: number;
};

export class PassCarryItemToPetComposer implements IOutgoingPacket<PassCarryItemToPetComposerType> {
    public constructor(private params: PassCarryItemToPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}

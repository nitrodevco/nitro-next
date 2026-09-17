// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RespectPetComposerType = {
    petId: number;
};

export class RespectPetComposer implements IOutgoingPacket<RespectPetComposerType> {
    public constructor(private params: RespectPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetCommandsComposerType = {
    petId: number;
};

/** Asks which commands a pet knows - answered by `PetCommandsMessage`. */
export class GetPetCommandsComposer implements IOutgoingPacket<GetPetCommandsComposerType> {
    public constructor(private params: GetPetCommandsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}

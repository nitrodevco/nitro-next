// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetCommandsComposerType = {
    petId: number;
};

export class GetPetCommandsComposer implements IOutgoingPacket<GetPetCommandsComposerType> {
    public constructor(private params: GetPetCommandsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}

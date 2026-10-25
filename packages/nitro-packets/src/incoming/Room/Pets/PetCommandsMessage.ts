// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

export type PetCommandsMessageType = {
    petId: number;
    /** Every command the breed can learn... */
    allCommands: number[];
    /** ...and the ones this pet has been taught. Both are `pet.command.<id>` keys. */
    enabledCommands: number[];
};

export class PetCommandsMessage implements IIncomingPacket<PetCommandsMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetCommandsMessageType {
        return {
            petId: wrapper.readInt(),
            allCommands: ParseInts(wrapper),
            enabledCommands: ParseInts(wrapper),
        };
    }
}

// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetCommandsMessageType = {
    petId: number;
    /** Every command the pet's breed knows, whether or not it has learned it yet. */
    allCommands: number[];
    /** The ones it has learned, which are the only ones worth offering. */
    enabledCommands: number[];
};

export class PetCommandsMessage implements IIncomingPacket<PetCommandsMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetCommandsMessageType {
        const packet: PetCommandsMessageType = {
            petId: wrapper.readInt(),
            allCommands: [],
            enabledCommands: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.allCommands.push(wrapper.readInt());

            count--;
        }

        count = wrapper.readInt();

        while (count > 0) {
            packet.enabledCommands.push(wrapper.readInt());

            count--;
        }

        return packet;
    }
}

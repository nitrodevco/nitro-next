// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetData, PetDataParser } from '../../Data/PetDataParser';

export type PetInventoryEventMessageType = {
    totalFragments: number;
    fragmentNo: number;
    /** The fragment's pets by pet id, as Flash keys its `Map`. */
    fragment: Map<number, IPetData>;
};

/** Flash's pet inventory parser: the pet list, sent in fragments the model joins before it replaces what it holds. */
export class PetInventoryEventMessage implements IIncomingPacket<PetInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetInventoryEventMessageType {
        const packet: PetInventoryEventMessageType = {
            totalFragments: wrapper.readInt(),
            fragmentNo: wrapper.readInt(),
            fragment: new Map<number, IPetData>(),
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const pet = PetDataParser(wrapper);

            packet.fragment.set(pet.id, pet);

            count--;
        }

        return packet;
    }
}

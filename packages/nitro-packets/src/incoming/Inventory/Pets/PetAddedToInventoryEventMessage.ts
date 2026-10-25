// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetData, PetDataParser } from '../../Data/PetDataParser';

export type PetAddedToInventoryEventMessageType = {
    pet: IPetData;
    /** Flash reads the flag and does nothing with it; kept so the parser stays the right length. */
    openInventory: boolean;
};

export class PetAddedToInventoryEventMessage implements IIncomingPacket<PetAddedToInventoryEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetAddedToInventoryEventMessageType {
        return {
            pet: PetDataParser(wrapper),
            openInventory: wrapper.readBoolean(),
        };
    }
}

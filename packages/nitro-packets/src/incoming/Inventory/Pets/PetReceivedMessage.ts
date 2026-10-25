// Body filled by hand from the AS3 parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetData, PetDataParser } from '../../Data/PetDataParser';

/** Flash `PetReceivedMessageEvent`'s parser: whether the pet was bought as a gift, then the pet (`PetData`). */
export type PetReceivedMessageType = {
    boughtAsGift: boolean;
    pet: IPetData;
};

export class PetReceivedMessage implements IIncomingPacket<PetReceivedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetReceivedMessageType {
        return {
            boughtAsGift: wrapper.readBoolean(),
            pet: PetDataParser(wrapper),
        };
    }
}

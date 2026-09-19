// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetPlacingErrorMessageType = {
    /** 0 pets are forbidden in the hotel, 1 in this room, 2 the room is full of them. */
    errorCode: number;
};

export class PetPlacingErrorMessage implements IIncomingPacket<PetPlacingErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetPlacingErrorMessageType {
        return {
            errorCode: wrapper.readInt(),
        };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetExperienceMessageType = {
    petId: number;
    petRoomIndex: number;
    gainedExperience: number;
};

export class PetExperienceMessage implements IIncomingPacket<PetExperienceMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetExperienceMessageType {
        return {
            petId: wrapper.readInt(),
            petRoomIndex: wrapper.readInt(),
            gainedExperience: wrapper.readInt(),
        };
    }
}

import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetExperienceMessageType = {
    petId: number;
    petRoomIndex: number;
    gainedExperience: number;
};

export class PetExperienceMessage implements IIncomingPacket<PetExperienceMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetExperienceMessageType {
        const packet: PetExperienceMessageType = {
            petId: 0,
            petRoomIndex: 0,
            gainedExperience: 0,
        };

        packet.petId = wrapper.readInt();
        packet.petRoomIndex = wrapper.readInt();
        packet.gainedExperience = wrapper.readInt();

        return packet;
    }
}

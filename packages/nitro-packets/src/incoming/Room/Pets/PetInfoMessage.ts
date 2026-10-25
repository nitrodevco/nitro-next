// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetInfoMessageType = {
    petId: number;
    name: string;
    level: number;
    maxLevel: number;
    experience: number;
    experienceRequiredToLevel: number;
    energy: number;
    maxEnergy: number;
    nutrition: number;
    maxNutrition: number;
    respect: number;
    ownerId: number;
    /** In days. */
    age: number;
    ownerName: string;
    breedId: number;
    /** A saddle it came with, which costs nothing to put on. */
    hasFreeSaddle: boolean;
    isRiding: boolean;
    /** The experience each skill level starts at, smallest first. */
    skillTresholds: number[];
    accessRights: number;
    canBreed: boolean;
    canHarvest: boolean;
    canRevive: boolean;
    rarityLevel: number;
    /** A monsterplant's lifespan, and what is left of it. */
    maxWellBeingSeconds: number;
    remainingWellBeingSeconds: number;
    remainingGrowingSeconds: number;
    hasBreedingPermission: boolean;
};

export class PetInfoMessage implements IIncomingPacket<PetInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetInfoMessageType {
        const packet: PetInfoMessageType = {
            petId: wrapper.readInt(),
            name: wrapper.readString(),
            level: wrapper.readInt(),
            maxLevel: wrapper.readInt(),
            experience: wrapper.readInt(),
            experienceRequiredToLevel: wrapper.readInt(),
            energy: wrapper.readInt(),
            maxEnergy: wrapper.readInt(),
            nutrition: wrapper.readInt(),
            maxNutrition: wrapper.readInt(),
            respect: wrapper.readInt(),
            ownerId: wrapper.readInt(),
            age: wrapper.readInt(),
            ownerName: wrapper.readString(),
            breedId: wrapper.readInt(),
            hasFreeSaddle: wrapper.readBoolean(),
            isRiding: wrapper.readBoolean(),
            skillTresholds: [],
            accessRights: 0,
            canBreed: false,
            canHarvest: false,
            canRevive: false,
            rarityLevel: 0,
            maxWellBeingSeconds: 0,
            remainingWellBeingSeconds: 0,
            remainingGrowingSeconds: 0,
            hasBreedingPermission: false,
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.skillTresholds.push(wrapper.readInt());

            count--;
        }

        // The client sorts them numerically before anything reads them (`sort(16)`).
        packet.skillTresholds.sort((a, b) => a - b);

        packet.accessRights = wrapper.readInt();
        packet.canBreed = wrapper.readBoolean();
        packet.canHarvest = wrapper.readBoolean();
        packet.canRevive = wrapper.readBoolean();
        packet.rarityLevel = wrapper.readInt();
        packet.maxWellBeingSeconds = wrapper.readInt();
        packet.remainingWellBeingSeconds = wrapper.readInt();
        packet.remainingGrowingSeconds = wrapper.readInt();
        packet.hasBreedingPermission = wrapper.readBoolean();

        return packet;
    }
}

export interface IRoomAvatarPet {
    subType: string;
    ownerId: number;
    ownerName: string;
    rarityLevel: number;
    hasSaddle: boolean;
    isRiding: boolean;
    canBreed: boolean;
    canHarvest: boolean;
    hasBreedingPermission: boolean;
    petLevel: number;
    petPosture: string;
}
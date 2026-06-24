import type { FurnitureUsagePolicyEnum } from "@nitrodevco/nitro-api";

export interface IRoomWallItem {
    objectId: number;
    spriteId: number;
    wallPosition: string;
    state: string;
    expires: number;
    usagePolicy: FurnitureUsagePolicyEnum;
    ownerId: number;
    ownerName: string;
}
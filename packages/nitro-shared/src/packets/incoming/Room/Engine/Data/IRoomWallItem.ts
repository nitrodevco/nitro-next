import type { FurnitureUsagePolicyEnum } from "@nitrodevco/nitro-api";

export interface IRoomWallItem {
    objectId: number;
    spriteId: number;
    wallPosition: string;
    data: string;
    state: number;
    expires: number;
    usagePolicy: FurnitureUsagePolicyEnum;
    ownerId: number;
    ownerName: string;
}
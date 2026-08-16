import type { FurnitureUsagePolicyEnum, IObjectData } from "@nitrodevco/nitro-api";

export interface IRoomFloorItem {
    objectId: number;
    spriteId: number;
    x: number;
    y: number;
    rotation: number;
    z: number;
    stackHeight: number;
    extra: number;
    stuffData: IObjectData;
    expires: number;
    usagePolicy: FurnitureUsagePolicyEnum;
    ownerId: number;
    ownerName: string;
    spriteName: string | undefined;
}
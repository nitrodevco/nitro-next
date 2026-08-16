import { IRoomAvatarAction } from "./IRoomAvatarAction";

export interface IRoomAvatarUpdate {
    objectId: number;
    sourceX: number;
    sourceY: number;
    sourceZ: number;
    headRotation: number;
    bodyRotation: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    height: number;
    didMove: boolean;
    canStandUp: boolean;
    actions: IRoomAvatarAction[];
}
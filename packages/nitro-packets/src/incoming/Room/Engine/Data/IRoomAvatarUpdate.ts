import { IRoomAvatarAction } from "./IRoomAvatarAction";

export interface IRoomAvatarUpdate {
    objectId: number;
    sourceX: number;
    sourceY: number;
    sourceZ: number;
    headRotation: number;
    bodyRotation: number;
    jumpingPower: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    height: number;
    didMove: boolean;
    canStandUp: boolean;
    skipPositionUpdate: boolean;
    actions: IRoomAvatarAction[];
}
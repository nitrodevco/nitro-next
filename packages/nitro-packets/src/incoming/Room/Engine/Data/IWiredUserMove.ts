import { SlideAvatarMoveType } from '@nitrodevco/nitro-api';

export interface IWiredUserMove {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourceZ: number;
    targetZ: number;
    objectId: number;
    moveType: SlideAvatarMoveType;
    animationTime: number;
    bodyRotation: number;
    headRotation: number;
    /** `NaN` unless the move is a jump. */
    jumpPower: number;
}

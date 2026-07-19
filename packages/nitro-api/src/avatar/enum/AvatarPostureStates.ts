import { AvatarActionStateType } from "./AvatarActionStateType";

export const AvatarPostureStates = new Set<AvatarActionStateType>([
    AvatarActionStateType.Float,
    AvatarActionStateType.Lay,
    AvatarActionStateType.Sit,
    AvatarActionStateType.Stand,
    AvatarActionStateType.Swim,
    AvatarActionStateType.Walk,
]);

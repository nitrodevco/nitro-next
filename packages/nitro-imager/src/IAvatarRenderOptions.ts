import { AvatarActionStateType, AvatarSetType } from "@nitrodevco/nitro-api";

export interface IAvatarRenderOptions {
    figure: string;
    setType: AvatarSetType;
    direction: number;
    headDirection: number;
    posture?: AvatarActionStateType;
    expression?: AvatarActionStateType;
    gesture?: AvatarActionStateType;
    danceId?: number;
    effectId?: number;
    frameNumber?: number;
    imageFormat?: string;
}
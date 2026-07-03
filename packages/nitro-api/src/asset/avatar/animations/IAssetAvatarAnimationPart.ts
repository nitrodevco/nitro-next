import { AvatarFigurePartType } from "#api/avatar";
import { IAssetAvatarAnimationFrame } from "./IAssetAvatarAnimationFrame";

export interface IAssetAvatarAnimationPart {
    setType: AvatarFigurePartType;
    frames: IAssetAvatarAnimationFrame[];
}
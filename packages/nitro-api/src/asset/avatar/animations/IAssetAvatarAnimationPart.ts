import { IAssetAvatarAnimationFrame } from "./IAssetAvatarAnimationFrame";

export interface IAssetAvatarAnimationPart {
    setType: string;
    frames: IAssetAvatarAnimationFrame[];
}
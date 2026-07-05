import { AvatarPartSetType } from "#api/avatar/enum/AvatarPartSetType";
import { IAssetAvatarActivePart } from "./IAssetAvatarActivePart";

export interface IAssetAvatarActivePartSet {
    id: AvatarPartSetType;
    activeParts: IAssetAvatarActivePart[];
}
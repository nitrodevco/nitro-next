import { AvatarGeometryType } from "#api/avatar/enum";
import { IAssetAvatarBodyPart } from "./IAssetAvatarBodyPart";

export interface IAssetAvatarType {
    id: AvatarGeometryType;
    bodyParts: IAssetAvatarBodyPart[];
}
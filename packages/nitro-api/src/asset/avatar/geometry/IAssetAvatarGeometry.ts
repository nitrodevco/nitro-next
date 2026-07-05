import { AvatarGeometryType } from "#api/avatar/enum";

export interface IAssetAvatarGeometry {
    id: AvatarGeometryType;
    width: number;
    height: number;
    dx: number;
    dy: number;
}
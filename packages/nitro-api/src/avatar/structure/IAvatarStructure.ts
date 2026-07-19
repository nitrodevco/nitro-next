import { IAssetAnimation, IFigureData } from "#api/asset";
import { AvatarGeometryType, AvatarScaleType } from "../enum";
import { IAvatarCanvas } from "./IAvatarCanvas";

export interface IAvatarStructure {
    injectFigureData(data: IFigureData): void;
    registerAnimations(data: IAssetAnimation[]): void;
    getCanvas(scaleType: AvatarScaleType, geometryType: AvatarGeometryType): IAvatarCanvas | undefined;
}
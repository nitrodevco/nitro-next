import { IAssetAnimation, IFigureData } from "#api/asset";

export interface IAvatarStructure {
    injectFigureData(data: IFigureData): void;
    registerAnimations(data: IAssetAnimation[]): void;
}
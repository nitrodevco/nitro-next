import type { IAssetManager, IEffectMapLibrary, IFigureMapLibrary, IGraphicAsset } from '../asset';
import { AvatarGenderType, AvatarScaleType } from './enum';
import type { IAvatarEffectListener } from './IAvatarEffectListener';
import type { IAvatarFigureContainer } from './IAvatarFigureContainer';
import type { IAvatarImage } from './IAvatarImage';
import type { IAvatarImageListener } from './IAvatarImageListener';
import type { IAvatarStructure, IStructureData } from './structure';

export interface IAvatarRenderManager {
    init(): void;
    processFigureMap(data: IFigureMapLibrary[], assetUrl: string);
    processEffectMap(data: IEffectMapLibrary[], assetUrl: string);
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType, listener: IAvatarImageListener, effectListener?: IAvatarEffectListener | undefined): IAvatarImage | undefined;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: AvatarGenderType, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: AvatarGenderType): boolean;
    getFigureStringWithFigureIds(figure: string, gender: AvatarGenderType, setIds: number[]): string;
    getMandatoryAvatarPartSetIds(gender: AvatarGenderType, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset | undefined;
    refreshAliases(): void;
    readonly structure: IAvatarStructure;
    readonly structureData: IStructureData;
}

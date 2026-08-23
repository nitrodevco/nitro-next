import { IEffectMapLibrary, IFigureMapLibrary, IGraphicAsset } from '../asset';
import { AvatarGenderType, AvatarScaleType } from './enum';
import { IAvatarEffectListener } from './IAvatarEffectListener';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IAvatarImageListener } from './IAvatarImageListener';
import { IAvatarStructure, IStructureData } from './structure';

export interface IAvatarRenderManager {
    init(): void;
    processFigureMap(data: IFigureMapLibrary[], assetUrl: string);
    processEffectMap(data: IEffectMapLibrary[], assetUrl: string);
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType, listener: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage | undefined;
    createAvatarImageAsync(figure: string, size: AvatarScaleType, gender: AvatarGenderType): Promise<IAvatarImage | undefined>;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    downloadAvatarFigureAsync(container: IAvatarFigureContainer): Promise<void>;
    downloadAvatarEffectAsync(effectId: number): Promise<void>;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: AvatarGenderType, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: AvatarGenderType): boolean;
    getFigureStringWithFigureIds(figure: string, gender: AvatarGenderType, setIds: number[]): string;
    getMandatoryAvatarPartSetIds(gender: AvatarGenderType, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset | undefined;
    refreshAliases(): void;
    readonly structure: IAvatarStructure;
    readonly structureData: IStructureData;
}

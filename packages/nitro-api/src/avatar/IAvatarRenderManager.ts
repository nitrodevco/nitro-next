import { IAssetAvatarActionData, IAssetAvatarAnimation, IEffectMapLibrary, IFigureData, IFigureMapLibrary, IGraphicAsset } from '../asset';
import { AvatarGenderType, AvatarScaleType } from './enum';
import { IAvatarEffectListener } from './IAvatarEffectListener';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IAvatarImageListener } from './IAvatarImageListener';
import { IEffectAssetDownloadLibrary } from './IEffectAssetDownloadLibrary';
import { IAvatarStructure, IStructureData } from './structure';

export interface IAvatarRenderManager {
    init(): void;
    /** `avatar.actions.url`, applied over the baked-in action set. */
    processAvatarActions(data: IAssetAvatarActionData): void;
    /** `avatar.animations.url`: the per-action figure part frame table. */
    processAvatarAnimations(data: IAssetAvatarAnimation[]): void;
    processFigureMap(data: IFigureMapLibrary[], assetUrl: string);
    processEffectMap(data: IEffectMapLibrary[], assetUrl: string);
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType, listener: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage | undefined;
    createAvatarImageAsync(figure: string, size: AvatarScaleType, gender: AvatarGenderType): Promise<IAvatarImage | undefined>;
    /** The generic placeholder figure rendered in place of an ignored user. */
    createBlockedAvatarImage(figure: string, size: AvatarScaleType): IAvatarImage;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    downloadAvatarFigureAsync(container: IAvatarFigureContainer): Promise<void>;
    downloadAvatarEffectAsync(effectId: number): Promise<void>;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: AvatarGenderType, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: AvatarGenderType): boolean;
    getFigureStringWithFigureIds(figure: string, gender: AvatarGenderType, setIds: number[]): string;
    getMandatoryAvatarPartSetIds(gender: AvatarGenderType, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset | undefined;
    refreshAliases(): void;
    /** Every live avatar image drops its caches (assets were replaced). */
    resetAllCaches(): void;
    /** Unloads every downloaded, non-mandatory figure library. */
    purgeAssets(): void;
    /** The carry-item ids the CarryItem action knows about. */
    getItemIds(): string[];
    injectFigureData(data: IFigureData): void;
    readonly effectMap: Map<string, IEffectAssetDownloadLibrary[]> | undefined;
    readonly isReady: boolean;
    readonly structure: IAvatarStructure;
    readonly structureData: IStructureData;
}

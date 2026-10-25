import { IAvatarRenderData, IEffectMapLibrary, IFigureData, IFigureMapLibrary, IGraphicAsset } from '../asset';
import { AvatarGenderType, AvatarScaleType } from './enum';
import { IAvatarEffectListener } from './IAvatarEffectListener';
import { IAvatarFigureContainer } from './IAvatarFigureContainer';
import { IAvatarImage } from './IAvatarImage';
import { IAvatarImageListener } from './IAvatarImageListener';
import { IEffectAssetDownloadLibrary } from './IEffectAssetDownloadLibrary';
import { IAvatarStructure, IStructureData } from './structure';

export interface IAvatarRenderManager {
    /** Starts from the hotel's avatar data (the avatar render library's bundle, read by the renderer's `LoadAvatarData`). */
    init(data: IAvatarRenderData): void;
    processFigureMap(data: IFigureMapLibrary[], assetUrl: string);
    processEffectMap(data: IEffectMapLibrary[], assetUrl: string);
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType | undefined, listener: IAvatarImageListener, effectListener?: IAvatarEffectListener): IAvatarImage | undefined;
    createAvatarImageAsync(figure: string, size: AvatarScaleType, gender: AvatarGenderType): Promise<IAvatarImage | undefined>;
    /** The generic placeholder figure rendered in place of an ignored user. */
    createBlockedAvatarImage(figure: string, size: AvatarScaleType): IAvatarImage;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    downloadAvatarFigureAsync(container: IAvatarFigureContainer): Promise<void>;
    downloadAvatarEffectAsync(effectId: number): Promise<void>;
    /**
     * The sets of a figure string that do not draw, as `type-set`: a part type or set the figure
     * data does not have, a set no library holds any part of, or one needing a library that is not
     * loaded (a failed download included, which the renderer otherwise treats as done). Empty when
     * all of it draws.
     */
    getUndrawableFigureParts(figure: string): string[];
    /** Whether the effect (an id, or `dance.<n>`) is in the effect map and every library of it is loaded. */
    isAvatarEffectLoaded(effect: number | string): boolean;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: AvatarGenderType, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: AvatarGenderType): boolean;
    getFigureStringWithFigureIds(figure: string, gender: AvatarGenderType, setIds: number[]): string;
    getMandatoryAvatarPartSetIds(gender: AvatarGenderType, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset | undefined;
    refreshAliases(): void;
    /** Every live avatar image drops its caches (assets were replaced). */
    resetAllCaches(): void;
    /** Unloads every downloaded, non-mandatory figure library no live avatar image or held figure needs. */
    purgeAssets(): void;
    /** Keeps a figure's libraries through `purgeAssets` - for what draws their textures without an avatar image - until `releaseFigure`. */
    holdFigure(container: IAvatarFigureContainer): void;
    releaseFigure(container: IAvatarFigureContainer): void;
    /** The carry-item ids the CarryItem action knows about. */
    getItemIds(): string[];
    injectFigureData(data: IFigureData): void;
    readonly effectMap: Map<string, IEffectAssetDownloadLibrary[]> | undefined;
    readonly isReady: boolean;
    readonly structure: IAvatarStructure;
    readonly structureData: IStructureData;
}

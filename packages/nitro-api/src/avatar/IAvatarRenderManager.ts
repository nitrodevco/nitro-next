import type { IAssetManager, IGraphicAsset } from '../asset';
import type { IAvatarEffectListener } from './IAvatarEffectListener';
import type { IAvatarFigureContainer } from './IAvatarFigureContainer';
import type { IAvatarImage } from './IAvatarImage';
import type { IAvatarImageListener } from './IAvatarImageListener';
import type { IStructureData } from './structure';

export interface IAvatarRenderManager {
    init(): Promise<void>;
    createFigureContainer(figure: string): IAvatarFigureContainer;
    isFigureContainerReady(container: IAvatarFigureContainer): boolean;
    createAvatarImage(
        figure: string,
        size: string,
        gender: string,
        listener?: IAvatarImageListener,
        effectListener?: IAvatarEffectListener,
    ): IAvatarImage;
    downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void;
    getFigureClubLevel(container: IAvatarFigureContainer, gender: string, searchParts?: string[]): number;
    isValidFigureSetForGender(setId: number, gender: string): boolean;
    getFigureStringWithFigureIds(k: string, _arg_2: string, _arg_3: number[]): string;
    getMandatoryAvatarPartSetIds(k: string, _arg_2: number): string[];
    getAssetByName(name: string): IGraphicAsset;
    assets: IAssetManager;
    structureData: IStructureData;
}

import type { AvatarFigurePartType, AvatarScaleType, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IAvatarImageListener, IAvatarRenderManager, IAvatarStructure, IEffectMapLibrary, IFigureMapLibrary, IFigurePartSet, IGraphicAsset, IStructureData } from '@nitrodevco/nitro-api';
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarSetType } from '@nitrodevco/nitro-api';

import { AssetAliasCollection } from './alias';
import { AvatarAssetDownloadManager } from './AvatarAssetDownloadManager';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarImage } from './AvatarImage';
import { AvatarStructure } from './AvatarStructure';
import { HabboAvatarActions, HabboAvatarActionsDefault, HabboAvatarAnimations, HabboAvatarFigureDataDefault, HabboAvatarGeometry, HabboAvatarPartSets } from './data';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { FigureDataContainer } from './FigureDataContainer';
import { PlaceHolderAvatarImage } from './PlaceHolderAvatarImage';

export class AvatarRenderManager implements IAvatarRenderManager {
    private static DEFAULT_FIGURE: string = 'hd-99999-99999';

    private _structure: AvatarStructure;
    private _aliasCollection: AssetAliasCollection;
    private _avatarAssetDownloadManager: AvatarAssetDownloadManager;
    private _effectAssetDownloadManager: EffectAssetDownloadManager;
    private _placeHolderFigure: AvatarFigureContainer | undefined;
    private _isReady: boolean;

    constructor() {
        this._structure = new AvatarStructure();
        this._aliasCollection = new AssetAliasCollection();
        this._avatarAssetDownloadManager = new AvatarAssetDownloadManager(this._structure);
        this._effectAssetDownloadManager = new EffectAssetDownloadManager(this._structure);
        this._placeHolderFigure = undefined;
        this._isReady = false;
    }

    public init(): void {
        this._structure.initGeometry(HabboAvatarGeometry);
        this._structure.initPartSets(HabboAvatarPartSets);
        this._structure.actionManager.updateActions(HabboAvatarActionsDefault);
        this._structure.actionManager.updateActions(HabboAvatarActions);
        this._structure.initAnimation(HabboAvatarAnimations);
        this._structure.initFigureData(HabboAvatarFigureDataDefault);
    }

    public processFigureMap(data: IFigureMapLibrary[], assetUrl: string) {
        this._avatarAssetDownloadManager.processFigureMap(data, assetUrl);
        this._avatarAssetDownloadManager.processMissingLibraries();
        this._avatarAssetDownloadManager.setReady();
        this._avatarAssetDownloadManager.processPendingContainers();
    }

    public processEffectMap(data: IEffectMapLibrary[], assetUrl: string) {
        this._effectAssetDownloadManager.processEffectMap(data, assetUrl);
        this._effectAssetDownloadManager.processMissingLibraries();
        this._avatarAssetDownloadManager.setReady();
        this._effectAssetDownloadManager.processPendingDownloads();
    }

    public createFigureContainer(figure: string): IAvatarFigureContainer {
        return new AvatarFigureContainer(figure);
    }

    public isFigureContainerReady(container: IAvatarFigureContainer): boolean {
        return this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container);
    }

    public createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType, listener: IAvatarImageListener, effectListener: IAvatarEffectListener | undefined = undefined): IAvatarImage | undefined {
        const container = new AvatarFigureContainer(figure);

        if (gender) this.validateAvatarFigure(container, gender);

        if (this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container)) return new AvatarImage(this._structure, this._aliasCollection, container, size, this._effectAssetDownloadManager, effectListener);

        if (!this._placeHolderFigure) this._placeHolderFigure = new AvatarFigureContainer(AvatarRenderManager.DEFAULT_FIGURE);

        this._avatarAssetDownloadManager.downloadAvatarFigure(container, listener);

        return new PlaceHolderAvatarImage(this._structure, this._aliasCollection, this._placeHolderFigure, size, this._effectAssetDownloadManager);
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void {
        this._avatarAssetDownloadManager.downloadAvatarFigure(container, listener);
    }

    public getFigureClubLevel(container: IAvatarFigureContainer, gender: AvatarGenderType, searchParts: string[] = []): number {
        const figureData = this._structure.figureData;
        const parts = container.getPartTypeIds();

        let clubLevel = 0;

        for (const part of parts) {
            const set = figureData.getSetType(part);

            if (!set) continue;

            const setId = container.getPartSetId(part);
            const partSet = set.getPartSet(setId);
            const palette = figureData.getPalette(set.paletteId);
            const colors = container.getPartColorIds(part);

            if (!partSet) continue;

            clubLevel = Math.max(partSet.clubLevel, clubLevel);

            if (palette && colors) for (const colorId of colors) {
                const color = palette.getColor(colorId);

                if (!color) continue;

                clubLevel = Math.max(color.clubLevel, clubLevel);
            }
        }

        if (!searchParts) searchParts = this._structure.getBodyPartsUnordered(AvatarSetType.Full);

        for (const part of searchParts) {
            const set = figureData.getSetType(part);

            if (!set) continue;

            if (parts.indexOf(part as AvatarFigurePartType) === -1) clubLevel = Math.max(set.optionalFromClubLevel(gender), clubLevel);
        }

        return clubLevel;
    }

    public isValidFigureSetForGender(setId: number, gender: AvatarGenderType): boolean {
        const structure = this.structureData;
        const partSet = structure.getFigurePartSet(setId);

        return !!(partSet && (partSet.gender === gender || partSet.gender === AvatarGenderType.Unisex));
    }

    public getFigureStringWithFigureIds(figure: string, gender: AvatarGenderType, setIds: number[]): string {
        const container = new FigureDataContainer();

        container.loadAvatarData(figure, gender);

        for (const partSet of this.resolveFigureSets(setIds)) container.savePartData(partSet.type, partSet.id, container.getColorIds(partSet.type));

        return container.getFigureString();
    }

    public getMandatoryAvatarPartSetIds(gender: AvatarGenderType, _arg_2: number): string[] {
        return this._structure.getMandatorySetTypeIds(gender, _arg_2);
    }

    public getAssetByName(name: string): IGraphicAsset | undefined {
        return this._aliasCollection.getAsset(name);
    }

    public refreshAliases(): void {
        this._aliasCollection.init();
    }

    public get isReady(): boolean {
        return this._isReady;
    }

    public get structure(): IAvatarStructure {
        return this._structure;
    }

    public get structureData(): IStructureData {
        return this._structure.figureData;
    }

    private validateAvatarFigure(container: IAvatarFigureContainer, gender: AvatarGenderType): boolean {
        let isValid = false;

        const typeIds = this._structure.getMandatorySetTypeIds(gender, 2);

        if (typeIds) {
            const figureData = this._structure.figureData;

            for (const id of typeIds) {
                if (!container.hasPartType(id)) {
                    const figurePartSet = this._structure.getDefaultPartSet(id, gender);

                    if (!figurePartSet) continue;

                    container.updatePart(id, figurePartSet.id, [0]);

                    isValid = true;
                } else {
                    const setType = figureData.getSetType(id);

                    if (!setType) continue;

                    const figurePartSet = setType.getPartSet(container.getPartSetId(id));

                    if (figurePartSet) continue;

                    const partSet = this._structure.getDefaultPartSet(id, gender);

                    if (!partSet) continue;

                    container.updatePart(id, partSet.id, [0]);

                    isValid = true;
                }
            }
        }

        return !isValid;
    }

    private resolveFigureSets(setIds: number[]): IFigurePartSet[] {
        const structure = this.structureData;
        const partSets: IFigurePartSet[] = [];

        for (const setId of setIds) {
            const partSet = structure.getFigurePartSet(setId);

            if (partSet) partSets.push(partSet);
        }

        return partSets;
    }
}

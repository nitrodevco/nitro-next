import { AvatarFigurePartType, AvatarGenderType, AvatarScaleType, AvatarSetType, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IAvatarImageListener, IAvatarRenderData, IAvatarRenderManager, IAvatarStructure, IEffectAssetDownloadLibrary, IEffectMapLibrary, IFigureData, IFigureMapLibrary, IFigurePartSet, IGraphicAsset, IStructureData } from '@nitrodevco/nitro-api';

import { AssetAliasCollection } from './alias';
import { AvatarAssetDownloadManager } from './AvatarAssetDownloadManager';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarImage } from './AvatarImage';
import { AvatarStructure } from './AvatarStructure';
import { BlockedAvatarImage } from './BlockedAvatarImage';
import { HabboAvatarActionsDefault } from './data';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { FigureDataContainer } from './FigureDataContainer';
import { PlaceHolderAvatarImage } from './PlaceHolderAvatarImage';

/** Port of Flash `AvatarRenderManager`. */
export class AvatarRenderManager implements IAvatarRenderManager {
    private static DEFAULT_FIGURE: string = 'hd-99999-99999';

    private _structure: AvatarStructure;
    private _aliasCollection: AssetAliasCollection;
    private _avatarAssetDownloadManager: AvatarAssetDownloadManager;
    private _effectAssetDownloadManager: EffectAssetDownloadManager;
    private _placeHolderFigure: AvatarFigureContainer | undefined;
    private _blockedFigure: AvatarFigureContainer | undefined;
    /** Every full avatar image alive, so `resetAllCaches` can reach them (they drop out on dispose). */
    private _activeImages: Set<AvatarImage> = new Set();
    /** Figures drawn straight from their libraries' textures, outside any avatar image (`holdFigure`). */
    private _heldFigures: Set<IAvatarFigureContainer> = new Set();
    private _figureMapReady: boolean = false;
    private _effectMapReady: boolean = false;

    constructor() {
        this._structure = new AvatarStructure();
        this._aliasCollection = new AssetAliasCollection();
        // Flash `onAvatarAssetsLibraryReady` / `onEffectAssetsLibraryReady`: a library's aliases count from the moment it loads
        this._avatarAssetDownloadManager = new AvatarAssetDownloadManager(this._structure, name => this._aliasCollection.onAvatarAssetsLibraryReady(name));
        this._effectAssetDownloadManager = new EffectAssetDownloadManager(this._structure, name => this._aliasCollection.onAvatarAssetsLibraryReady(name));
        this._placeHolderFigure = undefined;
        this._blockedFigure = undefined;
    }

    /**
     * Starts from the hotel's avatar data (`LoadAvatarData`, the avatar render library's bundle): the tables Flash's
     * render library carried, then the hotel's actions over the built-in set and its animations -
     * Flash's `initActions` then `updateActions`.
     */
    public init(data: IAvatarRenderData): void {
        this._structure.initGeometry(data.geometry);
        this._structure.initPartSets(data.partSets);
        // Flash `initActions`: the baked-in set - the stand and the snowwar postures, which are
        // Flash code rather than an asset - with the render library's action offsets.
        this._structure.updateActions({ actions: HabboAvatarActionsDefault.actions, actionOffsets: data.actionOffsets });
        this._structure.initFigureData(data.figureData);
        // Flash `registerBuiltInAnimations`: the animations embedded in the client rather than in an effect library
        this._structure.registerAnimations(data.builtInAnimations);

        if (data.actions) this._structure.updateActions(data.actions);
        if (data.animations) this._structure.initAnimation(data.animations);

        // Flash builds the alias collection with `init()`: the aliases of every library already loaded
        this._aliasCollection.init();
    }

    public processFigureMap(data: IFigureMapLibrary[], assetUrl: string) {
        this._avatarAssetDownloadManager.processFigureMap(data, assetUrl);
        this._avatarAssetDownloadManager.processMissingLibraries();
        this._avatarAssetDownloadManager.setReady();
        this._avatarAssetDownloadManager.processPendingContainers();

        this._figureMapReady = true;
    }

    public processEffectMap(data: IEffectMapLibrary[], assetUrl: string) {
        this._effectAssetDownloadManager.processEffectMap(data, assetUrl);
        this._effectAssetDownloadManager.processMissingLibraries();
        this._effectAssetDownloadManager.setReady();
        this._effectAssetDownloadManager.processPendingDownloads();

        this._effectMapReady = true;
    }

    public createFigureContainer(figure: string): IAvatarFigureContainer {
        return new AvatarFigureContainer(figure);
    }

    public isFigureContainerReady(container: IAvatarFigureContainer): boolean {
        return this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container);
    }

    public createAvatarImage(figure: string, size: AvatarScaleType, gender: AvatarGenderType | undefined, listener: IAvatarImageListener, effectListener: IAvatarEffectListener | undefined = undefined): IAvatarImage | undefined {
        const container = new AvatarFigureContainer(figure);

        if (gender) this.validateAvatarFigure(container, gender);

        if (this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container)) return this.registerImage(new AvatarImage(this._structure, this._aliasCollection, container, size, this._effectAssetDownloadManager, effectListener, image => this.unregisterImage(image)));

        if (!this._placeHolderFigure) this._placeHolderFigure = new AvatarFigureContainer(AvatarRenderManager.DEFAULT_FIGURE);

        this._avatarAssetDownloadManager.downloadAvatarFigure(container, listener);

        return new PlaceHolderAvatarImage(this._structure, this._aliasCollection, this._placeHolderFigure, size, this._effectAssetDownloadManager);
    }

    public async createAvatarImageAsync(figure: string, size: AvatarScaleType, gender: AvatarGenderType): Promise<IAvatarImage | undefined> {
        const container = new AvatarFigureContainer(figure);

        if (gender) this.validateAvatarFigure(container, gender);

        if (!this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container)) await this._avatarAssetDownloadManager.downloadAvatarFigureAsync(container);

        return this.registerImage(new AvatarImage(this._structure, this._aliasCollection, container, size, this._effectAssetDownloadManager, undefined, image => this.unregisterImage(image)));
    }

    public createBlockedAvatarImage(figure: string, size: AvatarScaleType): IAvatarImage {
        if (!this._blockedFigure) this._blockedFigure = new AvatarFigureContainer(AvatarRenderManager.DEFAULT_FIGURE);

        return new BlockedAvatarImage(this._structure, this._aliasCollection, this._blockedFigure, size, this._effectAssetDownloadManager);
    }

    private registerImage(image: AvatarImage): AvatarImage {
        this._activeImages.add(image);

        return image;
    }

    private unregisterImage(image: AvatarImage): void {
        this._activeImages.delete(image);
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void {
        this._avatarAssetDownloadManager.downloadAvatarFigure(container, listener);
    }

    public async downloadAvatarFigureAsync(container: IAvatarFigureContainer): Promise<void> {
        await this._avatarAssetDownloadManager.downloadAvatarFigureAsync(container);
    }

    public async downloadAvatarEffectAsync(effectId: number): Promise<void> {
        await this._effectAssetDownloadManager.downloadAvatarEffectAsync(effectId);
    }

    public getUndrawableFigureParts(figure: string): string[] {
        return this._avatarAssetDownloadManager.getUndrawableParts(new AvatarFigureContainer(figure));
    }

    public isAvatarEffectLoaded(effect: number | string): boolean {
        return this._effectAssetDownloadManager.isAvatarEffectLoaded(effect.toString());
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

        // no explicit list: every body part of the full set, so a missing mandatory-for-free part counts too
        if (!searchParts || !searchParts.length) searchParts = this._structure.getBodyPartsUnordered(AvatarSetType.Full);

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

        const unisex: string = AvatarGenderType.Unisex;

        return !!(partSet && (partSet.gender.toUpperCase() === gender.toUpperCase() || partSet.gender.toUpperCase() === unisex));
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

    public getItemIds(): string[] {
        return this._structure.getItemIds();
    }

    public injectFigureData(data: IFigureData): void {
        this._structure.injectFigureData(data);

        // the mandatory-set cache was built from the previous figure data
        this._structure.init();
    }

    /** Flash `resetAllCaches`: after an asset reset every live figure re-renders from scratch. */
    public resetAllCaches(): void {
        for (const image of [ ...this._activeImages ]) {
            if (image.disposed) {
                this._activeImages.delete(image);

                continue;
            }

            image.resetCache();
        }
    }

    /**
     * Keeps a figure's libraries loaded through `purgeAssets` until `releaseFigure`: for what draws
     * their textures without an avatar image (the avatar editor's part thumbnails). Flash never
     * unloaded a clothing library, so nothing there could draw one after it went.
     */
    public holdFigure(container: IAvatarFigureContainer): void {
        this._heldFigures.add(container);
    }

    public releaseFigure(container: IAvatarFigureContainer): void {
        this._heldFigures.delete(container);
    }

    /**
     * Unloads the clothing and effect libraries no live avatar image needs. The placeholder and
     * blocked figures are kept too: those images are not registered, and redraw from their libraries;
     * so are the held figures (`holdFigure`).
     */
    public purgeAssets(): void {
        const figures: IAvatarFigureContainer[] = [];
        const effects = new Set<number>();

        for (const image of [ ...this._activeImages ]) {
            if (image.disposed) {
                this._activeImages.delete(image);

                continue;
            }

            figures.push(image.getFigure());

            if (image.effectIdInUse > -1) effects.add(image.effectIdInUse);
        }

        if (this._placeHolderFigure) figures.push(this._placeHolderFigure);
        if (this._blockedFigure) figures.push(this._blockedFigure);

        figures.push(...this._heldFigures);

        this._avatarAssetDownloadManager.purge(figures);
        this._effectAssetDownloadManager.purge(effects);
    }

    public get effectMap(): Map<string, IEffectAssetDownloadLibrary[]> | undefined {
        if (!this._effectMapReady) return undefined;

        return this._effectAssetDownloadManager.map;
    }

    public get isReady(): boolean {
        return this._figureMapReady && this._effectMapReady;
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

                    container.updatePart(id, figurePartSet.id, [ 0 ]);

                    isValid = true;
                } else {
                    const setType = figureData.getSetType(id);

                    if (!setType) continue;

                    const figurePartSet = setType.getPartSet(container.getPartSetId(id));

                    if (figurePartSet) continue;

                    const partSet = this._structure.getDefaultPartSet(id, gender);

                    if (!partSet) continue;

                    container.updatePart(id, partSet.id, [ 0 ]);

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

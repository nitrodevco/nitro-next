import { IAvatarFigureContainer, IAvatarImageListener, IFigureMapLibrary } from '@nitrodevco/nitro-api';

import { AvatarAssetDownloadLibrary } from './AvatarAssetDownloadLibrary';
import { AvatarStructure } from './AvatarStructure';

/** Port of Flash `AvatarAssetDownloadManager`. */
export class AvatarAssetDownloadManager {
    /** The libraries every figure needs (Flash `LIB_BODY`, `LIB_ITEMS`); the manager is not ready until they are in. */
    public static readonly MANDATORY_LIBRARIES: string[] = [ 'hh_human_body', 'hh_human_item' ];
    /**
     * Flash downloads 6 libraries at once, and 16 from a host that can take it (`//rumba.sulake.com`).
     * Every figure library is a request of its own - a clothing tab asks for one per part shown - so
     * the waves of 6 were what an editor tab spent waiting on; the asset host serves HTTP/2 and 3,
     * which carry every request on the one connection, so it is the fast host's 16.
     */
    private static MAX_SIMULTANEOUS_DOWNLOADS: number = 16;

    private _structure: AvatarStructure;
    private _libraries: Map<string, AvatarAssetDownloadLibrary> = new Map();
    private _missingMandatoryLibs: string[] = AvatarAssetDownloadManager.MANDATORY_LIBRARIES.slice();
    private _figureMap: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _pendingContainers: [IAvatarFigureContainer, IAvatarImageListener][] = [];
    private _figureListeners: Map<string, IAvatarImageListener[]> = new Map();
    private _incompleteFigures: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _pendingDownloadQueue: AvatarAssetDownloadLibrary[] = [];
    private _currentDownloads: AvatarAssetDownloadLibrary[] = [];
    private _isReady: boolean = false;
    /** Flash's `LIBRARY_LOADED` event: `AvatarRenderManager` registers the library's aliases. */
    private _onLibraryLoaded: ((libraryName: string) => void) | undefined;

    constructor(structure: AvatarStructure, onLibraryLoaded: ((libraryName: string) => void) | undefined = undefined) {
        this._structure = structure;
        this._onLibraryLoaded = onLibraryLoaded;
    }

    public processFigureMap(data: IFigureMapLibrary[], assetUrl: string): void {
        if (!data) return;

        for (const library of data) {
            if (!library || this._libraries.has(library.id)) continue;

            const downloadLibrary = new AvatarAssetDownloadLibrary(library.id, library.revision ?? 0, assetUrl, lib => this.onLibraryComplete(lib));

            this._libraries.set(library.id, downloadLibrary);

            if (!library.parts?.length) continue;

            for (const part of library.parts) {
                const partString = `${part.type}:${part.id}`;

                let existing = this._figureMap.get(partString);

                if (!existing) {
                    existing = [];

                    this._figureMap.set(partString, existing);
                }

                existing.push(downloadLibrary);
            }
        }
    }

    /** Flash `loadMandatoryLibs`: the body and item libraries are queued right away and never purged. */
    public processMissingLibraries(): void {
        for (const name of this._missingMandatoryLibs.slice()) {
            const library = this._libraries.get(name);

            if (!library) continue;

            library.isMandatory = true;

            this.downloadLibrary(library);
        }
    }

    public processPendingContainers(): void {
        for (const [ container, listener ] of this._pendingContainers) this.downloadAvatarFigure(container, listener);

        this._pendingContainers = [];
    }

    public isAvatarFigureContainerReady(container: IAvatarFigureContainer): boolean {
        if (!this._isReady) return false;

        return !this.getAvatarFigurePendingLibraries(container)?.length;
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void {
        if (!this._isReady) {
            this._pendingContainers.push([ container, listener ]);

            return;
        }

        const figure = container.getFigureString();
        const libraries = this.getAvatarFigurePendingLibraries(container);

        if (libraries.length) {
            let listeners = this._figureListeners.get(figure);

            if (!listeners) {
                listeners = [];

                this._figureListeners.set(figure, listeners);
            }

            listeners.push(listener);

            this._incompleteFigures.set(figure, libraries);

            for (const library of libraries) this.downloadLibrary(library);
        } else listener.resetFigure(figure);
    }

    public async downloadAvatarFigureAsync(container: IAvatarFigureContainer): Promise<void> {
        if (!this._isReady) return;

        const libraries = this.getAvatarFigurePendingLibraries(container);

        if (libraries.length) for (const library of libraries) await this.downloadLibraryAsync(library);
    }

    public setReady(): void {
        this._isReady = true;
    }

    public isMissingMandatoryLibs(): boolean {
        return this._missingMandatoryLibs.length > 0;
    }

    /**
     * Flash `purge` unloaded every downloaded library except the mandatory ones - safe there only
     * because nothing called it. Here it runs on the purge interval, so it keeps what is still in
     * use: the libraries of `inUse` (every live figure) and of the figures still downloading, whose
     * completion waits on all of theirs being loaded. The next figure needing a purged one downloads it again.
     */
    public purge(inUse: Iterable<IAvatarFigureContainer>): void {
        const keep = new Set<AvatarAssetDownloadLibrary>();

        for (const container of inUse) {
            for (const library of this.getAvatarFigureLibraries(container)) keep.add(library);
        }

        for (const libraries of this._incompleteFigures.values()) {
            for (const library of libraries) keep.add(library);
        }

        for (const library of this._libraries.values()) {
            if (library.isLoaded && !library.isMandatory && !keep.has(library)) library.purge();
        }
    }

    /**
     * `IAvatarRenderManager.getUndrawableFigureParts`: the figure's sets, as `type-set`, that do not
     * draw - unknown to the figure data, with no part any library holds, or needing a library that
     * is not loaded. A set naming some parts no library holds still draws: Habbo's figure data lists
     * layers that have no art (`rs`, `lc`, `hrb` ...), and the renderer skips them as Flash did.
     */
    public getUndrawableParts(container: IAvatarFigureContainer): string[] {
        const undrawable: string[] = [];
        const figureData = this._structure?.figureData;

        for (const partType of container.getPartTypeIds()) {
            const setId = container.getPartSetId(partType);
            const partSet = figureData?.getSetType(partType)?.getPartSet(setId);
            const libraries = partSet ? partSet.parts.flatMap(part => this._figureMap.get(`${part.type}:${part.id}`) ?? []) : [];

            if (!libraries.length || !libraries.every(library => library.isLoaded)) undrawable.push(`${partType}-${setId}`);
        }

        return undrawable;
    }

    private getAvatarFigurePendingLibraries(container: IAvatarFigureContainer): AvatarAssetDownloadLibrary[] {
        return this.getAvatarFigureLibraries(container).filter(library => !library.isReady);
    }

    /** Every library holding a part of the figure, loaded or not. */
    private getAvatarFigureLibraries(container: IAvatarFigureContainer): AvatarAssetDownloadLibrary[] {
        const libraries: AvatarAssetDownloadLibrary[] = [];

        if (!container || !this._structure) return libraries;

        const figureData = this._structure.figureData;

        if (!figureData) return libraries;

        for (const partType of container.getPartTypeIds()) {
            const set = figureData.getSetType(partType);

            if (!set) continue;

            const figurePartSet = set.getPartSet(container.getPartSetId(partType));

            if (!figurePartSet) continue;

            for (const part of figurePartSet.parts) {
                const partLibraries = this._figureMap.get(`${part.type}:${part.id}`);

                if (!partLibraries) continue;

                for (const library of partLibraries) {
                    if (!library || libraries.indexOf(library) >= 0) continue;

                    libraries.push(library);
                }
            }
        }

        return libraries;
    }

    private downloadLibrary(library: AvatarAssetDownloadLibrary): void {
        if (!library || library.isReady || (this._pendingDownloadQueue.indexOf(library) >= 0) || (this._currentDownloads.indexOf(library) >= 0)) return;

        this._pendingDownloadQueue.push(library);

        this.processDownloadQueue();
    }

    private async downloadLibraryAsync(library: AvatarAssetDownloadLibrary): Promise<void> {
        if (!library || library.isReady) return;

        await library.downloadAssetAsync();
    }

    /** At most `MAX_SIMULTANEOUS_DOWNLOADS` in flight; the rest wait their turn. */
    private processDownloadQueue(): void {
        while (this._pendingDownloadQueue.length && (this._currentDownloads.length < AvatarAssetDownloadManager.MAX_SIMULTANEOUS_DOWNLOADS)) {
            const library = this._pendingDownloadQueue.shift();

            // Ready while it waited (`downloadAvatarFigureAsync` fetches outside the queue): there is no
            // download to finish, so a slot taken for it would never be given back - enough of those and
            // the queue stops for good (the avatar editor's part thumbnails stayed on the download icon).
            if (!library || library.isReady) continue;

            this._currentDownloads.push(library);

            library.downloadAsset();
        }
    }

    private onLibraryComplete(library: AvatarAssetDownloadLibrary): void {
        if (!library) return;

        if (library.isLoaded) this._onLibraryLoaded?.(library.libraryName);

        const loadedFigures: string[] = [];

        for (const [ figure, libraries ] of this._incompleteFigures.entries()) {
            let isReady = true;

            for (const pending of libraries) {
                if (!pending || pending.isReady) continue;

                isReady = false;

                break;
            }

            if (!isReady) continue;

            loadedFigures.push(figure);

            const listeners = this._figureListeners.get(figure);

            if (listeners) for (const listener of listeners) listener.resetFigure(figure);

            this._figureListeners.delete(figure);
        }

        for (const figure of loadedFigures) this._incompleteFigures.delete(figure);

        const mandatoryIndex = this._missingMandatoryLibs.indexOf(library.libraryName);

        if (mandatoryIndex !== -1) this._missingMandatoryLibs.splice(mandatoryIndex, 1);

        let index = 0;

        while (index < this._currentDownloads.length) {
            const download = this._currentDownloads[index];

            if (download && download.libraryName === library.libraryName) {
                this._currentDownloads.splice(index, 1);

                continue;
            }

            index++;
        }

        this.processDownloadQueue();
    }
}

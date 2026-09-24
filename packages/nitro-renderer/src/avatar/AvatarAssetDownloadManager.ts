import { IAvatarFigureContainer, IAvatarImageListener, IFigureMapLibrary } from '@nitrodevco/nitro-api';

import { AvatarAssetDownloadLibrary } from './AvatarAssetDownloadLibrary';
import { AvatarStructure } from './AvatarStructure';

export class AvatarAssetDownloadManager {
    /** The libraries every figure needs (Flash `LIB_BODY`, `LIB_ITEMS`); the manager is not ready until they are in. */
    private static MANDATORY_LIBRARIES: string[] = [ 'hh_human_body', 'hh_human_item' ];
    private static MAX_SIMULTANEOUS_DOWNLOADS: number = 6;

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

    /** Flash `purge`: unload every downloaded library except the mandatory ones. */
    public purge(): void {
        for (const library of this._libraries.values()) {
            if (library.isLoaded && !library.isMandatory) library.purge();
        }
    }

    private getAvatarFigurePendingLibraries(container: IAvatarFigureContainer): AvatarAssetDownloadLibrary[] {
        const pendingLibraries: AvatarAssetDownloadLibrary[] = [];

        if (!container || !this._structure) return pendingLibraries;

        const figureData = this._structure.figureData;

        if (!figureData) return pendingLibraries;

        for (const partType of container.getPartTypeIds()) {
            const set = figureData.getSetType(partType);

            if (!set) continue;

            const figurePartSet = set.getPartSet(container.getPartSetId(partType));

            if (!figurePartSet) continue;

            for (const part of figurePartSet.parts) {
                const libraries = this._figureMap.get(`${part.type}:${part.id}`);

                if (!libraries) continue;

                for (const library of libraries) {
                    if (!library || library.isReady || pendingLibraries.indexOf(library) >= 0) continue;

                    pendingLibraries.push(library);
                }
            }
        }

        return pendingLibraries;
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

            if (!library) continue;

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

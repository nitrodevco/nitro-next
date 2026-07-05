import type { IAvatarAssetDownloadLibrary, IAvatarFigureContainer, IAvatarImageListener, IFigureMapLibrary } from '@nitrodevco/nitro-api';

import { AvatarAssetDownloadLibrary } from './AvatarAssetDownloadLibrary';
import type { AvatarStructure } from './AvatarStructure';

export class AvatarAssetDownloadManager {
    private static MANDATORY_LIBRARIES: string[] = ['bd:1', 'li:0'];

    private _structure: AvatarStructure;
    private _missingMandatoryLibs: string[] = AvatarAssetDownloadManager.MANDATORY_LIBRARIES;
    private _figureMap: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _pendingContainers: [IAvatarFigureContainer, IAvatarImageListener][] = [];
    private _figureListeners: Map<string, IAvatarImageListener[]> = new Map();
    private _incompleteFigures: Map<string, AvatarAssetDownloadLibrary[]> = new Map();
    private _pendingDownloadQueue: AvatarAssetDownloadLibrary[] = [];
    private _currentDownloads: AvatarAssetDownloadLibrary[] = [];
    private _libraryNames: string[] = [];
    private _isReady: boolean = false;

    constructor(structure: AvatarStructure) {
        this._structure = structure;
    }

    public processFigureMap(data: IFigureMapLibrary[], assetUrl: string): void {
        if (!data) return;

        for (const library of data) {
            if (!library || this._libraryNames.indexOf(library.id) >= 0) continue;

            this._libraryNames.push(library.id);

            const downloadLibrary = new AvatarAssetDownloadLibrary(library.id, library.revision ?? 0, assetUrl, lib => this.onLibraryLoaded(lib));

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

    public processMissingLibraries(): void {
        for (const lib of this._missingMandatoryLibs.slice()) {
            const libraries = this._figureMap.get(lib);

            if (libraries) for (const library of libraries) this.downloadLibrary(library);
        }
    }

    public processPendingContainers(): void {
        for (const [container, listener] of this._pendingContainers) this.downloadAvatarFigure(container, listener);

        this._pendingContainers = [];
    }

    public isAvatarFigureContainerReady(container: IAvatarFigureContainer): boolean {
        return !this.getAvatarFigurePendingLibraries(container)?.length;
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void {
        if (!this._isReady) {
            this._pendingContainers.push([container, listener]);

            return;
        }

        const figure = container.getFigureString();
        const libraries = this.getAvatarFigurePendingLibraries(container);

        if (libraries.length) {
            if (!listener.disposed) {
                let listeners = this._figureListeners.get(figure);

                if (!listeners) {
                    listeners = [];

                    this._figureListeners.set(figure, listeners);
                }

                listeners.push(listener);
            }

            this._incompleteFigures.set(figure, libraries);

            for (const library of libraries) this.downloadLibrary(library);
        }
        else if (!listener.disposed) listener.resetFigure(figure);
    }

    private getAvatarFigurePendingLibraries(container: IAvatarFigureContainer): AvatarAssetDownloadLibrary[] {
        const pendingLibraries: AvatarAssetDownloadLibrary[] = [];

        if (!container || !this._structure) return pendingLibraries;

        const figureData = this._structure.figureData;

        if (!figureData) return pendingLibraries;

        const partTypes = container.getPartTypeIds();

        for (const partType of partTypes) {
            const set = figureData.getSetType(partType);

            if (!set) continue;

            const figurePartSet = set.getPartSet(container.getPartSetId(partType));

            if (!figurePartSet) continue;

            for (const part of figurePartSet.parts) {
                const libraries = this._figureMap.get(`${part.type}:${part.id}`);

                if (!libraries) continue;

                for (const library of libraries) {
                    if (!library || library.isLoaded || pendingLibraries.indexOf(library) >= 0) continue;

                    pendingLibraries.push(library);
                }
            }
        }

        return pendingLibraries;
    }

    private downloadLibrary(library: AvatarAssetDownloadLibrary): void {
        if (!library || library.isLoaded || (this._pendingDownloadQueue.indexOf(library) >= 0) || (this._currentDownloads.indexOf(library) >= 0)) return;

        this._pendingDownloadQueue.push(library);

        this.processDownloadQueue();
    }

    private processDownloadQueue(): void {
        while (this._pendingDownloadQueue.length) {
            const library = this._pendingDownloadQueue.shift();

            if (!library) continue;

            this._currentDownloads.push(library);

            void library.downloadAsset();
        }
    }

    private onLibraryLoaded(library: IAvatarAssetDownloadLibrary): void {
        if (!library) return;

        const loadedFigures: string[] = [];

        for (const [figure, libraries] of this._incompleteFigures.entries()) {
            let isReady = true;

            for (const library of libraries) {
                if (!library || library.isLoaded) continue;

                isReady = false;

                break;
            }

            if (!isReady) continue;

            loadedFigures.push(figure);

            const listeners = this._figureListeners.get(figure);

            if (listeners) {
                for (const listener of listeners) {
                    if (listener?.disposed) continue;

                    listener.resetFigure(figure);
                }
            }

            this._figureListeners.delete(figure);
        }

        for (const figure of loadedFigures) this._incompleteFigures.delete(figure);

        let index = 0;

        while (index < this._currentDownloads.length) {
            const download = this._currentDownloads[index];

            if (download && download.libraryName === library.libraryName) this._currentDownloads.splice(index, 1);

            index++;
        }
    }
}

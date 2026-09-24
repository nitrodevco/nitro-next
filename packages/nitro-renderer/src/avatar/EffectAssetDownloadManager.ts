import { IAvatarEffectListener, IEffectAssetDownloadLibrary, IEffectMapLibrary } from '@nitrodevco/nitro-api';

import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadLibrary } from './EffectAssetDownloadLibrary';

export class EffectAssetDownloadManager {
    private static MANDATORY_LIBRARIES: string[] = [ 'dance.1', 'dance.2', 'dance.3', 'dance.4' ];
    private static MAX_SIMULTANEOUS_DOWNLOADS: number = 2;

    private _structure: AvatarStructure;
    private _missingMandatoryLibs: string[] = EffectAssetDownloadManager.MANDATORY_LIBRARIES;
    private _effectMap: Map<string, EffectAssetDownloadLibrary[]> = new Map();
    private _pendingDownloads: [number, IAvatarEffectListener][] = [];
    private _effectListeners: Map<number, IAvatarEffectListener[]> = new Map();
    private _incompleteEffects: Map<number, EffectAssetDownloadLibrary[]> = new Map();
    private _pendingDownloadQueue: EffectAssetDownloadLibrary[] = [];
    private _currentDownloads: EffectAssetDownloadLibrary[] = [];
    private _libraryNames: string[] = [];
    private _isReady: boolean = false;
    /** Flash's `LIBRARY_LOADED` event: `AvatarRenderManager` registers the library's aliases. */
    private _onLibraryLoaded: ((libraryName: string) => void) | undefined;

    constructor(structure: AvatarStructure, onLibraryLoaded: ((libraryName: string) => void) | undefined = undefined) {
        this._structure = structure;
        this._onLibraryLoaded = onLibraryLoaded;
    }

    public processEffectMap(data: IEffectMapLibrary[], assetUrl: string): void {
        if (!data) return;

        for (const library of data) {
            if (!library || this._libraryNames.indexOf(library.lib) >= 0) continue;

            this._libraryNames.push(library.lib);

            const downloadLibrary = new EffectAssetDownloadLibrary(library.lib, library.revision ?? 0, assetUrl, lib => this.onLibraryComplete(lib));

            let existing = this._effectMap.get(library.id);

            if (!existing) {
                existing = [];

                this._effectMap.set(library.id, existing);
            }

            existing.push(downloadLibrary);
        }
    }

    public processMissingLibraries(): void {
        for (const lib of this._missingMandatoryLibs.slice()) {
            const libraries = this._effectMap.get(lib);

            if (libraries) for (const effect of libraries) this.downloadLibrary(effect);
        }
    }

    public processPendingDownloads(): void {
        for (const [ id, listener ] of this._pendingDownloads) this.downloadAvatarEffect(id, listener);

        this._pendingDownloads = [];
    }

    public isAvatarEffectReady(effect: number): boolean {
        if (!this._isReady) return false;

        return !this.getAvatarEffectPendingLibraries(effect)?.length;
    }

    public downloadAvatarEffect(id: number, listener: IAvatarEffectListener): void {
        if (!this._isReady) {
            this._pendingDownloads.push([ id, listener ]);

            return;
        }

        const libraries = this.getAvatarEffectPendingLibraries(id);

        if (libraries.length) {
            let listeners = this._effectListeners.get(id);

            if (!listeners) {
                listeners = [];

                this._effectListeners.set(id, listeners);
            }

            listeners.push(listener);

            this._incompleteEffects.set(id, libraries);

            for (const library of libraries) this.downloadLibrary(library);
        } else listener.resetEffect(id);
    }

    public async downloadAvatarEffectAsync(id: number): Promise<void> {
        if (!this._isReady) return;

        const libraries = this.getAvatarEffectPendingLibraries(id);

        if (libraries.length) for (const library of libraries) await this.downloadLibraryAsync(library);
    }

    public setReady(): void {
        this._isReady = true;
    }

    /** Effect id -> the libraries holding it (Flash `effectMap`). */
    public get map(): Map<string, IEffectAssetDownloadLibrary[]> {
        return this._effectMap;
    }

    private getAvatarEffectPendingLibraries(id: number): EffectAssetDownloadLibrary[] {
        const pendingLibraries: EffectAssetDownloadLibrary[] = [];

        if (!this._structure) return pendingLibraries;

        const libraries = this._effectMap.get(id.toString());

        if (libraries) {
            for (const library of libraries) {
                if (!library || library.isReady) continue;

                if (pendingLibraries.indexOf(library) === -1) pendingLibraries.push(library);
            }
        }

        return pendingLibraries;
    }

    private downloadLibrary(library: EffectAssetDownloadLibrary): void {
        if (!library || library.isReady) return;

        if ((this._pendingDownloadQueue.indexOf(library) >= 0) || (this._currentDownloads.indexOf(library) >= 0)) return;

        this._pendingDownloadQueue.push(library);

        this.processDownloadQueue();
    }

    private async downloadLibraryAsync(library: EffectAssetDownloadLibrary): Promise<void> {
        if (!library || library.isReady) return;

        await library.downloadAssetAsync();
    }

    /** Flash allows two effect libraries in flight at once. */
    private processDownloadQueue(): void {
        while (this._pendingDownloadQueue.length && (this._currentDownloads.length < EffectAssetDownloadManager.MAX_SIMULTANEOUS_DOWNLOADS)) {
            const library = this._pendingDownloadQueue.shift();

            if (!library) continue;

            this._currentDownloads.push(library);

            library.downloadAsset();
        }
    }

    private onLibraryComplete(library: EffectAssetDownloadLibrary): void {
        if (!library) return;

        if (library.isLoaded) this._onLibraryLoaded?.(library.libraryName);

        const loadedEffects: number[] = [];

        if (library.isLoaded) this._structure.registerAnimations(library.animations);

        for (const [ id, libraries ] of this._incompleteEffects.entries()) {
            let isReady = true;

            for (const pending of libraries) {
                if (!pending || pending.isReady) continue;

                isReady = false;

                break;
            }

            if (!isReady) continue;

            loadedEffects.push(id);

            const listeners = this._effectListeners.get(id);

            if (listeners) for (const listener of listeners) listener.resetEffect(id);

            this._effectListeners.delete(id);
        }

        for (const id of loadedEffects) this._incompleteEffects.delete(id);

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

import type { IAvatarEffectListener, IEffectAssetDownloadLibrary, IEffectMapLibrary } from '@nitrodevco/nitro-api';
import { GetConfigValue } from '@nitrodevco/nitro-shared';

import type { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadLibrary } from './EffectAssetDownloadLibrary';

export class EffectAssetDownloadManager {
    private static MANDATORY_LIBRARIES: string[] = ['dance.1', 'dance.2', 'dance.3', 'dance.4'];

    private _structure: AvatarStructure;
    private _missingMandatoryLibs: string[] = EffectAssetDownloadManager.MANDATORY_LIBRARIES;
    private _effectMap: Map<string, EffectAssetDownloadLibrary[]> = new Map();
    private _pendingDownloads: [number, IAvatarEffectListener][] = [];
    private _effectListeners: Map<number, IAvatarEffectListener[]> = new Map();
    private _incompleteEffects: Map<number, EffectAssetDownloadLibrary[]> = new Map();
    private _pendingDownloadQueue: EffectAssetDownloadLibrary[] = [];
    private _currentDownloads: EffectAssetDownloadLibrary[] = [];
    private _libraryNames: string[] = [];
    private _assetUrl: string = '';
    private _isReady: boolean;

    constructor(structure: AvatarStructure) {
        this._structure = structure;
        this._assetUrl = GetConfigValue<string>('asset.urls.effect', '');
    }

    public processEffectMap(data: IEffectMapLibrary[]): void {
        if (!data) return;

        for (const library of data) {
            if (!library || this._libraryNames.indexOf(library.lib) >= 0) continue;

            this._libraryNames.push(library.lib);

            const downloadLibrary = new EffectAssetDownloadLibrary(library.lib, library.revision ?? 0, this._assetUrl, lib => this.onLibraryLoaded(lib));

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
        for (const [id, listener] of this._pendingDownloads) this.downloadAvatarEffect(id, listener);

        this._pendingDownloads = [];
    }

    public isAvatarEffectReady(effect: number): boolean {
        return !this.getAvatarEffectPendingLibraries(effect)?.length;
    }

    public downloadAvatarEffect(id: number, listener: IAvatarEffectListener): void {
        if (!this._isReady) {
            this._pendingDownloads.push([id, listener]);

            return;
        }

        const pendingLibraries = this.getAvatarEffectPendingLibraries(id);

        if (pendingLibraries && pendingLibraries.length) {
            if (listener && !listener.disposed) {
                let listeners = this._effectListeners.get(id);

                if (!listeners) listeners = [];

                listeners.push(listener);

                this._effectListeners.set(id, listeners);
            }

            this._incompleteEffects.set(id, pendingLibraries);

            for (const library of pendingLibraries) this.downloadLibrary(library);
        }
        else if (!listener.disposed) listener.resetEffect(id);
    }

    private getAvatarEffectPendingLibraries(id: number): EffectAssetDownloadLibrary[] {
        const pendingLibraries: EffectAssetDownloadLibrary[] = [];

        if (!this._structure) return pendingLibraries;

        const libraries = this._effectMap.get(id.toString());

        if (libraries) {
            for (const library of libraries) {
                if (!library || library.isLoaded) continue;

                if (pendingLibraries.indexOf(library) === -1) pendingLibraries.push(library);
            }
        }

        return pendingLibraries;
    }

    private downloadLibrary(library: EffectAssetDownloadLibrary): void {
        if (!library || library.isLoaded) return;

        if ((this._pendingDownloadQueue.indexOf(library) >= 0) || (this._currentDownloads.indexOf(library) >= 0)) return;

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

    private onLibraryLoaded(library: IEffectAssetDownloadLibrary): void {
        if (!library) return;

        const loadedEffects: number[] = [];

        this._structure.registerAnimations(library.animations);

        for (const [id, libraries] of this._incompleteEffects.entries()) {
            let isReady = true;

            for (const library of libraries) {
                if (!library || library.isLoaded) continue;

                isReady = false;

                break;
            }

            if (!isReady) continue;

            loadedEffects.push(id);

            const listeners = this._effectListeners.get(id);

            if (listeners) {
                for (const listener of listeners) {
                    if (listener?.disposed) continue;

                    listener.resetEffect(id);
                }
            }

            this._effectListeners.delete(id);
        }

        for (const id of loadedEffects) this._incompleteEffects.delete(id);

        let index = 0;

        while (index < this._currentDownloads.length) {
            const download = this._currentDownloads[index];

            if (download && download.libraryName === library.libraryName) this._currentDownloads.splice(index, 1);

            index++;
        }
    }
}

import type { IAssetAnimation, IEffectAssetDownloadLibrary } from "@nitrodevco/nitro-api";
import { AvatarAssetDownloadStatus } from "@nitrodevco/nitro-api";

import { GetAssetManager } from "#renderer/assets";

export class EffectAssetDownloadLibrary implements IEffectAssetDownloadLibrary {
    private _state: AvatarAssetDownloadStatus = AvatarAssetDownloadStatus.NotLoaded;
    private _libraryName: string;
    private _revision: number;
    private _assetUrl: string;
    private _animations: IAssetAnimation[];
    private _onDownloaded: (library: IEffectAssetDownloadLibrary) => void;

    constructor(libraryName: string, revision: number, assetUrl: string, onDownloaded: (library: IEffectAssetDownloadLibrary) => void) {
        this._libraryName = libraryName;
        this._revision = revision;
        this._assetUrl = assetUrl;
        this._animations = [];
        this._onDownloaded = onDownloaded;

        this._assetUrl = this._assetUrl.replace(/%libname%/gi, this._libraryName);
        this._assetUrl = this._assetUrl.replace(/%revision%/gi, this._revision.toString());

        if (GetAssetManager().getCollection(this._libraryName)) this._state = AvatarAssetDownloadStatus.Loaded;
    }

    public async downloadAsset(): Promise<void> {
        if (this._state === AvatarAssetDownloadStatus.Loading || this._state === AvatarAssetDownloadStatus.Loaded) return;

        const asset = GetAssetManager().getCollection(this._libraryName);

        if (!asset) {
            this._state = AvatarAssetDownloadStatus.Loading;

            if (!await GetAssetManager().downloadAsset(this._assetUrl)) return;
        }

        this._state = AvatarAssetDownloadStatus.Loaded;

        const collection = GetAssetManager().getCollection(this._libraryName);

        if (collection) this._animations = collection.data?.animations ?? [];

        void this._onDownloaded(this);
    }

    public get libraryName(): string {
        return this._libraryName;
    }

    public get animations(): IAssetAnimation[] {
        return this._animations;
    }

    public get isLoaded(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded);
    }
}

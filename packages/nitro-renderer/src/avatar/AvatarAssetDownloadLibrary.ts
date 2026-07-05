import type { IAvatarAssetDownloadLibrary } from "@nitrodevco/nitro-api";
import { AvatarAssetDownloadStatus } from "@nitrodevco/nitro-api";

import { GetAssetManager } from "#renderer/assets";

export class AvatarAssetDownloadLibrary implements IAvatarAssetDownloadLibrary {
    private _state: AvatarAssetDownloadStatus = AvatarAssetDownloadStatus.NotLoaded;
    private _libraryName: string;
    private _revision: number;
    private _assetUrl: string;
    private _onDownloaded: (library: IAvatarAssetDownloadLibrary) => void;

    constructor(libraryName: string, revision: number, assetUrl: string, onDownloaded: (library: IAvatarAssetDownloadLibrary) => void) {
        this._libraryName = libraryName;
        this._revision = revision;
        this._assetUrl = assetUrl;
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

        void this._onDownloaded(this);
    }

    public get libraryName(): string {
        return this._libraryName;
    }

    public get isLoaded(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded);
    }
}

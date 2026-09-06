import { AvatarAssetDownloadStatus, IAvatarAssetDownloadLibrary, NitroLogger } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '#renderer/assets';

export class AvatarAssetDownloadLibrary implements IAvatarAssetDownloadLibrary {
    private _state: AvatarAssetDownloadStatus = AvatarAssetDownloadStatus.NotLoaded;
    private _libraryName: string;
    private _revision: number;
    private _assetUrl: string;
    private _onDownloaded: (library: IAvatarAssetDownloadLibrary) => void;
    private _download: Promise<boolean> | undefined;

    constructor(libraryName: string, revision: number, assetUrl: string, onDownloaded: (library: IAvatarAssetDownloadLibrary) => void) {
        this._libraryName = libraryName;
        this._revision = revision;
        this._assetUrl = assetUrl;
        this._onDownloaded = onDownloaded;

        this._assetUrl = this._assetUrl.replace(/%libname%/gi, this._libraryName);
        this._assetUrl = this._assetUrl.replace(/%revision%/gi, this._revision.toString());

        if (GetAssetManager().getCollection(this._libraryName)) this._state = AvatarAssetDownloadStatus.Loaded;
    }

    public downloadAsset(): void {
        void this.download().catch(err => NitroLogger.error(err));
    }

    public async downloadAssetAsync(): Promise<void> {
        await this.download();
    }

    private download(): Promise<boolean> {
        if (this._state === AvatarAssetDownloadStatus.Loaded) return Promise.resolve(true);

        if (this._download) return this._download;

        if (GetAssetManager().getCollection(this._libraryName)) {
            this._state = AvatarAssetDownloadStatus.Loaded;

            return Promise.resolve(true);
        }

        this._state = AvatarAssetDownloadStatus.Loading;

        this._download = GetAssetManager().downloadAsset(this._assetUrl).then((flag) => {
            if (!flag) {
                this._state = AvatarAssetDownloadStatus.NotLoaded;

                return false;
            }

            this._state = AvatarAssetDownloadStatus.Loaded;

            void this._onDownloaded(this);

            return true;
        }).finally(() => {
            this._download = undefined;

            if (this._state === AvatarAssetDownloadStatus.Loading) this._state = AvatarAssetDownloadStatus.NotLoaded;
        });

        return this._download;
    }

    public get libraryName(): string {
        return this._libraryName;
    }

    public get isLoaded(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded);
    }
}

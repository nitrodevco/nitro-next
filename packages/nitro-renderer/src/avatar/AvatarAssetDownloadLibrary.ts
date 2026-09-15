import { AvatarAssetDownloadStatus, IAvatarAssetDownloadLibrary, NitroLogger } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '#renderer/assets';

export class AvatarAssetDownloadLibrary implements IAvatarAssetDownloadLibrary {
    private _state: AvatarAssetDownloadStatus = AvatarAssetDownloadStatus.NotLoaded;
    private _libraryName: string;
    private _revision: number;
    private _assetUrl: string;
    private _isMandatory: boolean = false;
    /** Fires when a download finishes, loaded or failed, so the manager can move on either way. */
    private _onComplete: (library: AvatarAssetDownloadLibrary) => void;
    private _download: Promise<boolean> | undefined;

    constructor(libraryName: string, revision: number, assetUrl: string, onComplete: (library: AvatarAssetDownloadLibrary) => void) {
        this._libraryName = libraryName;
        this._revision = revision;
        this._assetUrl = assetUrl;
        this._onComplete = onComplete;

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
            // Flash marks a failed library READY as well: the figure renders without it rather than never
            this._state = flag ? AvatarAssetDownloadStatus.Loaded : AvatarAssetDownloadStatus.Failed;

            if (!flag) NitroLogger.error(`Could not load avatar asset library ${this._libraryName} from ${this._assetUrl}`);

            this._onComplete(this);

            return flag;
        }).finally(() => {
            this._download = undefined;

            if (this._state === AvatarAssetDownloadStatus.Loading) this._state = AvatarAssetDownloadStatus.NotLoaded;
        });

        return this._download;
    }

    /** Unloads the library; the next figure needing it downloads it again. */
    public purge(): void {
        if (this._state !== AvatarAssetDownloadStatus.Loaded) return;

        GetAssetManager().removeCollection(this._libraryName);

        this._state = AvatarAssetDownloadStatus.NotLoaded;
    }

    public get libraryName(): string {
        return this._libraryName;
    }

    public get isLoaded(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded);
    }

    public get isReady(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded) || (this._state === AvatarAssetDownloadStatus.Failed);
    }

    public get isMandatory(): boolean {
        return this._isMandatory;
    }

    public set isMandatory(flag: boolean) {
        this._isMandatory = flag;
    }

    public toString(): string {
        return `${this._libraryName}${this.isReady ? '[x]' : '[ ]'}`;
    }
}

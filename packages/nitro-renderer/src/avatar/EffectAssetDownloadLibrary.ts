import { AvatarAssetDownloadStatus, IAssetAnimation, IEffectAssetDownloadLibrary, NitroLogger } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '#renderer/assets';

export class EffectAssetDownloadLibrary implements IEffectAssetDownloadLibrary {
    private _state: AvatarAssetDownloadStatus = AvatarAssetDownloadStatus.NotLoaded;
    private _libraryName: string;
    private _revision: number;
    private _assetUrl: string;
    private _animations: IAssetAnimation[];
    /** Fires when a download finishes, loaded or failed, so the manager can move on either way. */
    private _onComplete: (library: EffectAssetDownloadLibrary) => void;
    private _download: Promise<boolean> | undefined;

    constructor(libraryName: string, revision: number, assetUrl: string, onComplete: (library: EffectAssetDownloadLibrary) => void) {
        this._libraryName = libraryName;
        this._revision = revision;
        this._assetUrl = assetUrl;
        this._animations = [];
        this._onComplete = onComplete;

        this._assetUrl = this._assetUrl.replace(/%libname%/gi, this._libraryName);
        this._assetUrl = this._assetUrl.replace(/%revision%/gi, this._revision.toString());

        if (GetAssetManager().getCollection(this._libraryName)) this.markLoaded();
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
            this.markLoaded();

            return Promise.resolve(true);
        }

        this._state = AvatarAssetDownloadStatus.Loading;

        this._download = GetAssetManager().downloadAsset(this._assetUrl).then((flag) => {
            if (flag) this.markLoaded();
            else {
                this._state = AvatarAssetDownloadStatus.Failed;

                NitroLogger.error(`Could not load effect asset library ${this._libraryName} from ${this._assetUrl}`);
            }

            this._onComplete(this);

            return flag;
        }).finally(() => {
            this._download = undefined;

            if (this._state === AvatarAssetDownloadStatus.Loading) this._state = AvatarAssetDownloadStatus.NotLoaded;
        });

        return this._download;
    }

    private markLoaded(): void {
        this._state = AvatarAssetDownloadStatus.Loaded;

        const collection = GetAssetManager().getCollection(this._libraryName);

        if (collection) this._animations = collection.data?.animations ?? [];
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

    public get isReady(): boolean {
        return (this._state === AvatarAssetDownloadStatus.Loaded) || (this._state === AvatarAssetDownloadStatus.Failed);
    }

    public toString(): string {
        return `${this._libraryName}${this.isReady ? '[x]' : '[ ]'}`;
    }
}

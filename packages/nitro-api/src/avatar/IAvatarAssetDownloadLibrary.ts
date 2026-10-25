export interface IAvatarAssetDownloadLibrary {
    downloadAsset(): void;
    downloadAssetAsync(): Promise<void>;
    /** Unloads the library's assets so they download again on next use. */
    purge(): void;
    readonly libraryName: string;
    readonly isLoaded: boolean;
    /** Loaded, or failed: nothing is still pending for it. */
    readonly isReady: boolean;
    isMandatory: boolean;
}

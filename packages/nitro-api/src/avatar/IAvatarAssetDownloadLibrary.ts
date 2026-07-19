export interface IAvatarAssetDownloadLibrary {
    downloadAsset(): void;
    downloadAssetAsync(): Promise<void>;
    readonly libraryName: string;
    readonly isLoaded: boolean;
}

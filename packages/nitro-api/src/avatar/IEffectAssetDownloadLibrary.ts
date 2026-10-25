import { IAssetAnimation } from '../asset';

export interface IEffectAssetDownloadLibrary {
    downloadAsset(): void;
    downloadAssetAsync(): Promise<void>;
    readonly libraryName: string;
    readonly animations: IAssetAnimation[];
    readonly isLoaded: boolean;
    /** Loaded, or failed: nothing is still pending for it. */
    readonly isReady: boolean;
}

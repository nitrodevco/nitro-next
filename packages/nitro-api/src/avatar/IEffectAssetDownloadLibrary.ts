import type { IAssetAnimation } from '../asset';

export interface IEffectAssetDownloadLibrary {
    downloadAsset(): Promise<void>;
    readonly libraryName: string;
    readonly animations: IAssetAnimation[];
    readonly isLoaded: boolean;
}

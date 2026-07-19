import type { IAssetAnimation } from '../asset';

export interface IEffectAssetDownloadLibrary {
    downloadAsset(): void;
    readonly libraryName: string;
    readonly animations: IAssetAnimation[];
    readonly isLoaded: boolean;
}

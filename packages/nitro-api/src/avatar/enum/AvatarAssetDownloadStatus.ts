export enum AvatarAssetDownloadStatus {
    NotLoaded = 0,
    Loading = 1,
    Loaded = 2,
    /** The download failed; the library counts as ready so figures using it still render (Flash marks it READY on error). */
    Failed = 3,
}

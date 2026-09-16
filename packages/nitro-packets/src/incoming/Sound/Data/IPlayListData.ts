export interface IPlayListData {
    /** The song id, which is what the playlist and the disks both point at. */
    id: number;
    /** Seconds. */
    length: number;
    songName: string;
    creator: string;
}

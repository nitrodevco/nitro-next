export interface IPlayListData {
    /** The song id, which is what the playlist and the disks both point at. */
    id: number;
    /** Milliseconds (`SongDataEntry.length`: the music controller compares it with seconds times 1000). */
    length: number;
    songName: string;
    creator: string;
}

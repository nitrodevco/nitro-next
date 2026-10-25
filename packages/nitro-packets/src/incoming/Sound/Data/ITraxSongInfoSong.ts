export interface ITraxSongInfoSong {
    id: number;
    /** The short code the catalogue knows the song by. */
    code: string;
    songName: string;
    /** The track itself, as the sound machine plays it. */
    data: string;
    /** Milliseconds (`SongDataEntry.length`: the music controller compares it with seconds times 1000). */
    length: number;
    creator: string;
}

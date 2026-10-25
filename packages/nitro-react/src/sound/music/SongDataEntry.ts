import { TraxSequencer } from '../trax/TraxSequencer';

/**
 * A song the music controller knows - Flash's `SongDataEntry` over `PlayListEntry`: what
 * `TraxSongInfoMessage` or a playlist said about it, the score (`songData`) once the info is in,
 * and the sequencer that plays it once its samples are asked for.
 */
export class SongDataEntry {
    public soundObject: TraxSequencer | null;
    public songData = '';
    public diskId = -1;
    /** `PlayListEntry.startPlayHeadPos`: seconds into the song a sound machine's list resumes it at. */
    public startPlayHeadPos = 0;

    constructor(
        public readonly id: number,
        /** Milliseconds. */
        public readonly length: number,
        public readonly name: string,
        public readonly creator: string,
        soundObject: TraxSequencer | null,
    ) {
        this.soundObject = soundObject;
    }

    public get loaded(): boolean {
        return !!this.soundObject?.ready;
    }
}

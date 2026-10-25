/**
 * A song asked to play at a priority - Flash's `SongStartRequestData`. The start position keeps
 * running while the song's samples download, so a song that took two seconds to load joins two
 * seconds in, where the room's other listeners are.
 */
export class SongStartRequestData {
    private readonly _playRequestTime = performance.now();

    constructor(
        public readonly songId: number,
        /** Seconds; negative for the song's start. */
        private readonly _startPos: number,
        /** Seconds; 0 for the whole song. */
        public readonly playLength: number,
        public readonly fadeInSeconds: number = 2,
        public readonly fadeOutSeconds: number = 1,
    ) {}

    /** Seconds. */
    public get startPos(): number {
        if (this._startPos < 0) return 0;

        return this._startPos + ((performance.now() - this._playRequestTime) / 1000);
    }
}

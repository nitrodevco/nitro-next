/**
 * The FreeFlow's time. Flash's update receivers were given the whole `getTimer()` time since the
 * frame before (`CoreComponentContext.onEnterFrame`); Pixi's `deltaMS` stops at 100 ms however long
 * the frame took, and a hidden page runs no frames at all, so the flow keeps its own time and is
 * advanced by the real time that passed. `ChatFlowStage.update` runs at most one scroll-up cycle and
 * one clean-up sweep a call, so a gap longer than a frame is stepped through: every cycle and sweep
 * the time away held still happens, and the flow is where it would have been had the page stayed in
 * view. Once no bubble is left the rest of the gap passes in one step; a line-by-line spacer column
 * looks the same after every cycle.
 */
export class ChatFlowClock {
    /** The longest step: the longest frame the shared ticker reports (`deltaMS` at `Ticker.minFPS` 10). */
    public static readonly MAX_STEP_MS = 100;

    private _time: number;
    private readonly _step: (elapsedMs: number) => void;
    private readonly _hasBubbles: () => boolean;

    /**
     * @param time where the flow's time starts, on the `performance.now()` timeline frames are stamped on
     * @param step one update of the flow and its bubbles' motion
     * @param hasBubbles whether a bubble is still in the flow
     */
    constructor(time: number, step: (elapsedMs: number) => void, hasBubbles: () => boolean) {
        this._time = time;
        this._step = step;
        this._hasBubbles = hasBubbles;
    }

    public get time(): number {
        return this._time;
    }

    /** Advances the flow to `time`; a time it has passed already changes nothing. */
    public advanceTo(time: number): void {
        let remaining = time - this._time;

        if (!(remaining > 0)) return;

        this._time = time;

        while (remaining > 0) {
            const elapsed = this._hasBubbles() ? Math.min(remaining, ChatFlowClock.MAX_STEP_MS) : remaining;

            this._step(elapsed);

            remaining -= elapsed;
        }
    }

    /**
     * A bubble said at `time` is about to join. Between frames it joins the flow as the last frame
     * left it, as in Flash. Said while no frame ran (a hidden page), the flow first catches up to when
     * it was said, so it joins where it would have rather than together with everything said since the
     * last frame.
     */
    public catchUpTo(time: number): void {
        if ((time - this._time) > ChatFlowClock.MAX_STEP_MS) this.advanceTo(time);
    }
}

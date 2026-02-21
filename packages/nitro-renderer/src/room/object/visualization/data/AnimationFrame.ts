export class AnimationFrame {
    public static FRAME_REPEAT_FOREVER: number = -1;
    public static SEQUENCE_NOT_DEFINED: number = -1;

    private static POOL_SIZE_LIMIT: number = 3000;
    private static POOL: AnimationFrame[] = [];

    private _id: number = -1;
    private _x: number = 0;
    private _y: number = 0;
    private _repeats: number = 0;
    private _frameRepeats: number = 0;
    private _remainingFrameRepeats: number = 0;
    private _activeSequence: number = 0;
    private _activeSequenceOffset: number = 0;
    private _isLastFrame: boolean = false;
    private _isRecycled: boolean = false;

    public static allocate(
        id: number,
        x: number,
        y: number,
        repeats: number,
        frameRepeats: number,
        isLastFrame: boolean,
        activeSequence: number = -1,
        sequenceOffset: number = 0,
    ): AnimationFrame {
        const frame = (AnimationFrame.POOL.length ? AnimationFrame.POOL.pop() : new AnimationFrame()) as AnimationFrame;

        if (repeats < 1) repeats = 1;

        if (frameRepeats < 0) frameRepeats = AnimationFrame.FRAME_REPEAT_FOREVER;

        frame._id = id;
        frame._x = x;
        frame._y = y;
        frame._repeats = repeats;
        frame._frameRepeats = frameRepeats;
        frame._remainingFrameRepeats = frameRepeats;
        frame._isLastFrame = isLastFrame;
        frame._isRecycled = false;

        if (activeSequence >= 0) {
            frame._activeSequence = activeSequence;
            frame._activeSequenceOffset = sequenceOffset;
        } else {
            frame._activeSequence = -1;
            frame._activeSequenceOffset = 0;
        }

        return frame;
    }

    public get id(): number {
        if (this._id >= 0) return this._id;

        return -this._id * Math.random();
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get repeats(): number {
        return this._repeats;
    }

    public get frameRepeats(): number {
        return this._frameRepeats;
    }

    public get isLastFrame(): boolean {
        return this._isLastFrame;
    }

    public get remainingFrameRepeats(): number {
        if (this._frameRepeats < 0) return AnimationFrame.FRAME_REPEAT_FOREVER;

        return this._remainingFrameRepeats;
    }

    public set remainingFrameRepeats(k: number) {
        if (k < 0) k = 0;

        if (this._frameRepeats > 0 && k > this._frameRepeats) k = this._frameRepeats;

        this._remainingFrameRepeats = k;
    }

    public get activeSequence(): number {
        return this._activeSequence;
    }

    public get activeSequenceOffset(): number {
        return this._activeSequenceOffset;
    }

    public recycle(): void {
        if (this._isRecycled) return;

        this._isRecycled = true;

        if (AnimationFrame.POOL.length < AnimationFrame.POOL_SIZE_LIMIT) AnimationFrame.POOL.push(this);
    }
}

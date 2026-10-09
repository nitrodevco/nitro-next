/**
 * The motion of a reward track bar - `RewardTrackProgressBarViewBase` and its task flavour
 * `RewardTrackTaskProgressBarView`. The fill ratio is an `AnimatedScalar` (accelerating at
 * `ACCELERATION_PER_MS` to `MAX_SPEED_PER_MS` and braking onto its target); a task or level bar
 * also fades its fill between orange and green over `FILL_COLOR_TRANSITION_MS` (`AnimatedColor`,
 * the `window/utils` one, whose `setTarget` ignores the target it already has). The clock is the
 * milliseconds its `update` calls have added up (`§_-P2y§`).
 *
 * `refreshTask`: when a task's active level moved on while animating, the bar first fills to the
 * end, then - once it has stopped - snaps to the new level's ratio.
 */
import { AnimatedColor, AnimatedScalar, GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const ACCELERATION_PER_MS = 0.00001;
const MAX_SPEED_PER_MS = 0.003;
/** `§_-J1f§`: the distance and speed below which the bar has arrived. */
const EPSILON = 0.0001;
const FILL_COLOR_TRANSITION_MS = 300;
export const REWARD_TRACK_INCOMPLETE_COLOR = 15443468;
export const REWARD_TRACK_COMPLETE_COLOR = 7450404;

const clampRatio = (ratio: number) => Math.max(0, Math.min(1, ratio));

/** `render`: the fill as wide as the ratio of its container. */
const fillWidthOf = (width: number, ratio: number) => Math.max(0, Math.min(width, Math.round(width * ratio)));

export class RewardTrackProgressBar {
    private _time = 0;
    private _ratio = new AnimatedScalar(ACCELERATION_PER_MS, MAX_SPEED_PER_MS, EPSILON);
    private _color: AnimatedColor | undefined;
    private _colorTarget = REWARD_TRACK_INCOMPLETE_COLOR;
    /** `RewardTrackTaskProgressBarView.§_-Q14§`: the ratio to snap to once the fill to the end is done. */
    private _pendingRatio = -1;
    /** The ratio and level last asked for, so a render that asks again changes nothing. */
    private _requested = Number.NaN;
    private _requestedLevel = -1;

    /** `colored`: `RewardTrackProgressBarViewBase`'s second argument - the task and level bars. */
    constructor(private readonly _width: number, colored: boolean) {
        if (!colored) return;

        this._color = new AnimatedColor(FILL_COLOR_TRANSITION_MS);
        this._color.snapTo(REWARD_TRACK_INCOMPLETE_COLOR, this._time);
    }

    /** The fill's width (`render`). */
    public get fillWidth(): number {
        return fillWidthOf(this._width, this._ratio.value);
    }

    public get color(): number {
        return this._color?.value ?? REWARD_TRACK_INCOMPLETE_COLOR;
    }

    /** `isUpdating`. */
    public get isUpdating(): boolean {
        return this._ratio.needsUpdate(this._time, this._width) || (!!this._color && this._color.needsUpdate(this._time));
    }

    /** `RewardTrackTaskProgressBarView.refreshTask` / `refreshRatio` (`levelIndex` -1 for a level's own bar). */
    public refresh(ratio: number, animate: boolean, levelIndex = -1): void {
        if ((ratio === this._requested) && (levelIndex === this._requestedLevel)) return;

        const levelChanged = Number.isFinite(this._requested) && (levelIndex !== -1) && (levelIndex !== this._requestedLevel);

        this._requested = ratio;
        this._requestedLevel = levelIndex;

        if (levelChanged && animate) {
            this._pendingRatio = ratio;
            this.setRatio(1, true);

            return;
        }

        this._pendingRatio = -1;
        this.setRatio(ratio, animate);
    }

    /** `update(deltaMs)`; true while it has more to do. */
    public update(deltaMs: number): boolean {
        this._time += deltaMs;
        this._ratio.update(this._time);

        if (this._color) {
            this.syncCompletionColor(true);
            this._color.update(this._time);
        }

        if ((this._pendingRatio >= 0) && !this.isUpdating) {
            const ratio = this._pendingRatio;

            this._pendingRatio = -1;
            this.setRatio(ratio, false);
        }

        return this.isUpdating;
    }

    private setRatio(ratio: number, animate: boolean): void {
        const clamped = clampRatio(ratio);

        if (animate) this._ratio.setTarget(clamped, this._time);
        else this._ratio.snapTo(clamped, this._time);

        this.syncCompletionColor(animate);
    }

    private syncCompletionColor(animate: boolean): void {
        if (!this._color) return;

        const color = (this._ratio.value >= 1) ? REWARD_TRACK_COMPLETE_COLOR : REWARD_TRACK_INCOMPLETE_COLOR;

        if (!animate) {
            this._colorTarget = color;
            this._color.snapTo(color, this._time);

            return;
        }

        if (color === this._colorTarget) return;

        this._colorTarget = color;
        this._color.setTarget(color, this._time);
    }
}

/** One bar the window shows: its window's key, its container's width, whether it fades to green, and what it shows. */
export interface RewardTrackBarTarget {
    key: string;
    width: number;
    colored: boolean;
    ratio: number;
    /** A task row's active level (`refreshTask`); -1 for the other bars. */
    levelIndex: number;
}

export interface RewardTrackBarDrawing {
    fillWidth: number;
    color: number;
}

/**
 * The window's bars (`RewardTrackController.update` stepping every view each frame): a bar is made at
 * its value, and refreshed with `animate` while `progress` - the track - is a new one since the last
 * refresh (`RewardTrackView.shouldAnimate`, the window being open). What each draws comes back by key;
 * a bar not yet made draws its value.
 */
export const useRewardTrackBars = (targets: readonly RewardTrackBarTarget[], progress: unknown) => {
    const views = useRef(new Map<string, RewardTrackProgressBar>());
    const refreshedProgress = useRef<unknown>(undefined);
    const [ drawn, setDrawn ] = useState<ReadonlyMap<string, RewardTrackBarDrawing>>(() => new Map());
    const [ updating, setUpdating ] = useState(false);
    const signature = JSON.stringify(targets);

    useLayoutEffect(() => {
        const animate = (refreshedProgress.current !== undefined) && (refreshedProgress.current !== progress);

        refreshedProgress.current = progress;

        for (const target of JSON.parse(signature) as RewardTrackBarTarget[]) {
            let view = views.current.get(target.key);

            if (!view) {
                view = new RewardTrackProgressBar(target.width, target.colored);
                view.refresh(target.ratio, false, target.levelIndex);
                views.current.set(target.key, view);
            } else {
                view.refresh(target.ratio, animate, target.levelIndex);
            }
        }

        publish(views.current, setDrawn, setUpdating);
    }, [ signature, progress ]);

    useEffect(() => {
        if (!updating) return;

        const update = (ticker: Ticker) => {
            for (const view of views.current.values()) view.update(ticker.deltaMS);

            publish(views.current, setDrawn, setUpdating);
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ updating ]);

    return (target: RewardTrackBarTarget): RewardTrackBarDrawing => drawn.get(target.key) ?? {
        fillWidth: fillWidthOf(target.width, clampRatio(target.ratio)),
        color: (target.colored && (target.ratio >= 1)) ? REWARD_TRACK_COMPLETE_COLOR : REWARD_TRACK_INCOMPLETE_COLOR,
    };
};

const publish = (views: ReadonlyMap<string, RewardTrackProgressBar>, setDrawn: (update: (previous: ReadonlyMap<string, RewardTrackBarDrawing>) => ReadonlyMap<string, RewardTrackBarDrawing>) => void, setUpdating: (updating: boolean) => void) => {
    setDrawn((previous) => {
        let changed = previous.size !== views.size;
        const next = new Map<string, RewardTrackBarDrawing>();

        for (const [ key, view ] of views) {
            const before = previous.get(key);
            const same = !!before && (before.fillWidth === view.fillWidth) && (before.color === view.color);

            if (!same) changed = true;

            next.set(key, (same && before) ? before : { fillWidth: view.fillWidth, color: view.color });
        }

        return changed ? next : previous;
    });
    setUpdating([ ...views.values() ].some(view => view.isUpdating));
};

/**
 * The motion of `HabbiconProgressBarView`: its `AnimatedScalar` (the fill ratio, accelerating to
 * `MAX_SPEED_PER_MS` and braking onto its target) and its `AnimatedColor` (`window/utils`, a 250ms
 * fade to green when the bar is full and back to blue when it is not) - the renderer's two, as the
 * reward track bar uses them. The bar's `obf_P2y` is `time`: the milliseconds its `update` calls
 * have added up, the clock both animations run on. The `window/utils` `AnimatedColor.setTarget`
 * ignores the target it already has, which the bar relies on as it asks for one every frame.
 */
import { AnimatedColor, AnimatedScalar } from '@nitrodevco/nitro-renderer';

import { clamp } from '#base/utils/clamp';

/** `HabbiconProgressBarView` constants. */
export const HABBICON_PROGRESS_ACCELERATION_PER_MS = 0.00001;
export const HABBICON_PROGRESS_MAX_SPEED_PER_MS = 0.003;
/** `§_-J1f§`: the distance and speed below which the bar has arrived. */
export const HABBICON_PROGRESS_EPSILON = 0.0001;
export const HABBICON_PROGRESS_FILL_COLOR_TRANSITION_MS = 250;
export const HABBICON_PROGRESS_INCOMPLETE_COLOR = 0x54a8e8;
export const HABBICON_PROGRESS_COMPLETE_COLOR = 0x78c95c;
/** How far the fill reaches past the visible progress, so its right end shows square until the bar is nearly full. */
export const HABBICON_PROGRESS_CAP_OVERSHOOT = 4;

const completionColor = (value: number): number => ((value >= 1) ? HABBICON_PROGRESS_COMPLETE_COLOR : HABBICON_PROGRESS_INCOMPLETE_COLOR);

/** `render`: the visible progress width, the fill width (`CAP_OVERSHOOT` past it) and the highlight 2px inside the fill. */
export const habbiconProgressWidths = (value: number, maxWidth: number): { progress: number; fill: number; highlight: number } => {
    const progress = clamp(Math.round(maxWidth * value), 0, maxWidth);
    const fill = (progress >= (maxWidth - HABBICON_PROGRESS_CAP_OVERSHOOT)) ? maxWidth : (progress + HABBICON_PROGRESS_CAP_OVERSHOOT);

    return { progress, fill: Math.max(0, fill), highlight: Math.max(0, fill - 2) };
};

export class HabbiconProgressBar {
    private _time = 0;
    private _ratio = new AnimatedScalar(HABBICON_PROGRESS_ACCELERATION_PER_MS, HABBICON_PROGRESS_MAX_SPEED_PER_MS, HABBICON_PROGRESS_EPSILON);
    private _color = new AnimatedColor(HABBICON_PROGRESS_FILL_COLOR_TRANSITION_MS);
    private _colorTarget = HABBICON_PROGRESS_INCOMPLETE_COLOR;

    /** The constructor, then `setRatio(ratio, false)`. */
    constructor(ratio: number) {
        this.snap(ratio);
    }

    public get value(): number {
        return this._ratio.value;
    }

    public get color(): number {
        return this._color.value;
    }

    /** Whether `update` still has anything to move. */
    public get isUpdating(): boolean {
        return this._ratio.needsUpdate(this._time, 0) || this._color.needsUpdate(this._time);
    }

    /** `setRatio(ratio, false)`: straight to the ratio, and to its colour (`syncCompletionColor(false)`). */
    public snap(ratio: number): void {
        this._ratio.snapTo(clamp(ratio, 0, 1), this._time);
        this._colorTarget = completionColor(this._ratio.value);
        this._color.snapTo(this._colorTarget, this._time);
    }

    /** `setRatio(ratio, true)`: `AnimatedScalar.setTarget` keeps the speed toward a target on the same side. */
    public setTarget(ratio: number): void {
        this._ratio.setTarget(clamp(ratio, 0, 1), this._time);
        this.fadeToCompletion();
    }

    /** `update(deltaMs)`: the scalar moves, then the colour follows whether the bar is now full. */
    public update(deltaMs: number): void {
        this._time += Math.max(0, deltaMs);
        this._ratio.update(this._time);
        this.fadeToCompletion();
        this._color.update(this._time);
    }

    private fadeToCompletion(): void {
        const color = completionColor(this._ratio.value);

        if (color === this._colorTarget) return;

        this._colorTarget = color;
        this._color.setTarget(color, this._time);
    }
}

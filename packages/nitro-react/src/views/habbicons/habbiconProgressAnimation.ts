/**
 * The motion of `HabbiconProgressBarView`: its `AnimatedScalar` (the fill ratio, accelerating to
 * `MAX_SPEED_PER_MS` and braking onto its target) and its `AnimatedColor` (`window/utils`, a
 * 250ms fade to green when the bar is full and back to blue when it is not), as pure steps over
 * one state object. The bar's `obf_P2y` is `time`: the milliseconds its `update` calls have
 * added up, the clock both animations run on.
 *
 * `AnimatedScalar` is the one `room/.../variablefx/animation` ported for the variable FX
 * (`MAX_INTEGRATION_STEP_MS` steps of constant acceleration); its deceleration is its
 * acceleration here. `AnimatedColor` is the `window/utils` one, whose `setTarget` ignores the
 * target it already has - the bar calls it on every frame.
 */

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

const MAX_INTEGRATION_STEP_MS = 8;

export interface HabbiconProgressAnimation {
    time: number;
    value: number;
    velocity: number;
    target: number;
    colorSource: number;
    colorStart: number;
    colorTarget: number;
    colorValue: number;
}

const sign = (value: number): number => ((value > 0) ? 1 : ((value < 0) ? -1 : 0));

const clampRatio = (ratio: number): number => Math.max(0, Math.min(1, ratio));

const completionColor = (value: number): number => ((value >= 1) ? HABBICON_PROGRESS_COMPLETE_COLOR : HABBICON_PROGRESS_INCOMPLETE_COLOR);

/** `AnimatedScalar.isSettled`. */
const isScalarSettled = (anim: HabbiconProgressAnimation): boolean => (Math.abs(anim.target - anim.value) <= HABBICON_PROGRESS_EPSILON) && (Math.abs(anim.velocity) <= HABBICON_PROGRESS_EPSILON);

/** `AnimatedScalar.resolveAcceleration`: speed up, hold the top speed, or brake so as to stop on the target. */
const resolveAcceleration = (anim: HabbiconProgressAnimation, direction: number): number => {
    const speed = anim.velocity * direction;

    if (speed < 0) return direction * HABBICON_PROGRESS_ACCELERATION_PER_MS;
    if (((speed * speed) / (2 * HABBICON_PROGRESS_ACCELERATION_PER_MS)) >= Math.abs(anim.target - anim.value)) return -direction * HABBICON_PROGRESS_ACCELERATION_PER_MS;
    if (speed >= HABBICON_PROGRESS_MAX_SPEED_PER_MS) return 0;

    return direction * HABBICON_PROGRESS_ACCELERATION_PER_MS;
};

/** `AnimatedScalar.integrateStep`. */
const integrateStep = (anim: HabbiconProgressAnimation, stepMs: number): HabbiconProgressAnimation => {
    const distance = anim.target - anim.value;
    const direction = sign(distance);

    if ((direction === 0) || (Math.abs(distance) <= HABBICON_PROGRESS_EPSILON)) return { ...anim, value: anim.target, velocity: 0 };

    const acceleration = resolveAcceleration(anim, direction);
    const value = anim.value + (anim.velocity * stepMs) + (0.5 * acceleration * stepMs * stepMs);
    let velocity = anim.velocity + (acceleration * stepMs);

    if ((sign(anim.target - value) !== direction) || (Math.abs(anim.target - value) <= HABBICON_PROGRESS_EPSILON)) return { ...anim, value: anim.target, velocity: 0 };
    if (Math.abs(velocity) > HABBICON_PROGRESS_MAX_SPEED_PER_MS) velocity = sign(velocity) * HABBICON_PROGRESS_MAX_SPEED_PER_MS;
    if ((anim.velocity !== 0) && (sign(velocity) !== sign(anim.velocity)) && (sign(acceleration) !== direction)) velocity = 0;

    return { ...anim, value, velocity };
};

/** `AnimatedColor.setTarget` (`window/utils`): a new target starts a fade from where the colour is now. */
const setColorTarget = (anim: HabbiconProgressAnimation, color: number): HabbiconProgressAnimation => {
    if (color === anim.colorTarget) return anim;

    const current = updateColor(anim);

    return { ...current, colorSource: current.colorValue, colorStart: current.time, colorTarget: color };
};

/** `AnimatedColor.update`: each channel moves linearly from the source to the target. */
const updateColor = (anim: HabbiconProgressAnimation): HabbiconProgressAnimation => {
    if (anim.time >= (anim.colorStart + HABBICON_PROGRESS_FILL_COLOR_TRANSITION_MS)) return (anim.colorValue === anim.colorTarget) ? anim : { ...anim, colorValue: anim.colorTarget };

    const t = Math.max(0, (anim.time - anim.colorStart) / HABBICON_PROGRESS_FILL_COLOR_TRANSITION_MS);
    const channel = (shift: number) => Math.round(((anim.colorSource >> shift) & 0xff) + ((((anim.colorTarget >> shift) & 0xff) - ((anim.colorSource >> shift) & 0xff)) * t));

    return { ...anim, colorValue: (channel(16) << 16) | (channel(8) << 8) | channel(0) };
};

/** The bar as its constructor leaves it and `setRatio(ratio, false)` then snaps it. */
export const createHabbiconProgress = (ratio: number): HabbiconProgressAnimation => snapHabbiconProgress({
    time: 0, value: 0, velocity: 0, target: 0,
    colorSource: HABBICON_PROGRESS_INCOMPLETE_COLOR, colorStart: 0, colorTarget: HABBICON_PROGRESS_INCOMPLETE_COLOR, colorValue: HABBICON_PROGRESS_INCOMPLETE_COLOR,
}, ratio);

/** `setRatio(ratio, false)`: straight to the ratio, and to its colour (`syncCompletionColor(false)`). */
export const snapHabbiconProgress = (anim: HabbiconProgressAnimation, ratio: number): HabbiconProgressAnimation => {
    const value = clampRatio(ratio);
    const color = completionColor(value);

    return { ...anim, value, target: value, velocity: 0, colorSource: color, colorStart: anim.time, colorTarget: color, colorValue: color };
};

/** `setRatio(ratio, true)`: `AnimatedScalar.setTarget` keeps the current speed toward a target on the same side, capped at the top speed. */
export const setHabbiconProgressTarget = (anim: HabbiconProgressAnimation, ratio: number): HabbiconProgressAnimation => {
    const target = clampRatio(ratio);
    const distance = target - anim.value;
    const direction = (Math.abs(distance) <= HABBICON_PROGRESS_EPSILON) ? 0 : sign(distance);
    const moved = (direction === 0)
        ? { ...anim, target, value: target, velocity: 0 }
        : { ...anim, target, velocity: direction * Math.min(Math.abs(anim.velocity), HABBICON_PROGRESS_MAX_SPEED_PER_MS) };

    return setColorTarget(moved, completionColor(moved.value));
};

/** `update(deltaMs)`: the scalar integrates in steps of at most 8ms, then the colour follows whether the bar is now full. */
export const stepHabbiconProgress = (anim: HabbiconProgressAnimation, deltaMs: number): HabbiconProgressAnimation => {
    let next = { ...anim, time: anim.time + Math.max(0, deltaMs) };
    let remaining = Math.max(0, deltaMs);

    while ((remaining > 0) && !isScalarSettled(next)) {
        const step = Math.min(remaining, MAX_INTEGRATION_STEP_MS);

        next = integrateStep(next, step);
        remaining -= step;
    }

    return updateColor(setColorTarget(next, completionColor(next.value)));
};

/** Whether `update` still has anything to move. */
export const isHabbiconProgressSettled = (anim: HabbiconProgressAnimation): boolean => isScalarSettled(anim) && (anim.colorValue === anim.colorTarget);

/** `render`: the visible progress width, the fill width (`CAP_OVERSHOOT` past it) and the highlight 2px inside the fill. */
export const getHabbiconProgressWidths = (anim: HabbiconProgressAnimation, maxWidth: number): { progress: number; fill: number; highlight: number } => {
    const progress = Math.max(0, Math.min(maxWidth, Math.round(maxWidth * anim.value)));
    const fill = (progress >= (maxWidth - HABBICON_PROGRESS_CAP_OVERSHOOT)) ? maxWidth : (progress + HABBICON_PROGRESS_CAP_OVERSHOOT);

    return { progress, fill: Math.max(0, fill), highlight: Math.max(0, fill - 2) };
};

/** A bar's size and look in `habbicon_view.xml`: its `background` shape's colour and radius, and its `highlight` gradient's height and blend. */
export interface HabbiconProgressBarGeometry {
    width: number;
    height: number;
    radius: number;
    backgroundColor: string;
    highlightHeight: number;
    highlightAlpha: number;
}

/** `album_progress_bar`. */
export const HABBICON_ALBUM_PROGRESS_BAR: HabbiconProgressBarGeometry = { width: 304, height: 18, radius: 6, backgroundColor: '#17394d', highlightHeight: 6, highlightAlpha: 0.1 };
/** `set_progress_bar`. */
export const HABBICON_SET_PROGRESS_BAR: HabbiconProgressBarGeometry = { width: 154, height: 16, radius: 6, backgroundColor: '#4d5d66', highlightHeight: 5, highlightAlpha: 0.09 };
/** `set_row_progress_bar`. */
export const HABBICON_SET_ROW_PROGRESS_BAR: HabbiconProgressBarGeometry = { width: 69, height: 12, radius: 4, backgroundColor: '#4d5d66', highlightHeight: 4, highlightAlpha: 0.08 };

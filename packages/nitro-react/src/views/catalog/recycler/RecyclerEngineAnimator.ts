/**
 * Flash's `catalog/viewer/widgets/utils/RecyclerEngineAnimator`: the recycler's gauge and shake.
 * While it runs, the `pointer_arrow` swings in random steps between -88 and 88 degrees (leaning
 * further right the longer it runs), the `recycle_machine` shakes 3px every 50ms, and once the
 * arrow has reached 82 after at least 3 seconds it calls `onFinish`. The easter egg (a
 * `wf_act_reset_timers` in a slot) steps 70 degrees back every 20ms and shakes 24px for 5 seconds.
 * `reset` swings the arrow back to 0 in 250ms; `stop` just stops.
 *
 * The arrow's rotation and the machine's offset are written through the callbacks the widget
 * gives it - Flash sets `_arrow.rotation` and the machine window's `x` / `y`.
 */

/** The animator's constants, under Flash's names where it has them. */
const MIN_ANGLE = -88;
const MAX_ANGLE = 88;
const FINISH_ANGLE = 82;
const FINAL_STEP_ANGLE = 68;
const ANGLE_BUFFER = 5;
const TIME_BIAS = 0.00008;
const BASE_BIAS = 0.35;
const FIRST_BIAS = 0.2;
const TICK_MS = 16;
const RESET_TIME = 250;
const SHAKE_TIMEOUT = 50;
const SHAKE_PIXELS = 3;
const MIN_TIME_ACTIVE = 3000;
const SHAKE_PIXELS_E = 24;
const STEP_SIZE_E = 70;
const STEP_DURATION_E = 20;
const TOTAL_DURATION_E = 5000;
const STEP_DURATION_MIN = 400;
const STEP_DURATION_MAX = 200;
const STEP_SIZE_MIN = 20;
const STEP_SIZE_MAX = 55;

/** `rand`: an `int` between the two, truncated. */
const rand = (min: number, max: number) => Math.trunc(min + (Math.random() * (max - min)));

export interface RecyclerEngineAnimatorTarget {
    getRotation: () => number;
    setRotation: (rotation: number) => void;
    setShake: (x: number, y: number) => void;
}

export class RecyclerEngineAnimator {
    private _startTime = 0;
    private _stepBeginTime = 0;
    private _stepStartAngle = 0;
    private _stepTargetAngle = 0;
    private _animationTime = 0;
    private _shakeLastTime = 0;
    private _timer: ReturnType<typeof setInterval> | undefined = undefined;
    private _resetting = false;
    private _easterEggMode = false;
    private _disposed = false;

    constructor(private readonly _target: RecyclerEngineAnimatorTarget, private readonly _onFinish: () => void) {
        this.setRotation(0);
    }

    public start(easterEggMode: boolean = false): void {
        this.stopTimer();
        this._resetting = false;
        this._easterEggMode = easterEggMode;
        this._startTime = performance.now();
        this.setRotation(0);
        this._target.setShake(0, 0);
        this.nextStep(false, true);
        this.startTimer();
    }

    public stop(): void {
        this.stopTimer();
        this._target.setShake(0, 0);
        this._resetting = false;
    }

    public reset(): void {
        this.stopTimer();
        this._resetting = true;
        this._stepStartAngle = this._target.getRotation();
        this.setRotation(this._stepStartAngle % 360);
        this._stepTargetAngle = 0;
        this._stepBeginTime = performance.now();
        this._animationTime = RESET_TIME;
        this._target.setShake(0, 0);
        this.startTimer();
    }

    public isBusy(): boolean {
        return (this._timer !== undefined) && !this._resetting;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.stopTimer();
        this._disposed = true;
    }

    private startTimer(): void {
        this._timer = setInterval(() => this.onTimerTick(), TICK_MS);
    }

    private stopTimer(): void {
        if (this._timer === undefined) return;

        clearInterval(this._timer);
        this._timer = undefined;
    }

    /** An `int` rotation, as Flash's `setRotation(int)`. */
    private setRotation(rotation: number): void {
        this._target.setRotation(Math.trunc(rotation));
    }

    private onTimerTick(): void {
        const now = performance.now();
        const elapsed = now - this._stepBeginTime;
        const progress = Math.max(0, Math.min(1, elapsed / this._animationTime));
        const angle = Math.trunc(((this._stepTargetAngle - this._stepStartAngle) * progress) + this._stepStartAngle);

        this.setRotation(angle);

        if (this.isBusy() && (now > (this._shakeLastTime + SHAKE_TIMEOUT))) {
            this._shakeLastTime = now;

            const pixels = this._easterEggMode ? SHAKE_PIXELS_E : SHAKE_PIXELS;

            this._target.setShake(rand(-pixels, pixels), rand(-pixels, pixels));
        }

        if (elapsed < this._animationTime) return;

        if (this._resetting) {
            this.stopTimer();
            this._resetting = false;
        } else if (((angle >= FINISH_ANGLE) && !this._easterEggMode && ((now - this._startTime) > MIN_TIME_ACTIVE)) || (this._easterEggMode && ((now - this._startTime) > TOTAL_DURATION_E))) {
            this.stopTimer();
            this._target.setShake(0, 0);
            this._onFinish();
        } else {
            this.nextStep((angle >= FINAL_STEP_ANGLE) && ((now - this._startTime) > (MIN_TIME_ACTIVE - 300)) && !this._easterEggMode);
        }
    }

    private nextStep(finalStep: boolean = false, firstStep: boolean = false): void {
        this._stepStartAngle = this._target.getRotation();
        this._stepBeginTime = performance.now();

        if (finalStep) {
            this._stepTargetAngle = MAX_ANGLE;
        } else if (this._easterEggMode) {
            this._stepTargetAngle = this._stepStartAngle - STEP_SIZE_E;
        } else {
            const elapsed = performance.now() - this._startTime;
            let backwards: boolean;

            if (this._stepStartAngle <= (MIN_ANGLE + ANGLE_BUFFER)) {
                backwards = false;
            } else if (this._stepStartAngle >= (MAX_ANGLE - ANGLE_BUFFER)) {
                backwards = true;
            } else {
                const bias = firstStep ? FIRST_BIAS : (BASE_BIAS + (elapsed * TIME_BIAS));

                backwards = Math.random() > bias;
            }

            const step = (backwards ? -1 : 1) * rand(STEP_SIZE_MIN, STEP_SIZE_MAX);

            this._stepTargetAngle = Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, this._stepStartAngle + step));
        }

        this._animationTime = this._easterEggMode ? STEP_DURATION_E : rand(STEP_DURATION_MIN, STEP_DURATION_MAX);
    }
}

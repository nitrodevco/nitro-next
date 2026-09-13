const MAX_INTEGRATION_STEP_MS = 8;

const sign = (value: number): number => {
    if (value > 0) return 1;
    if (value < 0) return -1;

    return 0;
};

/**
 * A value that accelerates toward its target, coasts at a max speed and decelerates to land on
 * it (units per ms). Used for bar fill widths, stack slot positions and level paths.
 */
export class AnimatedScalar {
    private _acceleration: number;
    private _deceleration: number;
    private _lastUpdateTimeMs: number = 0;
    private _maxSpeed: number;
    private _epsilon: number;
    private _velocity: number = 0;
    private _target: number = 0;
    private _value: number = 0;

    constructor(acceleration: number, maxSpeed: number, epsilon: number, deceleration?: number) {
        this._acceleration = Math.max(0, acceleration);
        this._deceleration = Math.max(0, deceleration === undefined ? acceleration : deceleration);
        this._maxSpeed = Math.max(0, maxSpeed);
        this._epsilon = Math.max(0, epsilon);
    }

    public get value(): number {
        return this._value;
    }

    public snapTo(value: number, time: number): void {
        this._lastUpdateTimeMs = time;
        this._velocity = 0;
        this._target = value;
        this._value = value;
    }

    public setTarget(target: number, time: number): void {
        this.update(time);

        this._target = target;
        this._lastUpdateTimeMs = time;

        const direction = this.resolveDirectionToTarget();

        if (direction === 0) {
            this.settle();

            return;
        }

        this._velocity = direction * Math.min(Math.abs(this._velocity), this._maxSpeed);
    }

    /** True while the value still has to move; `pixelScale` > 0 also counts a change in the rounded pixel value. */
    public needsUpdate(time: number, pixelScale: number): boolean {
        if (pixelScale > 0 && Math.trunc(this._target * pixelScale) !== Math.trunc(this._value * pixelScale)) return true;

        return Math.abs(this._target - this._value) > this._epsilon || Math.abs(this._velocity) > this._epsilon;
    }

    public update(time: number): boolean {
        let elapsed = Math.max(0, time - this._lastUpdateTimeMs);

        if (elapsed <= 0 || this.isSettled()) {
            this._lastUpdateTimeMs = time;

            return false;
        }

        const previous = this._value;

        while (elapsed > 0 && !this.isSettled()) {
            const step = Math.min(elapsed, MAX_INTEGRATION_STEP_MS);

            this.integrateStep(step);

            elapsed -= step;
        }

        this._lastUpdateTimeMs = time;

        return this._value !== previous;
    }

    private settle(): boolean {
        const changed = this._value !== this._target || this._velocity !== 0;

        this._value = this._target;
        this._velocity = 0;

        return changed;
    }

    private integrateStep(step: number): void {
        const remaining = this._target - this._value;
        const direction = sign(remaining);

        if (direction === 0 || Math.abs(remaining) <= this._epsilon) {
            this.settle();

            return;
        }

        const acceleration = this.resolveAcceleration(direction);
        const nextValue = this._value + this._velocity * step + 0.5 * acceleration * step * step;

        let nextVelocity = this._velocity + acceleration * step;

        if (sign(this._target - nextValue) !== direction || Math.abs(this._target - nextValue) <= this._epsilon) {
            this.settle();

            return;
        }

        if (this._maxSpeed > 0 && Math.abs(nextVelocity) > this._maxSpeed) nextVelocity = sign(nextVelocity) * this._maxSpeed;

        if (this._velocity !== 0 && sign(nextVelocity) !== sign(this._velocity) && sign(acceleration) !== direction) nextVelocity = 0;

        this._value = nextValue;
        this._velocity = nextVelocity;
    }

    private resolveAcceleration(direction: number): number {
        const towardSpeed = this._velocity * direction;

        if (towardSpeed < 0) return direction * this._acceleration;

        const stoppingDistance = this._deceleration > 0 ? (towardSpeed * towardSpeed) / (2 * this._deceleration) : 0;

        if (stoppingDistance >= Math.abs(this._target - this._value)) return -direction * this._deceleration;

        if (this._maxSpeed > 0 && towardSpeed >= this._maxSpeed) return 0;

        return this._acceleration <= 0 ? 0 : direction * this._acceleration;
    }

    private resolveDirectionToTarget(): number {
        const remaining = this._target - this._value;

        return Math.abs(remaining) <= this._epsilon ? 0 : sign(remaining);
    }

    private isSettled(): boolean {
        return Math.abs(this._target - this._value) <= this._epsilon && Math.abs(this._velocity) <= this._epsilon;
    }
}

const OPACITY_EPSILON = 0.0001;
const SINGLE_HEART_ANIMATION_MS = 200;
const MIN_HEART_FADE_DURATION_MS = 100;
const MAX_ANIMATION_DURATION_MS = 1400;

const filledArray = (length: number, value: number): number[] => new Array<number>(Math.max(0, length)).fill(value);

/**
 * Per-heart opacities that fade in/out one after another (staggered) when the heart count
 * changes: gaining hearts fades them in left to right, losing hearts fades them out right to
 * left, with the whole change capped at 1.4s.
 */
export class StackedHealthPointsAnimator {
    private _changedIndices: number[] = [];
    private _durationMs: number = 0;
    private _fadeDurationMs: number = 0;
    private _opacities: number[] = [];
    private _staggerMs: number = 0;
    private _startOpacities: number[] = [];
    private _startTime: number = 0;
    private _target: number = 0;
    private _targetOpacities: number[] = [];

    public get visibleHeartCount(): number {
        let count = 0;

        for (let i = 0; i < this._opacities.length; i++) {
            if (this._opacities[i] > OPACITY_EPSILON) count = Math.max(count, i + 1);
        }

        return count;
    }

    public getOpacity(index: number): number {
        return index >= 0 && index < this._opacities.length ? this._opacities[index] : 0;
    }

    public snapTo(heartCount: number, time: number): void {
        this._durationMs = 0;
        this._fadeDurationMs = 0;
        this._staggerMs = 0;
        this._startTime = time;
        this._target = heartCount;
        this._opacities = filledArray(heartCount, 1);
        this._startOpacities = [ ...this._opacities ];
        this._targetOpacities = [ ...this._opacities ];
        this._changedIndices = [];
    }

    public setTarget(heartCount: number, time: number): void {
        this.update(time);

        const length = Math.max(this._opacities.length, heartCount);
        const currentWeight = this.calculateCurrentWeight(length);
        const gaining = heartCount >= currentWeight;

        let totalChange = 0;

        this._startTime = time;
        this._target = heartCount;
        this._startOpacities = new Array<number>(length);
        this._targetOpacities = new Array<number>(length);
        this._changedIndices = [];

        for (let i = 0; i < length; i++) {
            const current = i < this._opacities.length ? this._opacities[i] : 0;
            const target = i < heartCount ? 1 : 0;
            const change = Math.abs(target - current);

            this._startOpacities[i] = current;
            this._targetOpacities[i] = target;

            totalChange += change;

            if (change > OPACITY_EPSILON) this._changedIndices.push(i);
        }

        this._changedIndices.sort((a, b) => (gaining ? a - b : b - a));

        this._durationMs = this.resolveDuration(totalChange);

        if (this._durationMs <= 0 || !this._changedIndices.length) {
            this.settle();

            return;
        }

        this._fadeDurationMs = this.resolveFadeDuration(totalChange);
        this._staggerMs = this._changedIndices.length > 1 ? (this._durationMs - this._fadeDurationMs) / (this._changedIndices.length - 1) : 0;
    }

    public needsUpdate(_time: number, _pixelScale: number): boolean {
        return this._changedIndices.length > 0;
    }

    public update(time: number): boolean {
        if (this._durationMs <= 0 || !this._changedIndices.length) return false;

        const elapsed = Math.max(0, time - this._startTime);

        if (elapsed >= this._durationMs) return this.settle();

        let changed = false;

        for (let i = 0; i < this._targetOpacities.length; i++) {
            const next = this.resolveNextOpacity(i, elapsed);

            if (next !== this._opacities[i]) {
                this._opacities[i] = next;
                changed = true;
            }
        }

        this.trimTrailingInvisibleHearts();

        return changed;
    }

    private settle(): boolean {
        const target = filledArray(this._target, 1);
        const changed = this._durationMs !== 0 || !this.opacitiesEqual(this._opacities, target);

        this._opacities = target;
        this._startOpacities = [ ...target ];
        this._targetOpacities = [ ...target ];
        this._changedIndices = [];
        this._durationMs = 0;
        this._fadeDurationMs = 0;
        this._staggerMs = 0;

        return changed;
    }

    private calculateCurrentWeight(length: number): number {
        let weight = 0;

        for (let i = 0; i < length; i++) weight += i < this._opacities.length ? this._opacities[i] : 0;

        return weight;
    }

    private resolveDuration(totalChange: number): number {
        if (totalChange <= OPACITY_EPSILON) return 0;

        const ratio = (MAX_ANIMATION_DURATION_MS - SINGLE_HEART_ANIMATION_MS) / MAX_ANIMATION_DURATION_MS;

        return MAX_ANIMATION_DURATION_MS * (1 - Math.pow(ratio, totalChange));
    }

    private resolveFadeDuration(totalChange: number): number {
        const perHeart = this._durationMs / totalChange;
        const fade = Math.max(MIN_HEART_FADE_DURATION_MS, Math.round(perHeart * 1.5));

        return Math.min(this._durationMs, fade);
    }

    private resolveNextOpacity(index: number, elapsed: number): number {
        const order = this._changedIndices.indexOf(index);

        if (order === -1) return index < this._targetOpacities.length ? this._targetOpacities[index] : 0;

        const localElapsed = elapsed - order * this._staggerMs;
        const ratio = Math.max(0, Math.min(1, localElapsed / this._fadeDurationMs));
        const start = index < this._startOpacities.length ? this._startOpacities[index] : 0;
        const target = index < this._targetOpacities.length ? this._targetOpacities[index] : 0;

        return start + (target - start) * ratio;
    }

    private trimTrailingInvisibleHearts(): void {
        while (this._opacities.length > this._target && this._opacities[this._opacities.length - 1] <= OPACITY_EPSILON) this._opacities.pop();
    }

    private opacitiesEqual(a: number[], b: number[]): boolean {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (Math.abs(a[i] - b[i]) > OPACITY_EPSILON) return false;
        }

        return true;
    }
}

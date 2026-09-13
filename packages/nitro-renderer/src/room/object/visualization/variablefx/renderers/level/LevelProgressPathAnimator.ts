import { AnimatedScalar } from '../../animation/AnimatedScalar';
import { LevelProgressPathSample } from './LevelProgressPathSample';

const PATH_EPSILON = 0.000001;

export interface LevelProgressPathDisplay {
    level: number;
    progress: number;
}

/**
 * Animates along a continuous "level path" (level + progress) so gaining a level plays the bar
 * filling to the end, the badge ticking over, and the bar refilling from zero, in one motion.
 */
export class LevelProgressPathAnimator {
    private _path: AnimatedScalar;
    private _target: LevelProgressPathSample = new LevelProgressPathSample(0, 0, false, undefined);

    constructor() {
        this._path = new AnimatedScalar(0.000008, 0.02, 0.0001, 0.000006);
    }

    /** A maxed level whose value sits at the (degenerate) max reads as a full bar. */
    public static resolveLevelProgressSampleProgress(progress: number, value: number, minValue: number, maxValue: number, isMaxed: boolean): number {
        if (isMaxed && Number.isFinite(value) && Number.isFinite(minValue) && Number.isFinite(maxValue) && minValue === maxValue && value >= maxValue) return 1;

        return progress;
    }

    public static resolveLevelProgressPathDisplay(path: number, target: LevelProgressPathSample): LevelProgressPathDisplay {
        const normalized = LevelProgressPathSample.normalize(target);
        const targetPath = LevelProgressPathAnimator.resolveLevelProgressPath(normalized);

        if (Math.abs(path - targetPath) <= PATH_EPSILON) return { level: normalized.level, progress: normalized.progress };

        const clamped = Number.isFinite(path) ? Math.max(0, path) : 0;
        const level = Math.floor(clamped);
        const progress = clamped - level;

        if (progress <= PATH_EPSILON) return { level, progress: 0 };
        if (1 - progress <= PATH_EPSILON) return { level: level + 1, progress: 0 };

        return { level, progress };
    }

    public static resolveLevelProgressPath(sample: LevelProgressPathSample): number {
        const normalized = LevelProgressPathSample.normalize(sample);

        if (normalized.isMaxed && normalized.progress >= 1) return normalized.level;

        return normalized.level + normalized.progress;
    }

    public get displayedLevel(): number {
        return this.displayed.level;
    }

    public get displayedProgress(): number {
        return this.displayed.progress;
    }

    public get displayedPath(): number {
        return this._path.value;
    }

    public get target(): LevelProgressPathSample {
        return this._target;
    }

    public snapTo(sample: LevelProgressPathSample, time: number): void {
        this._target = LevelProgressPathSample.normalize(sample);

        this._path.snapTo(LevelProgressPathAnimator.resolveLevelProgressPath(this._target), time);
    }

    public setTarget(sample: LevelProgressPathSample, time: number): void {
        this._target = LevelProgressPathSample.normalize(sample);

        this._path.setTarget(LevelProgressPathAnimator.resolveLevelProgressPath(this._target), time);
    }

    public needsUpdate(time: number, pixelScale: number): boolean {
        return this._path.needsUpdate(time, pixelScale);
    }

    public update(time: number): boolean {
        return this._path.update(time);
    }

    private get displayed(): LevelProgressPathDisplay {
        return LevelProgressPathAnimator.resolveLevelProgressPathDisplay(this._path.value, this._target);
    }
}

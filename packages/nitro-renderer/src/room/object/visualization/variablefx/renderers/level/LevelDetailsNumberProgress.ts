import { LevelProgressPathAnimator } from './LevelProgressPathAnimator';
import { LevelProgressPathSample } from './LevelProgressPathSample';

const ELLIPSIS = '...';
const PATH_EPSILON = 0.0001;

export interface LevelDetailsNumberTarget {
    maxValue: number;
    pathSample: LevelProgressPathSample;
    value: number;
}

export interface LevelDetailsNumberDisplay {
    currentText: string;
    maxText: string;
}

/** Interpolates the "current/max" text along the level path so the numbers count with the bar. */
export class LevelDetailsNumberProgress {
    private _initialized: boolean = false;
    private _sourceMaxText: string = '0';
    private _sourcePath: number = 0;
    private _sourceValue: number = 0;
    private _target: LevelDetailsNumberTarget = { maxValue: 0, pathSample: new LevelProgressPathSample(0, 0, false, undefined), value: 0 };
    private _targetMaxText: string = '0';
    private _targetPath: number = 0;
    private _targetValue: number = 0;

    public snapTo(target: LevelDetailsNumberTarget): void {
        this._target = this.normalizeTarget(target);
        this._targetPath = LevelProgressPathAnimator.resolveLevelProgressPath(this._target.pathSample);
        this._targetValue = this.normalizeNumber(this._target.value);
        this._targetMaxText = this.formatNumber(this._target.maxValue);
        this._sourcePath = this._targetPath;
        this._sourceValue = this._targetValue;
        this._sourceMaxText = this._targetMaxText;
        this._initialized = true;
    }

    public setTarget(target: LevelDetailsNumberTarget, displayedPath: number): void {
        if (!this._initialized) {
            this.snapTo(target);

            return;
        }

        const display = this.resolveDisplay(displayedPath);

        this._sourcePath = this.normalizePath(displayedPath);
        this._sourceValue = this.normalizeNumber(Number(display.currentText));
        this._sourceMaxText = display.maxText;
        this._target = this.normalizeTarget(target);
        this._targetPath = LevelProgressPathAnimator.resolveLevelProgressPath(this._target.pathSample);
        this._targetValue = this.normalizeNumber(this._target.value);
        this._targetMaxText = this.formatNumber(this._target.maxValue);
    }

    public resolveDisplay(displayedPath: number): LevelDetailsNumberDisplay {
        const path = this.normalizePath(displayedPath);

        return {
            currentText: this.formatNumber(this.resolveCurrentValue(path)),
            maxText: this.resolveMaxText(path),
        };
    }

    public isAtTarget(displayedPath: number): boolean {
        return Math.abs(this.normalizePath(displayedPath) - this._targetPath) <= PATH_EPSILON;
    }

    private resolveCurrentValue(path: number): number {
        const distance = this._targetPath - this._sourcePath;

        if (Math.abs(distance) <= PATH_EPSILON) return this._targetValue;

        const ratio = Math.max(0, Math.min(1, (path - this._sourcePath) / distance));
        const value = this._sourceValue + (this._targetValue - this._sourceValue) * ratio;

        if (ratio >= 1 - PATH_EPSILON) return this._targetValue;
        if (ratio <= PATH_EPSILON) return this._sourceValue;

        return Math.trunc(value);
    }

    private resolveMaxText(path: number): string {
        const distance = this._targetPath - this._sourcePath;

        if (Math.abs(distance) <= PATH_EPSILON) return this._targetMaxText;

        return distance > 0 ? this.resolveForwardMaxText(path) : this.resolveBackwardMaxText(path);
    }

    private resolveForwardMaxText(path: number): string {
        const nextLevelStart = Math.floor(this._sourcePath) + 1;
        const targetSegmentStart = this.resolveTargetSegmentStart();

        if (path < nextLevelStart - PATH_EPSILON) return this._sourceMaxText;
        if (path >= targetSegmentStart - PATH_EPSILON) return this._targetMaxText;

        return ELLIPSIS;
    }

    private resolveBackwardMaxText(path: number): string {
        const sourceLevelStart = Math.floor(this._sourcePath);
        const targetLevelEnd = Math.floor(this._targetPath) + 1;

        if (path >= sourceLevelStart + PATH_EPSILON) return this._sourceMaxText;
        if (path <= targetLevelEnd + PATH_EPSILON) return this._targetMaxText;

        return ELLIPSIS;
    }

    private resolveTargetSegmentStart(): number {
        return this._target.pathSample.progress <= PATH_EPSILON && this._targetPath > 0 ? this._targetPath - 1 : Math.floor(this._targetPath);
    }

    private normalizeTarget(target: LevelDetailsNumberTarget): LevelDetailsNumberTarget {
        return {
            maxValue: this.normalizeNumber(target.maxValue),
            pathSample: target.pathSample,
            value: this.normalizeNumber(target.value),
        };
    }

    private normalizePath(path: number): number {
        return Number.isFinite(path) ? Math.max(0, path) : 0;
    }

    private normalizeNumber(value: number): number {
        if (!Number.isFinite(value)) return 0;

        return Math.max(0, Math.trunc(value));
    }

    private formatNumber(value: number): string {
        return String(this.normalizeNumber(value));
    }
}

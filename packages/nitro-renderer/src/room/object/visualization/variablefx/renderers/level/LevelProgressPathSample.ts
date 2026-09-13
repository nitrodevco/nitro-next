/** A point on the "level path": level + progress inside the level (0..1), with the max level when known. */
export class LevelProgressPathSample {
    public isMaxed: boolean;
    public level: number;
    public maxLevel: number | undefined;
    public progress: number;

    constructor(level: number, progress: number, isMaxed: boolean, maxLevel: number | undefined) {
        this.level = LevelProgressPathSample.normalizeLevel(level);
        this.progress = LevelProgressPathSample.normalizeProgress(progress);
        this.isMaxed = isMaxed;
        this.maxLevel = LevelProgressPathSample.normalizeMaxLevel(maxLevel);
    }

    public static normalize(sample: LevelProgressPathSample): LevelProgressPathSample {
        return new LevelProgressPathSample(sample.level, sample.progress, sample.isMaxed, sample.maxLevel);
    }

    private static normalizeLevel(level: number): number {
        if (!Number.isFinite(level) || level < 0) return 0;

        return Math.trunc(level);
    }

    private static normalizeProgress(progress: number): number {
        if (!Number.isFinite(progress)) return 0;

        return Math.max(0, Math.min(1, progress));
    }

    private static normalizeMaxLevel(maxLevel: number | undefined): number | undefined {
        if (maxLevel === undefined || !Number.isFinite(maxLevel) || maxLevel < 0) return undefined;

        return Math.trunc(maxLevel);
    }
}

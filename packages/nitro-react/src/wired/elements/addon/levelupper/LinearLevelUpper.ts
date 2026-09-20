/**
 * `addons/levelupper/LinearLevelUpper` - every level needs the same `stepSize` xp, up to
 * `maxLevel`.
 */
import { AbstractLevelUpConfig, toInt32 } from './AbstractLevelUpConfig';

export class LinearLevelUpper extends AbstractLevelUpConfig {
    public constructor(private readonly _stepSize: number, private readonly _maxLevel: number) {
        super();
    }

    public get maxLevel(): number {
        return this._maxLevel;
    }

    public get maxXp(): number {
        return this._maxLevel * this._stepSize;
    }

    public xpForLevel(level: number): number {
        if (level <= 1) return 0;

        return this._stepSize * (level - 1);
    }

    public currentLevel(xp: number): number {
        xp = this.boundedValue(xp);

        if (xp < 0) return 1;

        return Math.min(this._maxLevel, 1 + toInt32(xp / this._stepSize));
    }

    public totalXpRequired(xp: number): number {
        if (this.isMaxed(xp)) return 0;

        return this._stepSize;
    }

    public progress(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        return xp % this._stepSize;
    }

    public progressPercentage(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        return toInt32((this.progress(xp) / this._stepSize) * 100);
    }

    public xpRemaining(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        return this._stepSize - (xp % this._stepSize);
    }

    public isMaxed(xp: number): boolean {
        return this.currentLevel(xp) >= this._maxLevel;
    }
}

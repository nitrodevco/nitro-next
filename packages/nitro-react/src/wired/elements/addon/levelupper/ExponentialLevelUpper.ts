/**
 * `addons/levelupper/ExponentialLevelUpper` - the first level-up needs `firstLevelXp` and each
 * one after it `increaseFactor` percent more, up to `maxLevel`.
 */
import { AbstractLevelUpConfig, toInt32 } from './AbstractLevelUpConfig';

export class ExponentialLevelUpper extends AbstractLevelUpConfig {
    private readonly _strength: number;
    private readonly _maxXp: number;

    public constructor(private readonly _firstLevelXp: number, increaseFactor: number, private readonly _maxLevel: number) {
        super();

        this._strength = increaseFactor / 100;
        this._maxXp = this.xpForLevel(_maxLevel);
    }

    public get maxLevel(): number {
        return this._maxLevel;
    }

    public get maxXp(): number {
        return this._maxXp;
    }

    public xpForLevel(level: number): number {
        if (level < 1) return 0;
        if (level > this._maxLevel) return this._maxXp;

        return toInt32(this._firstLevelXp * (((Math.pow(1 + this._strength, level - 1) - 1) + 1e-9) / this._strength));
    }

    public currentLevel(xp: number): number {
        xp = this.boundedValue(xp);

        if (xp <= 0) return 1;

        const level = toInt32(Math.log(((xp * this._strength) / this._firstLevelXp) + 1) / Math.log(1 + this._strength)) + 1;

        if (level > this._maxLevel) return this._maxLevel;
        if (level < 1) return 1;
        if (xp < this.xpForLevel(level)) return Math.max(1, level - 1);
        if (xp >= this.xpForLevel(level + 1)) return Math.min(this._maxLevel, level + 1);

        return level;
    }

    public totalXpRequired(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        const level = this.currentLevel(xp);

        return this.xpForLevel(level + 1) - this.xpForLevel(level);
    }

    public progress(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        return xp - this.xpForLevel(this.currentLevel(xp));
    }

    public progressPercentage(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        const level = this.currentLevel(xp);
        const levelXp = this.xpForLevel(level);
        const nextLevelXp = this.xpForLevel(level + 1);

        if (levelXp === nextLevelXp) return 100;

        return toInt32(((xp - levelXp) / (nextLevelXp - levelXp)) * 100);
    }

    public xpRemaining(xp: number): number {
        xp = this.boundedValue(xp);

        if (this.isMaxed(xp)) return 0;

        return this.xpForLevel(this.currentLevel(xp) + 1) - xp;
    }

    public isMaxed(xp: number): boolean {
        xp = this.boundedValue(xp);

        return this.currentLevel(xp) >= this._maxLevel;
    }
}

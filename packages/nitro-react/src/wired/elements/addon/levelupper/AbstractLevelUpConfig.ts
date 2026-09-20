/**
 * `addons/levelupper/AbstractLevelUpConfig` - a level-up curve: which level an amount of xp is,
 * how much xp a level needs and the progress in between. `§_-3p§` (the variable level-up addon)
 * builds one from its form to preview the xp its first levels need; the server runs the same
 * curves on the variable.
 *
 * Flash's `int(...)` is `ToInt32` - the curves truncate and wrap exactly as `toInt32` does.
 */

/** Flash's `int(value)` on a `Number`: truncated towards zero and wrapped to 32 bits, `NaN` and infinities to 0. */
export const toInt32 = (value: number): number => value | 0;

export abstract class AbstractLevelUpConfig {
    public abstract get maxLevel(): number;
    public abstract get maxXp(): number;
    public abstract xpForLevel(level: number): number;
    public abstract currentLevel(xp: number): number;
    public abstract totalXpRequired(xp: number): number;
    public abstract progress(xp: number): number;
    public abstract progressPercentage(xp: number): number;
    public abstract xpRemaining(xp: number): number;
    public abstract isMaxed(xp: number): boolean;

    /** `boundedValue` - xp clamped to 0 and `maxXp`. */
    public boundedValue(xp: number): number {
        if (xp < 0) return 0;

        return Math.min(xp, this.maxXp);
    }
}

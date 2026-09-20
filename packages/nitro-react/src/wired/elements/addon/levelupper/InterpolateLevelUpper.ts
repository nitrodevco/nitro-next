/**
 * `addons/levelupper/InterpolateLevelUpper` - a curve through hand-typed points (level -> xp),
 * the levels between two points spread evenly over the xp between them; the last point is the
 * maximum level. Without points everything is level 1.
 *
 * Flash keeps the points as a `Map` from xp to level (`generateTree`), in the order they were
 * given - ascending, since `§_-3p§` refuses anything else.
 */
import { AbstractLevelUpConfig, toInt32 } from './AbstractLevelUpConfig';

/** `LevelUpProgressInfo` (a private class of the Flash file). */
interface LevelUpProgressInfo {
    currentLevel: number;
    nextLevel: number;
    currentLevelXp: number;
    currentXp: number;
    nextLevelXp: number;
    isMaxed: boolean;
}

export class InterpolateLevelUpper extends AbstractLevelUpConfig {
    /** `§_-6O§` - xp -> level. */
    private readonly _tree: Map<number, number>;
    private readonly _maxedProgressInfo: LevelUpProgressInfo;

    /** `levelToXp` - the typed points, level -> xp. */
    public constructor(levelToXp: Map<number, number>) {
        super();

        this._tree = new Map([ ...levelToXp ].map(([ level, xp ]) => [ xp, level ]));
        this._maxedProgressInfo = this.findProgressInfoForMax();
    }

    private findProgressInfoForMax(): LevelUpProgressInfo {
        const lastXp = this.lastEntryKey();

        if (lastXp === null) return { currentLevel: 1, nextLevel: 1, currentLevelXp: 0, currentXp: 0, nextLevelXp: 0, isMaxed: true };

        const level = this._tree.get(lastXp) ?? 0;

        return { currentLevel: level, nextLevel: level, currentLevelXp: lastXp, currentXp: lastXp, nextLevelXp: lastXp, isMaxed: true };
    }

    private findProgressInfo(xp: number): LevelUpProgressInfo {
        xp = this.boundedValue(xp);

        const floorXp = this.floorEntryKey(xp);
        const ceilingXp = this.ceilingEntryKey(xp + 1);

        if (ceilingXp === null) return this._maxedProgressInfo;

        const lowLevel = (floorXp === null) ? 1 : (this._tree.get(floorXp) ?? 0);
        const lowXp = (floorXp === null) ? 0 : floorXp;
        const highLevel = this._tree.get(ceilingXp) ?? 0;
        const levelSpan = highLevel - lowLevel;
        const xpPerLevel = (ceilingXp - lowXp) / levelSpan;
        const relativeXp = xp - lowXp;

        let steps = Math.min(Math.max(toInt32(relativeXp / xpPerLevel), 0), levelSpan - 1);
        let currentLevel = lowLevel + steps;
        let currentLevelXp = lowXp + toInt32(xpPerLevel * steps);
        let nextLevel = -1;
        let nextLevelXp = -1;
        let again = true;
        let mayStep = true;

        while (again) {
            again = false;

            if (steps === (levelSpan - 1)) {
                nextLevel = highLevel;
                nextLevelXp = ceilingXp;
            } else {
                nextLevel = lowLevel + (steps + 1);
                nextLevelXp = lowXp + toInt32(xpPerLevel * (steps + 1));

                if (mayStep && ((relativeXp + lowXp) >= nextLevelXp)) {
                    steps++;
                    currentLevel = lowLevel + steps;
                    currentLevelXp = lowXp + toInt32(xpPerLevel * steps);
                    again = true;
                    mayStep = false;
                }
            }
        }

        return { currentLevel, nextLevel, currentLevelXp, currentXp: xp, nextLevelXp, isMaxed: false };
    }

    public xpForLevel(level: number): number {
        if (level <= 1) return 0;

        let lastXp = 0;

        for (const [ xp, pointLevel ] of this._tree) {
            if (pointLevel === level) return xp;

            if (pointLevel > level) {
                const lowerXp = this.getLowerEntryKey(xp);
                const lowLevel = (lowerXp === null) ? 1 : (this._tree.get(lowerXp) ?? 0);
                const lowXp = (lowerXp === null) ? 0 : toInt32(lowerXp);
                const xpPerLevel = toInt32(xp - lowXp) / toInt32(pointLevel - lowLevel);

                return lowXp + toInt32(xpPerLevel * toInt32(level - lowLevel));
            }

            lastXp = xp;
        }

        return lastXp;
    }

    public get maxLevel(): number {
        return this._maxedProgressInfo.currentLevel;
    }

    public get maxXp(): number {
        return this._maxedProgressInfo.currentLevelXp;
    }

    public currentLevel(xp: number): number {
        return this.findProgressInfo(xp).currentLevel;
    }

    public totalXpRequired(xp: number): number {
        const info = this.findProgressInfo(xp);

        return info.nextLevelXp - info.currentLevelXp;
    }

    public progress(xp: number): number {
        const info = this.findProgressInfo(xp);

        return info.currentXp - info.currentLevelXp;
    }

    public progressPercentage(xp: number): number {
        const info = this.findProgressInfo(xp);

        return toInt32(((info.currentXp - info.currentLevelXp) / (info.nextLevelXp - info.currentLevelXp)) * 100);
    }

    public xpRemaining(xp: number): number {
        const info = this.findProgressInfo(xp);

        return info.nextLevelXp - info.currentXp;
    }

    public isMaxed(xp: number): boolean {
        return this.findProgressInfo(xp).isMaxed;
    }

    /** The largest xp below `xp`. */
    private getLowerEntryKey(xp: number): number | null {
        let result: number | null = null;

        for (const key of this._tree.keys()) {
            if ((key < xp) && ((result === null) || (key > result))) result = key;
        }

        return result;
    }

    /** The largest xp at or below `xp`. */
    private floorEntryKey(xp: number): number | null {
        let result: number | null = null;

        for (const key of this._tree.keys()) {
            if ((key <= xp) && ((result === null) || (key > result))) result = key;
        }

        return result;
    }

    /** The smallest xp at or above `xp`. */
    private ceilingEntryKey(xp: number): number | null {
        let result: number | null = null;

        for (const key of this._tree.keys()) {
            if ((key >= xp) && ((result === null) || (key < result))) result = key;
        }

        return result;
    }

    private lastEntryKey(): number | null {
        let result: number | null = null;

        for (const key of this._tree.keys()) {
            if ((result === null) || (key > result)) result = key;
        }

        return result;
    }
}

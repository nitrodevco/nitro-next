/**
 * `addons/variablefx/model/VariableFxPreviewStatus` - the made-up value the editor's live preview
 * shows, and what the "randomize" button does to it: a new value somewhere in the range (at
 * least a fifth of the bar away from the last one), and for the levelling category a level up, a
 * level down or a jump, with the range narrowed to that level (`LinearLevelUpper(100, 25)`: 100 xp
 * per level, 25 levels). A dynamic team colour gets a random team colour; the stacked hearts
 * renderer always previews 9 (medium) or 15 hearts.
 *
 * The status is mutable, as Flash's is: one instance lives as long as the preview.
 */
import { VariableFxServerTables, VariableFxStatusData } from '@nitrodevco/nitro-renderer';

import { LinearLevelUpper } from '../../levelupper/LinearLevelUpper';
import { VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS, variableFxCurrentStyle, VariableFxState } from './VariableFxState';

const MAX_LEVEL = 25;
/** `§_-T2X§` - xp per level. */
const XP_PER_LEVEL = 100;
const TEAM_COLORS = [ '#df291e', '#36b24a', '#3b7de3', '#ffd83d' ];
const LEVEL_UPPER = new LinearLevelUpper(XP_PER_LEVEL, MAX_LEVEL);
const DEFAULT_DELEGATED_COLOR = '#ffffff';

/** The health points category and its stacked hearts renderer. */
const CATEGORY_HEALTH_POINTS = 0;
const RENDERER_STACKED_HEALTH_POINTS = 12;

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

/** AS3 `int(x)`. */
const toInt = (value: number): number => Math.trunc(value) | 0;

export class VariableFxPreviewStatus {
    /** `§_-S1k§` - the previewed value. */
    private _value: number = 50;
    /** `§_-Wd§` - where it sits in the range, 0 to 1. */
    private _progress: number = 0.5;
    private _delegatedColor: string = DEFAULT_DELEGATED_COLOR;
    /** `§_-fg§` - randomized at least once: the status extras come from here, not the style's defaults. */
    private _randomized: boolean = false;
    private _overrideMinValue: number | null = null;
    private _overrideMaxValue: number | null = null;

    /** `randomize(state)` - the button. */
    public randomize(state: VariableFxState): void {
        if (state.colorId === VariableFxServerTables.resolveColorId('DYNAMIC_TEAM_COLOR')) this._delegatedColor = TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)];

        this.updateHealthPointPreviewOverrides(state);

        if (state.categoryId === VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS) this.randomizeLevel(state);
        else this.randomizeNormal(state);

        this._randomized = true;
    }

    /** `toStatusData(state)` - the status the preview's visualizer is given. */
    public toStatusData(state: VariableFxState | null = null): VariableFxStatusData {
        const extra = new Map<string, string>();

        if (state) {
            for (const [ key, value ] of variableFxCurrentStyle(state).defaultStatusExtra) extra.set(key, value);

            this.updateHealthPointPreviewOverrides(state);

            if ((this._delegatedColor === DEFAULT_DELEGATED_COLOR) && (state.colorId === VariableFxServerTables.resolveColorId('DYNAMIC_TEAM_COLOR'))) this._delegatedColor = TEAM_COLORS[0];
        }

        if (this._randomized || !extra.has('current_level')) extra.set('current_level', String(LEVEL_UPPER.currentLevel(this._value)));
        if (this._randomized || !extra.has('is_maxed')) extra.set('is_maxed', String(LEVEL_UPPER.isMaxed(this._value)));
        if (this._randomized || !extra.has('max_level')) extra.set('max_level', String(LEVEL_UPPER.maxLevel));
        if (this._randomized || !extra.has('delegated_color')) extra.set('delegated_color', this._delegatedColor);

        return new VariableFxStatusData(this._value, this._overrideMinValue ?? undefined, this._overrideMaxValue ?? undefined, extra, false);
    }

    private randomizeNormal(state: VariableFxState): void {
        let min = (this._overrideMinValue !== null) ? toInt(this._overrideMinValue) : state.defaultMinValue;
        let max = (this._overrideMaxValue !== null) ? toInt(this._overrideMaxValue) : state.defaultMaxValue;

        if (max <= min) {
            min = 0;
            max = 100;
        }

        const previousValue = this._value;
        let progress = this._progress;
        let attempts = 0;

        while (((previousValue === this._value) || (Math.abs(progress - this._progress) < 0.2)) && (attempts < 50)) {
            this._value = min + Math.round(Math.random() * (max - min));
            progress = (this._value - min) / (max - min);
            attempts += 1;
        }

        this._progress = progress;
    }

    private randomizeLevel(state: VariableFxState): void {
        const roll = Math.random();

        if (roll < 0.25) {
            this.randomizeNormal(state);

            return;
        }

        const level = LEVEL_UPPER.currentLevel(this._value);

        if (roll < 0.65) {
            const direction = Math.random();

            if ((level < LEVEL_UPPER.maxLevel) && ((level <= 1) || (direction < 0.5))) {
                this._value += XP_PER_LEVEL;
                this._overrideMinValue = LEVEL_UPPER.xpForLevel(level + 1);
                this._overrideMaxValue = LEVEL_UPPER.xpForLevel(Math.min(MAX_LEVEL, level + 2));
            } else {
                this._value -= XP_PER_LEVEL;
                this._overrideMinValue = LEVEL_UPPER.xpForLevel(level - 1);
                this._overrideMaxValue = LEVEL_UPPER.xpForLevel(level);
            }

            this.randomizeNormal(state);

            return;
        }

        let jump = toInt(-MAX_LEVEL + (Math.random() * (2 * MAX_LEVEL)));
        let attempts = 0;

        while ((((level + jump) < 1) || ((level + jump) > MAX_LEVEL)) && (attempts < 50)) {
            jump = toInt(-MAX_LEVEL + (Math.random() * (2 * MAX_LEVEL)));
            attempts += 1;
        }

        this._value += clamp(jump * XP_PER_LEVEL, 0, XP_PER_LEVEL * (MAX_LEVEL + 1));

        const target = level + jump;

        if (target === MAX_LEVEL) {
            this._overrideMinValue = this._value;
            this._overrideMaxValue = this._value;
            this._progress = 1;

            return;
        }

        this._overrideMinValue = LEVEL_UPPER.xpForLevel(target);
        this._overrideMaxValue = LEVEL_UPPER.xpForLevel(target + 1);
        this.randomizeNormal(state);
    }

    private updateHealthPointPreviewOverrides(state: VariableFxState): void {
        if (state.categoryId !== CATEGORY_HEALTH_POINTS) return;

        if (state.rendererId === RENDERER_STACKED_HEALTH_POINTS) {
            this.applyStackedHeartPreviewOverrides(state);
        } else {
            this._overrideMinValue = null;
            this._overrideMaxValue = null;
        }
    }

    private applyStackedHeartPreviewOverrides(state: VariableFxState): void {
        const range = state.defaultMaxValue - state.defaultMinValue;

        this._overrideMinValue = 0;
        this._overrideMaxValue = clamp((state.widthId === VariableFxServerTables.resolveWidthId('medium')) ? 9 : 15, 1, range);
    }
}

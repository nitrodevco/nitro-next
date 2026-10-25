/**
 * `wired_setup/common/utils/ChronoFieldRangeFilter` - one field of a date or time condition
 * (`TimeMatches`, `DateMatches`): whether the field is filtered at all and the inclusive range it
 * must fall in - together with the three-way choice `ChronoRangeFilterPreset` edits it through
 * (skip / exactly / between), which is what a form holds while the box is open.
 *
 * `chronoRangeStateFromFilter` is the preset's `applyFilter` (an element's `createForm` calls it
 * with the box's int params) and `chronoRangeFilterFromState` its `getFilter` (`readIntParams`).
 */
export interface ChronoFieldRangeFilter {
    name: string;
    useFilter: boolean;
    min: number;
    max: number;
    defaultValue: number;
}

/** `ChronoRangeFilterPreset.MODE_*`. */
export const CHRONO_RANGE_MODE_SKIP = 0;
export const CHRONO_RANGE_MODE_EXACT = 1;
export const CHRONO_RANGE_MODE_RANGE = 2;

/** What `WiredChronoRangeFilter` edits: the selected radio option and the three number inputs. */
export interface ChronoRangeFilterState {
    mode: number;
    exact: number;
    from: number;
    to: number;
}

/** The `ChronoFieldRangeFilter` constructor, `defaultValue` optional as in Flash. */
export const createChronoFieldRangeFilter = (name: string, useFilter: boolean, min: number, max: number, defaultValue: number = 0): ChronoFieldRangeFilter =>
    ({ name, useFilter, min, max, defaultValue });

/** `ChronoRangeFilterPreset.applyFilter` - the inputs a mode does not use go back to the default. */
export const chronoRangeStateFromFilter = (filter: ChronoFieldRangeFilter, defaultValue: number = filter.defaultValue): ChronoRangeFilterState => {
    if (!filter.useFilter) return { mode: CHRONO_RANGE_MODE_SKIP, exact: defaultValue, from: defaultValue, to: defaultValue };

    if (filter.min === filter.max) return { mode: CHRONO_RANGE_MODE_EXACT, exact: filter.min, from: defaultValue, to: defaultValue };

    return { mode: CHRONO_RANGE_MODE_RANGE, exact: defaultValue, from: filter.min, to: filter.max };
};

/** `ChronoRangeFilterPreset.getFilter`. */
export const chronoRangeFilterFromState = (name: string, state: ChronoRangeFilterState, defaultValue: number = 0): ChronoFieldRangeFilter => {
    if (state.mode === CHRONO_RANGE_MODE_SKIP) return createChronoFieldRangeFilter(name, false, defaultValue, defaultValue, defaultValue);

    if (state.mode === CHRONO_RANGE_MODE_EXACT) return createChronoFieldRangeFilter(name, true, state.exact, state.exact, defaultValue);

    return createChronoFieldRangeFilter(name, true, state.from, state.to, defaultValue);
};

/**
 * `uibuilder/presets/applications/ChronoMaskFilterPreset` - the weekday and month grids of the
 * "date matches" condition (`DateMatches`): one checkbox per label, in `columns` columns, the
 * ticked ones kept as a bit mask (bit `i` for label `i`), which is the int param the box stores.
 *
 * Controlled: `mask` is the form field (`createForm` reads it straight from the int param, as
 * `mask = getInt(n)` did) and `onChange` hands back the next mask.
 */
import { isCheckboxMaskBitSet, setCheckboxMaskBit } from '#base/wired';

import { WiredCheckboxGroup } from './WiredCheckboxGroup';

export interface WiredChronoMaskFilterProps {
    /** One caption per bit, a literal or `${key}` (`DateMatches.buildWeekdayLabels` / `buildMonthLabels`). */
    labels: readonly string[];
    mask: number;
    onChange: (mask: number) => void;
    /** `createChronoMaskFilter`'s column count. Default 1. */
    columns?: number;
}

export const WiredChronoMaskFilter = ({ labels, mask, onChange, columns = 1 }: WiredChronoMaskFilterProps) => (
    <WiredCheckboxGroup
        columns={columns}
        options={labels.map((label, index) => ({ id: index, label, selected: isCheckboxMaskBitSet(mask, index) }))}
        onToggle={(id, selected) => onChange(setCheckboxMaskBit(mask, id, selected))}
    />
);

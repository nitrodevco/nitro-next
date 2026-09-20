/**
 * `uibuilder/presets/applications/ChronoRangeFilterPreset` - one field of a date or time
 * condition (`TimeMatches`, `DateMatches`): three radio options - ignore the field, match one
 * value, match a range - the second with a number input after it, the third with a
 * `from - to` pair of them.
 *
 * Controlled: `state` is a `ChronoRangeFilterState` in the form. `createForm` builds it with
 * `chronoRangeStateFromFilter(filter, defaultValue)` (Flash's `applyFilter`) and `readIntParams`
 * turns it back with `chronoRangeFilterFromState(name, state, defaultValue)` (`getFilter`); the
 * inputs a mode does not use keep their values meanwhile, as the Flash inputs did.
 */
import { CHRONO_RANGE_MODE_EXACT, CHRONO_RANGE_MODE_RANGE, CHRONO_RANGE_MODE_SKIP, ChronoRangeFilterState } from '#base/wired';

import { WiredNumberInput } from './WiredNumberInput';
import { WiredRadioGroup } from './WiredRadioGroup';
import { WiredSimpleList } from './WiredSimpleList';
import { WiredText } from './WiredText';

export interface WiredChronoRangeFilterProps {
    /** The three captions - skip, exact, range - literals or `${key}`. */
    skipLabel: string;
    exactLabel: string;
    rangeLabel: string;
    /** `NumberInputParam` of the three inputs: `min`, `max` and the field `width`. */
    min: number;
    max: number;
    width: number;
    state: ChronoRangeFilterState;
    onChange: (state: ChronoRangeFilterState) => void;
}

export const WiredChronoRangeFilter = ({ skipLabel, exactLabel, rangeLabel, min, max, width, state, onChange }: WiredChronoRangeFilterProps) => {
    const numberInput = (field: 'exact' | 'from' | 'to') => (
        <WiredNumberInput
            value={state[field]}
            onChange={value => onChange({ ...state, [field]: value })}
            min={min}
            max={max}
            width={width}
        />
    );

    return (
        <WiredRadioGroup
            selected={state.mode}
            onSelect={mode => onChange({ ...state, mode })}
            options={[
                { id: CHRONO_RANGE_MODE_SKIP, label: skipLabel },
                { id: CHRONO_RANGE_MODE_EXACT, label: exactLabel, extra: numberInput('exact') },
                {
                    id: CHRONO_RANGE_MODE_RANGE,
                    label: rangeLabel,
                    extra: (
                        <WiredSimpleList
                            vertical={false}
                            centerVertically={true}
                            staticWidth="content"
                        >
                            {numberInput('from')}
                            <WiredText
                                text="-"
                                mode="stretch"
                            />
                            {numberInput('to')}
                        </WiredSimpleList>
                    ),
                },
            ]}
        />
    );
};

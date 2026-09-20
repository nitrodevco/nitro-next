/**
 * `conditions/LevelMatches.buildInputs` - the `level_selection` slider (1 to 30, with its number
 * input), then the `comparison_selection` section.
 */
import { LEVEL_MATCHES_MAX, LEVEL_MATCHES_MIN, LevelMatchesConditionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';

export const LevelMatchesView: WiredElementView<LevelMatchesConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.level_selection"
            unitKey="level"
            converter={SLIDER_CONVERTER_ECHO}
            min={LEVEL_MATCHES_MIN}
            max={LEVEL_MATCHES_MAX}
            step={1}
            value={form.level}
            onChange={level => setForm({ level })}
        />
        <ConditionComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
    </>
);

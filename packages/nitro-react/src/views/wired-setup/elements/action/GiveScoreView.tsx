/**
 * `actiontypes/GiveScore.buildInputs` - the points slider (1 to 1000, with its number input),
 * the "times per game" slider (1 to 10, then unlimited; hidden on a box that was saved as
 * unlimited, the way `onEditStart` hides it) and the add / remove radio.
 */
import { createSliderConverterCountOrUnlimited, GIVE_SCORE_UNLIMITED_TIMES, GiveScoreActionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

/** `new SliderValueCountOrUnlimited(§_-V27§)`. */
const TIMES_CONVERTER = createSliderConverterCountOrUnlimited(GIVE_SCORE_UNLIMITED_TIMES);

/** `createSliderSection("wiredfurni.params.setpoints2", "", CONVERTER_ECHO, 1, 1000, 1)`. */
const MAX_POINTS = 1000;

export const GiveScoreView: WiredElementView<GiveScoreActionForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.setpoints2"
            unitKey=""
            converter={SLIDER_CONVERTER_ECHO}
            min={1}
            max={MAX_POINTS}
            step={1}
            value={form.points}
            onChange={points => setForm({ points })}
        />
        {form.timesVisible && (
            <WiredSliderSection
                titleKey="wiredfurni.params.settimesingame"
                unitKey="times"
                converter={TIMES_CONVERTER}
                min={1}
                max={GIVE_SCORE_UNLIMITED_TIMES}
                step={1}
                value={form.times}
                onChange={times => setForm({ times })}
                showInput={false}
            />
        )}
        <WiredSection title="${wiredfurni.params.points_operation}">
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.points_operation.0}' }, { id: 1, label: '${wiredfurni.params.points_operation.1}' } ]}
                selected={form.operation}
                onSelect={operation => setForm({ operation })}
            />
        </WiredSection>
    </>
);

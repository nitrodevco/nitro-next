/**
 * `triggerconfs/ScoreAchieved.buildInputs` - the team radio (any team on its own row, then the
 * four teams two to a row) and the score slider (1 to 1000) with its number input.
 */
import { SCORE_ACHIEVED_MAX_SCORE, SCORE_ACHIEVED_MIN_SCORE, ScoreAchievedTriggerForm, SLIDER_CONVERTER_ECHO, WIRED_TEAM_RADIO_COLUMNS, WIRED_TEAM_RADIO_OPTIONS, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const ScoreAchievedView: WiredElementView<ScoreAchievedTriggerForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.team}">
            <WiredRadioGroup
                options={[ ...WIRED_TEAM_RADIO_OPTIONS ]}
                columns={WIRED_TEAM_RADIO_COLUMNS}
                selected={form.team}
                onSelect={team => setForm({ team })}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.setscore2"
            unitKey="points"
            converter={SLIDER_CONVERTER_ECHO}
            min={SCORE_ACHIEVED_MIN_SCORE}
            max={SCORE_ACHIEVED_MAX_SCORE}
            step={1}
            value={form.score}
            onChange={score => setForm({ score })}
        />
    </>
);

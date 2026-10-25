/**
 * `triggerconfs/ScoreAchieved.buildInputs` - the team radio (any team on its own row, then the
 * four teams two to a row; `TeamSection`) and the score slider (1 to 1000) with its number input.
 */
import { SCORE_ACHIEVED_MAX_SCORE, SCORE_ACHIEVED_MIN_SCORE, ScoreAchievedTriggerForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { TeamSection } from '../shared/TeamSection';

export const ScoreAchievedView: WiredElementView<ScoreAchievedTriggerForm> = ({ form, setForm }) => (
    <>
        <TeamSection
            firstLabel="${wiredfurni.params.team.any}"
            selected={form.team}
            onSelect={team => setForm({ team })}
        />
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

/**
 * `conditions/TeamHasScore.buildInputs` - the `team` section (the triggering user's team, then the
 * four teams), the `comparison_selection` section and the `setscore2` slider (0 to 1000, with its
 * number input).
 */
import { SLIDER_CONVERTER_ECHO, TEAM_HAS_SCORE_MAX, TeamHasScoreConditionForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';
import { ConditionTeamSection } from './shared/ConditionTeamSection';

export const TeamHasScoreView: WiredElementView<TeamHasScoreConditionForm> = ({ form, setForm }) => (
    <>
        <ConditionTeamSection
            firstLabel="${wiredfurni.params.team.triggerer}"
            selected={form.team}
            onSelect={team => setForm({ team })}
        />
        <ConditionComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.setscore2"
            unitKey="points"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={TEAM_HAS_SCORE_MAX}
            step={1}
            value={form.score}
            onChange={score => setForm({ score })}
        />
    </>
);

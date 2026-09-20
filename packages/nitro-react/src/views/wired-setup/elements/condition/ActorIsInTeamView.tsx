/**
 * `conditions/ActorIsInTeam.buildInputs` - the `team` section: any team (`team.any`) on a row of
 * its own, then the four teams in two columns.
 */
import { ActorIsInTeamConditionForm, WiredElementView } from '#base/wired';

import { ConditionTeamSection } from './shared/ConditionTeamSection';

export const ActorIsInTeamView: WiredElementView<ActorIsInTeamConditionForm> = ({ form, setForm }) => (
    <ConditionTeamSection
        firstLabel="${wiredfurni.params.team.any}"
        selected={form.team}
        onSelect={team => setForm({ team })}
    />
);

/**
 * `selectors/UsersInTeam.buildInputs` - the team radio (any team on its own row, then the four
 * teams two to a row; `TeamSection`).
 */
import { UsersInTeamSelectorForm, WiredElementView } from '#base/wired';

import { TeamSection } from '../shared/TeamSection';

export const UsersInTeamView: WiredElementView<UsersInTeamSelectorForm> = ({ form, setForm }) => (
    <TeamSection
        firstLabel="${wiredfurni.params.team.any}"
        selected={form.team}
        onSelect={team => setForm({ team })}
    />
);

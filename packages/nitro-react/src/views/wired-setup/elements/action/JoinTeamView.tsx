/**
 * `actiontypes/JoinTeam.buildInputs` - the team radio (1 to 4, two columns) in the `team` section
 * and the team type radio (0 to 2) in the `choose_type` section.
 */
import { JoinTeamActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const TEAM_OPTIONS = [ 1, 2, 3, 4 ].map(id => ({ id, label: `\${wiredfurni.params.team.${id}}` }));
const TYPE_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.team_type.${id}}` }));

/** `createRadioGroup(..., null, 2)`. */
const TEAM_COLUMNS = 2;

export const JoinTeamView: WiredElementView<JoinTeamActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.team}">
            <WiredRadioGroup
                options={TEAM_OPTIONS}
                selected={form.team}
                onSelect={team => setForm({ team })}
                columns={TEAM_COLUMNS}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.choose_type}">
            <WiredRadioGroup
                options={TYPE_OPTIONS}
                selected={form.teamType}
                onSelect={teamType => setForm({ teamType })}
            />
        </WiredSection>
    </>
);

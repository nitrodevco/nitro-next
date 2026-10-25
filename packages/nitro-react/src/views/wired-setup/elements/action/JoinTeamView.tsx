/**
 * `actiontypes/JoinTeam.buildInputs` - the team radio (1 to 4, two columns) in the `team` section
 * (`TeamSection`) and the team type radio (0 to 2) in the `choose_type` section.
 */
import { JoinTeamActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { TeamSection } from '../shared/TeamSection';

const TYPE_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.team_type.${id}}` }));

export const JoinTeamView: WiredElementView<JoinTeamActionForm> = ({ form, setForm }) => (
    <>
        <TeamSection
            selected={form.team}
            onSelect={team => setForm({ team })}
        />
        <WiredSection title="${wiredfurni.params.choose_type}">
            <WiredRadioGroup
                options={TYPE_OPTIONS}
                selected={form.teamType}
                onSelect={teamType => setForm({ teamType })}
            />
        </WiredSection>
    </>
);

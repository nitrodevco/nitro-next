/**
 * `selectors/UsersInTeam.buildInputs` - the team radio (any team on its own row, then the four
 * teams two to a row).
 */
import { UsersInTeamSelectorForm, WIRED_TEAM_RADIO_COLUMNS, WIRED_TEAM_RADIO_OPTIONS, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const UsersInTeamView: WiredElementView<UsersInTeamSelectorForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.team}">
        <WiredRadioGroup
            options={[ ...WIRED_TEAM_RADIO_OPTIONS ]}
            columns={WIRED_TEAM_RADIO_COLUMNS}
            selected={form.team}
            onSelect={team => setForm({ team })}
        />
    </WiredSection>
);

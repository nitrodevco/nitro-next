/**
 * `conditions/TeamIsWinning.buildInputs` - the `team` section (the triggering user's team, then
 * the four teams) and the `placement_selection` section, `placement.1` to `.4` in four columns.
 */
import { TeamIsWinningConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { ConditionTeamSection } from './shared/ConditionTeamSection';

const PLACEMENTS = [ 0, 1, 2, 3 ];

export const TeamIsWinningView: WiredElementView<TeamIsWinningConditionForm> = ({ form, setForm }) => (
    <>
        <ConditionTeamSection
            firstLabel="${wiredfurni.params.team.triggerer}"
            selected={form.team}
            onSelect={team => setForm({ team })}
        />
        <WiredSection title="${wiredfurni.params.placement_selection}">
            <WiredRadioGroup
                options={PLACEMENTS.map(id => ({ id, label: `\${wiredfurni.params.placement.${id + 1}}` }))}
                selected={form.placement}
                onSelect={placement => setForm({ placement })}
                columns={4}
            />
        </WiredSection>
    </>
);

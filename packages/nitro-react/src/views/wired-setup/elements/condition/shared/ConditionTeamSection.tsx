/**
 * The `team` section of `ActorIsInTeam`, `TeamIsWinning` and `TeamHasScore`: a two-column radio
 * whose first option (id 0 - `team.any` or `team.triggerer`) takes a row of its own
 * (`RadioButtonParam(0, ..., null, null, true)`), then `team.1` to `team.4`.
 */
import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';

const TEAMS = [ 1, 2, 3, 4 ];

export interface ConditionTeamSectionProps {
    /** The caption of option 0, a `${key}`. */
    firstLabel: string;
    selected: number;
    onSelect: (team: number) => void;
}

export const ConditionTeamSection = ({ firstLabel, selected, onSelect }: ConditionTeamSectionProps) => (
    <WiredSection title="${wiredfurni.params.team}">
        <WiredRadioGroup
            options={[
                { id: 0, label: firstLabel, newLine: true },
                ...TEAMS.map(id => ({ id, label: `\${wiredfurni.params.team.${id}}` })),
            ]}
            selected={selected}
            onSelect={onSelect}
            columns={2}
        />
    </WiredSection>
);

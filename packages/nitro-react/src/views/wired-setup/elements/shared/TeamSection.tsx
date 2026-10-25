/**
 * The `team` section seven boxes build the same way in their `buildInputs`:
 * `createSection(l("team"), createRadioGroup([...], null, 2))` - `team.1` to `team.4`, two to a
 * row. `ActorIsInTeam`, `TeamIsWinning`, `TeamHasScore`, `selectors/UsersInTeam` and
 * `triggerconfs/ScoreAchieved` put an option 0 (`team.any` or `team.triggerer`) on a row of its own
 * before them (`RadioButtonParam(0, ..., null, null, true)`); `JoinTeam` and
 * `GIVE_SCORE_TO_PREDEFINED_TEAM` (`§_-H2N§`) offer the four teams only.
 */
import { WiredRadioGroup, WiredRadioOption } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** The radio's teams, `wiredfurni.params.team.<id>` each. */
const TEAM_OPTIONS: WiredRadioOption[] = [ 1, 2, 3, 4 ].map(id => ({ id, label: `\${wiredfurni.params.team.${id}}` }));

/** `createRadioGroup(..., null, 2)`. */
const TEAM_COLUMNS = 2;

export interface TeamSectionProps {
    /** The caption of option 0, a `${key}`; without one the radio offers the four teams only. */
    firstLabel?: string;
    selected: number;
    onSelect: (team: number) => void;
}

export const TeamSection = ({ firstLabel, selected, onSelect }: TeamSectionProps) => (
    <WiredSection title="${wiredfurni.params.team}">
        <WiredRadioGroup
            options={(firstLabel === undefined) ? TEAM_OPTIONS : [ { id: 0, label: firstLabel, newLine: true }, ...TEAM_OPTIONS ]}
            selected={selected}
            onSelect={onSelect}
            columns={TEAM_COLUMNS}
        />
    </WiredSection>
);

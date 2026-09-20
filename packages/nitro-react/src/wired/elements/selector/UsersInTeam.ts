/**
 * `selectors/UsersInTeam` (USERS_IN_TEAM) - selects the users in a game team, or in any team.
 *
 * Int params: `[ team ]` - 0 (any) to 4, the radio `ScoreAchieved` builds as well
 * (`WIRED_TEAM_RADIO_OPTIONS`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { SelectorCodes } from './selectorCodes';

export interface UsersInTeamSelectorForm {
    team: number;
}

export const usersInTeamSelector: WiredElementDefinition<UsersInTeamSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_IN_TEAM,
    createForm: triggerable => ({ team: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.team ],
};

/**
 * `actiontypes/§_-M2o§` (LEAVE_TEAM) - takes the selected users out of their game team (the
 * counterpart of `JoinTeam`). No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const leaveTeamAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.LEAVE_TEAM,
    createForm: () => ({}),
};

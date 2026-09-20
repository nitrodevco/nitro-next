/**
 * `actiontypes/ResetRewardTrack` (`RESET_REWARD_TRACK`) - resets a reward track for the selected
 * users.
 *
 * String param: the track id, at most 100 characters and no tab (`restrict "^\t"`). No int params.
 * Its input sources are always shown.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

/** `TextInputParam("", 100, null, -1, "^\t")`. */
export const RESET_REWARD_TRACK_ID_MAX_LENGTH = 100;
export const RESET_REWARD_TRACK_ID_RESTRICT = '^\t';

export interface ResetRewardTrackActionForm {
    trackId: string;
}

export const resetRewardTrackAction: WiredElementDefinition<ResetRewardTrackActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.RESET_REWARD_TRACK,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
    createForm: triggerable => ({ trackId: triggerable.stringParam }),
    readStringParam: form => form.trackId,
};

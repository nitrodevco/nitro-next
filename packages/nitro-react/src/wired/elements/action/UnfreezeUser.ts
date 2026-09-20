/**
 * `actiontypes/§_-1d§` (UNFREEZE_USER) - lets the selected users walk again after a freeze
 * (`FreezeUser`). No params and no inputs (`INPUTS_TYPE_NONE`); only the user selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const unfreezeUserAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.UNFREEZE_USER,
    createForm: () => ({}),
};

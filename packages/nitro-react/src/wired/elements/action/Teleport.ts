/**
 * `actiontypes/§_-919§` (TELEPORT, Flash `ActionTypeCodes.§_-313§`) - teleports the selected users
 * onto one of the picked furni.
 *
 * Int params: `[ option ]` - the one checkbox of `wiredfurni.params.teleport.options` (1 = on).
 * The reference server reads it as "stay if already there".
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

export interface TeleportActionForm {
    /** `wiredfurni.params.teleport.options.0`. */
    stayIfAlreadyThere: boolean;
}

export const teleportAction: WiredElementDefinition<TeleportActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.TELEPORT,
    createForm: triggerable => ({ stayIfAlreadyThere: getWiredBoolean(triggerable, 0) }),
    readIntParams: form => [ form.stayIfAlreadyThere ? 1 : 0 ],
};

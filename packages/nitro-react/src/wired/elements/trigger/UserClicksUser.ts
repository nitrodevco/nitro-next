/**
 * `triggerconfs/UserClicksUser` (USER_CLICKS_USER) - fires when a user clicks another user.
 *
 * Int params: one 0/1 flag per checkbox, `[ block menu open, do not rotate ]`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

/** The checkboxes' localization keys, in order. */
export const USER_CLICKS_USER_OPTIONS = [ 'wiredfurni.params.click_user.block_menu_open', 'wiredfurni.params.click_user.do_not_rotate' ];

export interface UserClicksUserTriggerForm {
    options: boolean[];
}

export const userClicksUserTrigger: WiredElementDefinition<UserClicksUserTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.USER_CLICKS_USER,
    createForm: triggerable => ({ options: USER_CLICKS_USER_OPTIONS.map((_, index) => getWiredBoolean(triggerable, index)) }),
    readIntParams: form => form.options.map(selected => (selected ? 1 : 0)),
};

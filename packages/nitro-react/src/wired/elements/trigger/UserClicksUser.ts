/**
 * `triggerconfs/UserClicksUser` (USER_CLICKS_USER) - fires when a user clicks another user.
 *
 * Int params: one 0/1 flag per checkbox, `[ block menu open, do not rotate ]`.
 */
import { flagsElement, type WiredElementDefinition, type WiredFlagsForm } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

/** The checkboxes' localization keys, in order. */
export const USER_CLICKS_USER_OPTIONS = [ 'wiredfurni.params.click_user.block_menu_open', 'wiredfurni.params.click_user.do_not_rotate' ];

/** One flag per `USER_CLICKS_USER_OPTIONS` entry. */
export type UserClicksUserTriggerForm = WiredFlagsForm;

export const userClicksUserTrigger: WiredElementDefinition<UserClicksUserTriggerForm> = flagsElement('trigger', TriggerConfCodes.USER_CLICKS_USER, USER_CLICKS_USER_OPTIONS);

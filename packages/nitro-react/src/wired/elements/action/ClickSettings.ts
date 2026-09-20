/**
 * `actiontypes/§_-P1o§` (CLICK_SETTINGS, Flash `ActionTypeCodes.§_-J4§`) - changes what a click on
 * a user or on a furni does in the room.
 *
 * Int params: `[ user option, furni option ]` - the ids of the two dropdowns,
 * `wiredfurni.params.click_settings.user.0` to `.2` and `...furni.0` to `.1`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The user dropdown's ids. */
export const CLICK_SETTINGS_USER_OPTIONS = [ 0, 1, 2 ];
/** The furni dropdown's ids. */
export const CLICK_SETTINGS_FURNI_OPTIONS = [ 0, 1 ];

export interface ClickSettingsActionForm {
    user: number;
    furni: number;
}

export const clickSettingsAction: WiredElementDefinition<ClickSettingsActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.CLICK_SETTINGS,
    createForm: triggerable => ({
        user: getWiredInt(triggerable, 0),
        furni: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.user, form.furni ],
};

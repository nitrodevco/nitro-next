/**
 * `triggerconfs/PerformAction` (AVATAR_PERFORMS_ACTION) - fires when a user performs the chosen
 * avatar action (`WiredUserAction`). `selectors/§_-O21§` (USERS_PERFORMING_ACTION) is the same
 * class body with another code; it uses this form, these functions and the same view.
 *
 * Int params: `[ action code ]` - Flash pushes `getSelectedAction()?.code`, so a box whose code is
 * not an action writes nothing a server reads as anything but 0.
 * String param: the extra of an action that has one - the sign or the dance - when its filter is
 * checked (`WiredUserAction.convertCodeToExtraString`), otherwise empty.
 */
import { getWiredUserActionByCode } from '../../common/WiredUserAction';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, WiredTriggerable } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

/** `PerformAction.SIGN_ACTION_CODE` / `DANCE_ACTION_CODE`. */
export const PERFORM_ACTION_SIGN_CODE = 10;
export const PERFORM_ACTION_DANCE_CODE = 11;

/** `buildSignOptions` - signs 0 to 17. */
export const PERFORM_ACTION_SIGN_IDS = Array.from({ length: 18 }, (_, index) => index);
/** `buildDanceOptions` - dances 1 to 4. */
export const PERFORM_ACTION_DANCE_IDS = [ 1, 2, 3, 4 ];

export interface PerformActionForm {
    /** `_actionDropdown.selectedId`. */
    action: number;
    /** `§_-S2l§.get(0).selected` / `_signDropdown.selectedId` (-1 none). */
    signFilter: boolean;
    sign: number;
    /** `§_-C2S§.get(0).selected` / `_danceDropdown.selectedId` (-1 none). */
    danceFilter: boolean;
    dance: number;
}

/**
 * `updateExtraSections(extra)` - the filter of the action now selected reset to `extra`: checked
 * with the extra's id when there is one, cleared otherwise. The other action's filter keeps what
 * it had, as the hidden Flash widgets do.
 */
export const applyPerformActionExtra = (form: PerformActionForm, extra: string = ''): PerformActionForm => {
    const action = getWiredUserActionByCode(form.action);

    if (!action || !action.hasExtra) return form;

    const id = (extra === '') ? -1 : (action.convertExtraStringToCode?.(extra) ?? -1);

    if (action.code === PERFORM_ACTION_SIGN_CODE) return { ...form, signFilter: extra !== '', sign: id };
    if (action.code === PERFORM_ACTION_DANCE_CODE) return { ...form, danceFilter: extra !== '', dance: id };

    return form;
};

/** `onEditStart`. */
export const createPerformActionForm = (triggerable: WiredTriggerable): PerformActionForm =>
    applyPerformActionExtra({ action: getWiredInt(triggerable, 0), signFilter: false, sign: -1, danceFilter: false, dance: -1 }, triggerable.stringParam);

/** `readIntParamsFromForm`. */
export const readPerformActionIntParams = (form: PerformActionForm): number[] => [ getWiredUserActionByCode(form.action)?.code ?? 0 ];

/** `readStringParamFromForm` (with `getSelectedExtraCode`). */
export const readPerformActionStringParam = (form: PerformActionForm): string => {
    const action = getWiredUserActionByCode(form.action);

    if (!action || !action.hasExtra) return '';

    let id = -1;

    if (action.code === PERFORM_ACTION_SIGN_CODE) id = form.signFilter ? form.sign : -1;
    else if (action.code === PERFORM_ACTION_DANCE_CODE) id = form.danceFilter ? form.dance : -1;

    return ((id !== -1) && action.convertCodeToExtraString) ? action.convertCodeToExtraString(id) : '';
};

export const performActionTrigger: WiredElementDefinition<PerformActionForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_PERFORMS_ACTION,
    createForm: createPerformActionForm,
    readIntParams: readPerformActionIntParams,
    readStringParam: readPerformActionStringParam,
};

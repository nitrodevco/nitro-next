/**
 * `conditions/§_-eU§` (PERFORMING_ACTION, `wf_cnd_user_performs_action`) - the user is doing an
 * avatar action (`WiredUserAction`); inverted (`NOT_PERFORMING_ACTION`,
 * `wf_cnd_not_user_performs_action`), is not.
 *
 * Int params: `[ action code ]`. String param: for the sign (10) and dance (11) actions, which one
 * when the box narrows it down (`sign_filter` / `dance_filter` checked) - the sign's number or
 * `dance <n>` (`WiredUserAction.convertCodeToExtraString`); otherwise empty. The sign section
 * (signs 0 to 17) only shows for the sign action, the dance section (dances 1 to 4) for dance.
 */
import { WIRED_DROPDOWN_NO_SELECTION } from '../../common/expandableDropdown';
import { getWiredUserActionByCode } from '../../common/WiredUserAction';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

/** `§_-eU§.SIGN_ACTION_CODE` / `DANCE_ACTION_CODE`. */
export const PERFORMING_ACTION_SIGN = 10;
export const PERFORMING_ACTION_DANCE = 11;
/** `buildSignOptions` (0 to 17) and `buildDanceOptions` (1 to 4). */
export const PERFORMING_ACTION_SIGN_IDS = Array.from({ length: 18 }, (_, index) => index);
export const PERFORMING_ACTION_DANCE_IDS = [ 1, 2, 3, 4 ];

export interface PerformingActionConditionForm {
    /** The action dropdown's `selectedId`. */
    action: number;
    signFilter: boolean;
    sign: number;
    danceFilter: boolean;
    dance: number;
}

/**
 * `updateExtraSections(extra)` - the section of the selected action takes the box's extra, or
 * starts unchecked with nothing selected; the other section keeps what it had (it is hidden).
 */
const applyExtra = (form: PerformingActionConditionForm, extra: string): PerformingActionConditionForm => {
    const action = getWiredUserActionByCode(form.action);

    if (!action?.hasExtra) return form;

    const code = (extra === '') ? WIRED_DROPDOWN_NO_SELECTION : (action.convertExtraStringToCode?.(extra) ?? WIRED_DROPDOWN_NO_SELECTION);

    if (action.code === PERFORMING_ACTION_SIGN) return { ...form, signFilter: (extra !== ''), sign: code };
    if (action.code === PERFORMING_ACTION_DANCE) return { ...form, danceFilter: (extra !== ''), dance: code };

    return form;
};

/** `onActionSelected` - another action picked in the dropdown resets its extra section. */
export const selectPerformingAction = (form: PerformingActionConditionForm, action: number): PerformingActionConditionForm =>
    applyExtra({ ...form, action }, '');

export const performingActionCondition: WiredElementDefinition<PerformingActionConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.PERFORMING_ACTION,
    negativeCode: ConditionCodes.NOT_PERFORMING_ACTION,
    createForm: triggerable => applyExtra({
        action: getWiredInt(triggerable, 0),
        signFilter: false,
        sign: WIRED_DROPDOWN_NO_SELECTION,
        danceFilter: false,
        dance: WIRED_DROPDOWN_NO_SELECTION,
    }, triggerable.stringParam),
    // `[ getSelectedAction()?.code ]` - Flash sends `undefined` for a code that is no action; 0 here.
    readIntParams: form => [ getWiredUserActionByCode(form.action)?.code ?? 0 ],
    readStringParam: (form) => {
        const action = getWiredUserActionByCode(form.action);

        if (!action?.hasExtra) return '';

        let code = WIRED_DROPDOWN_NO_SELECTION;

        if (action.code === PERFORMING_ACTION_SIGN) code = form.signFilter ? form.sign : WIRED_DROPDOWN_NO_SELECTION;
        else if (action.code === PERFORMING_ACTION_DANCE) code = form.danceFilter ? form.dance : WIRED_DROPDOWN_NO_SELECTION;

        if (code === WIRED_DROPDOWN_NO_SELECTION) return '';

        return action.convertCodeToExtraString?.(code) ?? '';
    },
};

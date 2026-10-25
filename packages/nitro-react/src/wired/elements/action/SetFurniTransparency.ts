/**
 * `actiontypes/§_-z1S§` (`SET_FURNI_TRANSPARENCY`, `wf_act_set_visibility`, WIN63-202610201032) -
 * WIRED Effect: Set Visibility. Makes furni or users visible or invisible, for the selected users
 * or for everyone (users who enter later included), optionally letting clicks pass through them,
 * with an easing for the fade.
 *
 * Int params: `[ audience is everyone, transparency (0 visible / 100 invisible), allow click
 * through, easing (0-4), target is users ]`; the last is merged section 0's type. A transparency
 * other than 100 opens as visible.
 *
 * Sections: merged 0 is the target (furni selection 0 or user selection 1), merged 1 the
 * audience (user selection 0 only, no type picker), disabled while the audience is everyone.
 * The advanced settings are always shown and the "pick furni" instructions never.
 *
 * Switching the audience to everyone shows the "keep this effect visible after reloads" alert
 * once per element (`§_-H1r§`, set too by opening a box already set to everyone) - the
 * element's memory here.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, WIRED_SOURCE_USER } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `AUDIENCE_SELECTED_USERS` / `AUDIENCE_EVERYONE` - the audience dropdown's ids. */
export const SET_FURNI_TRANSPARENCY_AUDIENCE_SELECTED_USERS = 0;
export const SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE = 1;
/** The visibility radio's ids: the transparency sent. */
export const SET_FURNI_TRANSPARENCY_VISIBLE = 0;
export const SET_FURNI_TRANSPARENCY_INVISIBLE = 100;
/** `FurniTransparencyEasingMode` - the easing dropdown's ids (`...easing.0` to `.4`). */
export const SET_FURNI_TRANSPARENCY_EASINGS = [ 0, 1, 2, 3, 4 ];
/** The merged sections. */
export const SET_FURNI_TRANSPARENCY_MERGED_TARGET = 0;
export const SET_FURNI_TRANSPARENCY_MERGED_AUDIENCE = 1;

export interface SetFurniTransparencyActionForm {
    audience: number;
    transparency: number;
    allowClickThrough: boolean;
    easing: number;
    /** `_targetUsers` - merged section 0 is set to users. */
    targetUsers: boolean;
    /** `§_-H1r§` - the everyone alert was shown (or the box opened as everyone). */
    everyoneInfoShown: boolean;
}

export const setFurniTransparencyAction: WiredElementDefinition<SetFurniTransparencyActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.SET_FURNI_TRANSPARENCY,
    forceHidePickFurniInstructions: true,
    advancedAlwaysVisible: true,
    createForm: (triggerable, ctx) => {
        const everyone = getWiredBoolean(triggerable, 0);

        return {
            audience: everyone ? SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE : SET_FURNI_TRANSPARENCY_AUDIENCE_SELECTED_USERS,
            transparency: (getWiredInt(triggerable, 1) === SET_FURNI_TRANSPARENCY_INVISIBLE) ? SET_FURNI_TRANSPARENCY_INVISIBLE : SET_FURNI_TRANSPARENCY_VISIBLE,
            allowClickThrough: getWiredBoolean(triggerable, 2),
            easing: getWiredInt(triggerable, 3),
            targetUsers: getWiredBoolean(triggerable, 4),
            everyoneInfoShown: everyone || (ctx.elementMemory('action', ActionTypeCodes.SET_FURNI_TRANSPARENCY).everyoneInfoShown === true),
        };
    },
    readIntParams: form => [
        (form.audience === SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE) ? 1 : 0,
        form.transparency,
        form.allowClickThrough ? 1 : 0,
        form.easing,
        form.targetUsers ? 1 : 0,
    ],
    rememberOnEdit: form => ({ everyoneInfoShown: form.everyoneInfoShown }),
    mergedSelections: [ [ 0, 1 ], [ -1, 0 ] ],
    getMergedType: (form, id) => (((id === SET_FURNI_TRANSPARENCY_MERGED_AUDIENCE) || form.targetUsers) ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI),
    setMergedType: (form, id, sourceType) => ((id === SET_FURNI_TRANSPARENCY_MERGED_TARGET) ? { ...form, targetUsers: sourceType === WIRED_SOURCE_USER } : form),
    hasCustomTypePicker: id => (id === SET_FURNI_TRANSPARENCY_MERGED_AUDIENCE),
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_MERGED) && (id === SET_FURNI_TRANSPARENCY_MERGED_AUDIENCE) && (form.audience === SET_FURNI_TRANSPARENCY_AUDIENCE_EVERYONE),
    mergedSelectionTitle: id => ((id === SET_FURNI_TRANSPARENCY_MERGED_TARGET) ? 'wiredfurni.params.sources.merged.title.target' : 'wiredfurni.params.visualization.visibility_audience'),
};

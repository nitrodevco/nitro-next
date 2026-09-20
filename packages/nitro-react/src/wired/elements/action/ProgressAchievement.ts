/**
 * `actiontypes/ProgressAchievement` (`PROGRESS_ACHIEVEMENT`) - progresses one of the room's
 * achievements for the selected users, by a number or by a variable's value.
 *
 * Flash gives this element no `code` (`DefaultElement`'s -1) and answers to
 * `PROGRESS_ACHIEVEMENT` as its `negativeCode`; the registry finds it the same way.
 *
 * String param: the achievement's name, one of `WiredEnvironment.achievements`. Int params:
 * `[ mode, option, value, target ]` - the mode (1 or 0, `progress_achievement.mode.<n>`), then the
 * value-or-variable section: 0 uses `value`, 1 a variable of the merged source `target`
 * (furni, users, global or context). Variable ids: `[ that variable ]`.
 *
 * The achievement dropdown lists the achievements of the room as `WiredEnvironment` sent them
 * (the view reads them from the store); Flash's `achievementName` is the name of the selected
 * option, so the form keeps the name. A name that is not in the list shows no selection - Flash
 * would then save no name; here the box keeps the one it had until another is picked.
 */
import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES } from './ActionVariableReference';

/** `createValueOrVariableSection(0, ..., 0, 2147483647)`. */
export const PROGRESS_ACHIEVEMENT_SCORE_MAX = 2147483647;

export interface ProgressAchievementActionForm {
    achievementName: string;
    /** The mode radio: 1 or 0. */
    mode: number;
    score: WiredValueOrVariableState;
}

export const progressAchievementAction: WiredElementDefinition<ProgressAchievementActionForm> = {
    holder: 'action',
    code: -1,
    negativeCode: ActionTypeCodes.PROGRESS_ACHIEVEMENT,
    forceHidePickFurniInstructions: true,
    createForm: (triggerable, ctx) => ({
        achievementName: ctx.achievementsInRoom.includes(triggerable.stringParam) ? triggerable.stringParam : '',
        mode: getWiredInt(triggerable, 0),
        score: createValueOrVariableState(
            getWiredRoomVariables(triggerable),
            triggerable.variableIds[0] ?? '',
            resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 3)),
            getWiredInt(triggerable, 1),
            getWiredInt(triggerable, 2),
        ),
    }),
    readIntParams: form => [ form.mode, form.score.option, form.score.value, form.score.picker.target ],
    readStringParam: form => form.achievementName,
    readVariableIds: form => [ form.score.picker.variableId ],
    mergedSelections: [ [ 0, 1 ] ],
    getMergedType: form => form.score.picker.target,
    setMergedType: (form, _id, sourceType) => ({ ...form, score: { ...form.score, picker: setPickerTarget(form.score.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    isInputSourceDisabled: (form, _id, sourceType) => ((sourceType === WIRED_SOURCE_MERGED) && isValueOrVariableSourcePickingDisabled(form.score)),
    hasCustomTypePicker: () => true,
};

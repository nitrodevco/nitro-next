/**
 * `actiontypes/ProgressRewardTrack` (`PROGRESS_REWARD_TRACK`) - progresses a task of a reward track
 * for the selected users, by a number or by a variable's value.
 *
 * String param: `<track id>\t<task id>` (each at most 100 of `a-zA-Z0-9_`). Int params:
 * `[ add to existing score, option, value, target ]` - the flag, then the value-or-variable
 * section: 0 uses `value` (1 or more), 1 a variable of the merged source `target`. Variable ids:
 * `[ that variable ]`. A box saved with a value opens with no variable (Flash passes
 * `WiredVariable.§_-i8§`, an id no variable has, to the picker). Its input sources are always shown.
 */
import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables, getWiredString } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from './ActionVariableReference';

/** `TextInputParam("", 100, null, -1, "a-zA-Z0-9_")` - the track and task id fields. */
export const REWARD_TRACK_ID_MAX_LENGTH = 100;
export const REWARD_TRACK_ID_RESTRICT = 'a-zA-Z0-9_';
/** `createValueOrVariableSection(0, ..., 1, 2147483647)`. */
export const PROGRESS_REWARD_TRACK_SCORE_MIN = 1;
export const PROGRESS_REWARD_TRACK_SCORE_MAX = 2147483647;

export interface ProgressRewardTrackActionForm {
    trackId: string;
    taskId: string;
    addToExistingScore: boolean;
    score: WiredValueOrVariableState;
}

export const progressRewardTrackAction: WiredElementDefinition<ProgressRewardTrackActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.PROGRESS_REWARD_TRACK,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
    createForm: (triggerable, ctx) => {
        const option = getWiredInt(triggerable, 1);

        return {
            trackId: getWiredString(triggerable, 0),
            taskId: getWiredString(triggerable, 1),
            addToExistingScore: getWiredBoolean(triggerable, 0),
            score: createValueOrVariableState(
                getWiredRoomVariables(triggerable),
                (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[0] ?? ''),
                resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 3)),
                option,
                getWiredInt(triggerable, 2),
            ),
        };
    },
    readIntParams: form => [ form.addToExistingScore ? 1 : 0, form.score.option, form.score.value, form.score.picker.target ],
    readStringParam: form => `${form.trackId}\t${form.taskId}`,
    readVariableIds: form => [ form.score.picker.variableId ],
    mergedSelections: [ [ 0, 1 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    getMergedType: form => form.score.picker.target,
    setMergedType: (form, _id, sourceType) => ({ ...form, score: { ...form.score, picker: setPickerTarget(form.score.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    isInputSourceDisabled: (form, _id, sourceType) => ((sourceType === WIRED_SOURCE_MERGED) && isValueOrVariableSourcePickingDisabled(form.score)),
    hasCustomTypePicker: () => true,
};

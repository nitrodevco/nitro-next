/**
 * `variables/§_-34§` (code `DAILY_TASK_VARIABLE`) - creates a user variable tied to a daily task,
 * named in the box.
 *
 * String param: `<variable name>\t<daily task name>` (`STRING_PARAM_SPLITTER`); the task name is at
 * most 100 characters, with the placeholder `1234..` (`TextInputParam("", 100, "1234..")`). No int
 * params.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, splitVariableStringParam, VARIABLE_STRING_PARAM_SPLITTER, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** `TextInputParam("", 100, "1234..")`. */
export const DAILY_TASK_NAME_MAX_CHARACTERS = 100;
export const DAILY_TASK_NAME_PLACEHOLDER = '1234..';

export interface DailyTaskVariableForm extends WiredVariableElementForm {
    taskName: string;
}

export const dailyTaskVariable: WiredVariableElementDefinition<DailyTaskVariableForm> = {
    holder: 'variable',
    code: VariableCodes.DAILY_TASK_VARIABLE,
    createForm: (triggerable) => {
        const [ name, taskName ] = splitVariableStringParam(triggerable.stringParam);

        return { ...createVariableElementForm(name), taskName };
    },
    readStringParam: form => readVariableName(form) + VARIABLE_STRING_PARAM_SPLITTER + form.taskName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.User,
};

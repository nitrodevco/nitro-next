/**
 * `variables/§_-Q22§` (code `QUEST_VARIABLE`) - creates a user variable tied to a quest, named in
 * the box.
 *
 * String param: `<variable name>\t<quest name>` (`STRING_PARAM_SPLITTER`); the quest name is at
 * most 500 characters (`TextInputParam("", 500)`). No int params.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, splitVariableStringParam, VARIABLE_STRING_PARAM_SPLITTER, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** `TextInputParam("", 500)`. */
export const QUEST_NAME_MAX_CHARACTERS = 500;

export interface QuestVariableForm extends WiredVariableElementForm {
    questName: string;
}

export const questVariable: WiredVariableElementDefinition<QuestVariableForm> = {
    holder: 'variable',
    code: VariableCodes.QUEST_VARIABLE,
    createForm: (triggerable) => {
        const [ name, questName ] = splitVariableStringParam(triggerable.stringParam);

        return { ...createVariableElementForm(name), questName };
    },
    readStringParam: form => readVariableName(form) + VARIABLE_STRING_PARAM_SPLITTER + form.questName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.User,
};

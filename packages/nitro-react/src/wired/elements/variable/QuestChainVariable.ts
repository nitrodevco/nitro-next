/**
 * `variables/§_-m1q§` (code `QUEST_CHAIN_VARIABLE`) - creates a user variable tied to a quest
 * chain, named in the box.
 *
 * String param: `<variable name>\t<quest chain name>` (`STRING_PARAM_SPLITTER`); the chain name is
 * at most 500 characters (`TextInputParam("", 500)`). No int params.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, splitVariableStringParam, VARIABLE_STRING_PARAM_SPLITTER, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** `TextInputParam("", 500)`. */
export const QUEST_CHAIN_NAME_MAX_CHARACTERS = 500;

export interface QuestChainVariableForm extends WiredVariableElementForm {
    questChainName: string;
}

export const questChainVariable: WiredVariableElementDefinition<QuestChainVariableForm> = {
    holder: 'variable',
    code: VariableCodes.QUEST_CHAIN_VARIABLE,
    createForm: (triggerable) => {
        const [ name, questChainName ] = splitVariableStringParam(triggerable.stringParam);

        return { ...createVariableElementForm(name), questChainName };
    },
    readStringParam: form => readVariableName(form) + VARIABLE_STRING_PARAM_SPLITTER + form.questChainName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.User,
};

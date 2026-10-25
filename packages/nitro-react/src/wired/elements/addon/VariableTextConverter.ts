/**
 * `addons/§_-D1f§` (VARIABLE_TEXT_CONVERTER, `wf_xtra_var_text_connector`) - gives a variable a
 * text for each of its values (`variables.connect_text`), typed one mapping per line.
 *
 * String param: the text. No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

/** `TextAreaParam(100, -1, 30, -1, 1000, ...)`: the field's height, line limit and length limit. */
export const VARIABLE_TEXT_CONVERTER_HEIGHT = 100;
export const VARIABLE_TEXT_CONVERTER_MAX_LINES = 30;
export const VARIABLE_TEXT_CONVERTER_MAX_LENGTH = 1000;

export interface VariableTextConverterAddonForm {
    text: string;
}

export const variableTextConverterAddon: WiredElementDefinition<VariableTextConverterAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_TEXT_CONVERTER,
    createForm: triggerable => ({ text: triggerable.stringParam }),
    readStringParam: form => form.text,
};

/**
 * `selectors/UsersByName` (USERS_BY_NAME) - selects the users with the given names.
 *
 * String param: the names, tab separated. The text area shows one per line: `onEditStart`
 * turns tabs into line breaks and `readStringParamFromForm` every kind of line break back into tabs.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

/** `TextAreaParam(140, -1, 20, -1, 1000)` - height, width, lines, -, characters. */
export const USERS_BY_NAME_HEIGHT = 140;
export const USERS_BY_NAME_MAX_LINES = 20;
export const USERS_BY_NAME_MAX_CHARACTERS = 1000;

export interface UsersByNameSelectorForm {
    /** One name per line, `\n` separated (the kit's text area line break; Flash's is `\r`). */
    names: string;
}

export const usersByNameSelector: WiredElementDefinition<UsersByNameSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_BY_NAME,
    createForm: triggerable => ({ names: triggerable.stringParam.replace(/\t/g, '\n') }),
    readStringParam: form => form.names.replace(/\n\r/g, '\t').replace(/\r/g, '\t').replace(/\n/g, '\t'),
};

/**
 * `addons/§_-gh§` (USERNAME_PLACEHOLDER, `wf_xtra_text_output_username`) - a `$(name)` placeholder
 * the stack's texts can use, replaced by the selected users' names: one of them, or all of them
 * joined by a delimiter.
 *
 * String param: the name, then `\t` and the delimiter when it shows them all. Int params:
 * `[ show all ]`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';
import { readWiredPlaceholderAddonFields, type WiredPlaceholderAddonFields, writeWiredPlaceholderAddonString } from './addonShared';

export type UsernamePlaceholderAddonForm = WiredPlaceholderAddonFields;

export const usernamePlaceholderAddon: WiredElementDefinition<UsernamePlaceholderAddonForm> = {
    holder: 'addon',
    code: AddonCodes.USERNAME_PLACEHOLDER,
    createForm: readWiredPlaceholderAddonFields,
    readIntParams: form => [ form.showMultiple ? 1 : 0 ],
    readStringParam: writeWiredPlaceholderAddonString,
};

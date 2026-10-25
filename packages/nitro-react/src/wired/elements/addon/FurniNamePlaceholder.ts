/**
 * `addons/§_-I1D§` (FURNI_NAME_PLACEHOLDER, `wf_xtra_text_output_furni_name`) - a `$(name)`
 * placeholder the stack's texts can use, replaced by the selected furni's names: one of them, or
 * all of them joined by a delimiter.
 *
 * String param: the name, then `\t` and the delimiter when it shows them all. Int params:
 * `[ show all ]`. The pick instructions are hidden and the advanced settings always open.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';
import { readWiredPlaceholderAddonFields, type WiredPlaceholderAddonFields, writeWiredPlaceholderAddonString } from './addonShared';

export type FurniNamePlaceholderAddonForm = WiredPlaceholderAddonFields;

export const furniNamePlaceholderAddon: WiredElementDefinition<FurniNamePlaceholderAddonForm> = {
    holder: 'addon',
    code: AddonCodes.FURNI_NAME_PLACEHOLDER,
    createForm: readWiredPlaceholderAddonFields,
    readIntParams: form => [ form.showMultiple ? 1 : 0 ],
    readStringParam: writeWiredPlaceholderAddonString,
    forceHidePickFurniInstructions: true,
    advancedAlwaysVisible: true,
};

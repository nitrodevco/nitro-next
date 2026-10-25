/**
 * The variable add-on sharing boxes (WIN63-202610201032) - `addons/VariableAddonShareAddon`
 * (VARIABLE_ADDON_SHARE, `wf_xtra_var_share`) on a permanently shared variable shares the add-ons
 * of the picked categories with the other rooms; `addons/VariableAddonImportAddon`
 * (VARIABLE_ADDON_IMPORT, `wf_xtra_var_import`) on a "From Another Room" variable imports them
 * (`variables.addon_share.usage_info` / `addon_import.usage_info`).
 *
 * Both extend `§_-226§`: a usage note and the "Categories" checkboxes - text connectors,
 * subvariable creators, variable FX. Int params: `[ text connectors, subvariable creators,
 * variable fx ]`, 1 for ticked. The share box adds a "Synchronize" button
 * (`SynchronizeSharedAddonsComposer(getCurrentWiredId())`), disabled without wired write permission.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';

/** `§_-226§._categories` - the checkboxes' captions, in id order. */
export const VARIABLE_ADDON_SHARING_CATEGORIES: readonly string[] = [
    '${wiredfurni.params.variables.addon_sharing.text_connectors}',
    '${wiredfurni.params.variables.addon_sharing.subvariable_creators}',
    '${wiredfurni.params.variables.addon_sharing.variable_fx}',
];

export interface VariableAddonSharingForm {
    /** One flag per `VARIABLE_ADDON_SHARING_CATEGORIES` entry. */
    categories: boolean[];
}

/** `§_-226§.onEditStart` / `readIntParamsFromForm`. */
const variableAddonSharing = (code: number): WiredElementDefinition<VariableAddonSharingForm> => ({
    holder: 'addon',
    code,
    createForm: triggerable => ({ categories: VARIABLE_ADDON_SHARING_CATEGORIES.map((_, index) => getWiredInt(triggerable, index) !== 0) }),
    readIntParams: form => form.categories.map(selected => (selected ? 1 : 0)),
});

export const variableAddonShareAddon = variableAddonSharing(AddonCodes.VARIABLE_ADDON_SHARE);
export const variableAddonImportAddon = variableAddonSharing(AddonCodes.VARIABLE_ADDON_IMPORT);

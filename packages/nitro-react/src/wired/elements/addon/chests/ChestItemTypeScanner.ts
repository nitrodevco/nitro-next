/**
 * `addons/chests/ChestItemTypeScanner` (CHEST_ITEM_TYPE_SCANNER) - counts the items of the types
 * picked (furni source 0) in the chests picked (furni source 1) into a context variable, in one
 * of two scanning modes (`chest_item_type_scanner.0` / `.1`).
 *
 * Int params: `[ scanning mode ]`. Variable ids: `[ the context variable ]`. The picker is always
 * on context variables and has no source type selector.
 */
import { type IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, type WiredVariablePickerState } from '../../../common/WiredVariablePickerModel';
import type { WiredElementDefinition } from '../../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../../WiredTriggerable';
import { AddonCodes } from '../addonCodes';

/** `ChestItemTypeScanner.variableSelectionFilter` - a variable that can be created, deleted and written. */
export const chestItemTypeScannerFilter = (variable: IWiredVariable): boolean =>
    variable.hasValue && variable.canCreateAndDelete && variable.canWriteValue;

export interface ChestItemTypeScannerAddonForm {
    picker: WiredVariablePickerState;
    mode: number;
}

export const chestItemTypeScannerAddon: WiredElementDefinition<ChestItemTypeScannerAddonForm> = {
    holder: 'addon',
    code: AddonCodes.CHEST_ITEM_TYPE_SCANNER,
    createForm: triggerable => ({
        picker: createVariablePickerState(getWiredRoomVariables(triggerable), triggerable.variableIds[0] ?? '', Number(VariableExtraSourceTypes.CONTEXT_SOURCE)),
        mode: getWiredInt(triggerable, 0),
    }),
    readIntParams: form => [ form.mode ],
    readVariableIds: form => [ form.picker.variableId ],
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.item_types' : 'wiredfurni.params.sources.furni.title.chests'),
    forceHidePickFurniInstructions: true,
    advancedAlwaysVisible: true,
};

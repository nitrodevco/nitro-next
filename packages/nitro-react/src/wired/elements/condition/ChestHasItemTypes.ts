/**
 * `conditions/chests/§_-229§` (CHEST_HAS_ITEM_TYPES) - `ChestHasAmount` for the number of items of
 * the picked types: the furni selection 0 is the item types (`sources.furni.title.item_types`),
 * the others the chests, and the merged section pairs the furni selection 2 with the user
 * selection 0. Params as `ChestHasAmount`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { chestHasAmountCondition, ChestHasAmountConditionForm } from './ChestHasAmount';
import { ConditionCodes } from './conditionCodes';

export const chestHasItemTypesCondition: WiredElementDefinition<ChestHasAmountConditionForm> = {
    ...chestHasAmountCondition,
    code: ConditionCodes.CHEST_HAS_ITEM_TYPES,
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.item_types' : 'wiredfurni.params.sources.furni.title.chests'),
    mergedSelections: [ [ 2, 0 ] ],
};

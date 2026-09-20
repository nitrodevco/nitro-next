/**
 * `actiontypes/chests/GiveItemsFromChest` (GIVE_FURNI_FROM_CHEST) - hands the furni a wired
 * chest holds to the selected users (`§_-f1U§`, `GiveFromChest`).
 *
 * Int params: `GiveFromChest`'s five, then the iteration mode - the order the chest's items are
 * handed out in, `wiredfurni.params.chest_iteration_type.0` to `.2`, which does not apply (and
 * greys out) while everything is given.
 */
import type { WiredElementDefinition } from '../../../WiredElement';
import { getWiredInt } from '../../../WiredTriggerable';
import { ActionTypeCodes } from '../actionCodes';
import { createGiveFromChestForm, giveFromChestBase, type GiveFromChestForm, readGiveFromChestIntParams } from './GiveFromChest';

/** The iteration radio's ids. */
export const CHEST_ITERATION_TYPES = [ 0, 1, 2 ];

export interface GiveItemsFromChestActionForm extends GiveFromChestForm {
    iterationMode: number;
}

export const giveItemsFromChestAction: WiredElementDefinition<GiveItemsFromChestActionForm> = {
    ...giveFromChestBase<GiveItemsFromChestActionForm>(),
    code: ActionTypeCodes.GIVE_FURNI_FROM_CHEST,
    createForm: triggerable => ({
        ...createGiveFromChestForm(triggerable),
        iterationMode: getWiredInt(triggerable, 5),
    }),
    readIntParams: form => [ ...readGiveFromChestIntParams(form), form.iterationMode ],
};

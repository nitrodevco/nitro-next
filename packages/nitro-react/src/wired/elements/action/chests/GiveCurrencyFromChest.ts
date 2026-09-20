/**
 * `actiontypes/chests/§_-9e§` (GIVE_CURRENCY_FROM_CHEST) - hands the currency a wired chest holds
 * to the selected users (`§_-f1U§`, `GiveFromChest`).
 *
 * Int params: `GiveFromChest`'s five, then the earnings category the payout is booked under -
 * one of `CHEST_EARNINGS_CATEGORIES` (`wiredfurni.params.earnings_category.<id>`).
 */
import type { WiredElementDefinition } from '../../../WiredElement';
import { getWiredInt } from '../../../WiredTriggerable';
import { ActionTypeCodes } from '../actionCodes';
import { createGiveFromChestForm, giveFromChestBase, type GiveFromChestForm, readGiveFromChestIntParams } from './GiveFromChest';

/** The earnings category dropdown's ids. */
export const CHEST_EARNINGS_CATEGORIES = [ 11, 13 ];

export interface GiveCurrencyFromChestActionForm extends GiveFromChestForm {
    earningsCategory: number;
}

export const giveCurrencyFromChestAction: WiredElementDefinition<GiveCurrencyFromChestActionForm> = {
    ...giveFromChestBase<GiveCurrencyFromChestActionForm>(),
    code: ActionTypeCodes.GIVE_CURRENCY_FROM_CHEST,
    createForm: triggerable => ({
        ...createGiveFromChestForm(triggerable),
        earningsCategory: getWiredInt(triggerable, 5),
    }),
    readIntParams: form => [ ...readGiveFromChestIntParams(form), form.earningsCategory ],
};

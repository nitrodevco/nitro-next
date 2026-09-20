/**
 * `addons/CarryUsers` (`wf_xtra_mov_carry_users`) - whether the furni the stack moves carry the
 * users standing on them, in one of two carry modes (`carry_mode.0` / `.1`).
 *
 * Int params: `[ carry mode ]`. The user source is titled `...users.title.carry`, and the advanced
 * settings are always open.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';

export interface CarryUsersAddonForm {
    mode: number;
}

export const carryUsersAddon: WiredElementDefinition<CarryUsersAddonForm> = {
    holder: 'addon',
    code: AddonCodes.CARRY_USERS,
    createForm: triggerable => ({ mode: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.mode ],
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.carry',
    advancedAlwaysVisible: true,
};

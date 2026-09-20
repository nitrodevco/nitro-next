/**
 * `addons/MovePhysics` (MOVE_PHYSICS, `wf_xtra_mov_physics`) - how the stack's movements treat
 * what is in the way: keep the altitude, move through furni, move through users, be blocked by
 * furni.
 *
 * Int params: `[ keep altitude, through furni, through users, blocked by furni ]`, each 0 or 1.
 * The input sources are titled `...title.physics.<id>`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';

/** The checkboxes' ids, `movephysics.<key>` captions in this order. */
export const MOVE_PHYSICS_OPTIONS = [ 'keep_altitude', 'move_through_furni', 'move_through_users', 'block_by_furni' ];

export interface MovePhysicsAddonForm {
    /** One flag per `MOVE_PHYSICS_OPTIONS` entry. */
    options: boolean[];
}

export const movePhysicsAddon: WiredElementDefinition<MovePhysicsAddonForm> = {
    holder: 'addon',
    code: AddonCodes.MOVE_PHYSICS,
    createForm: triggerable => ({ options: MOVE_PHYSICS_OPTIONS.map((_, index) => getWiredBoolean(triggerable, index)) }),
    readIntParams: form => form.options.map(selected => (selected ? 1 : 0)),
    furniSelectionTitle: id => `wiredfurni.params.sources.furni.title.physics.${id}`,
    userSelectionTitle: id => `wiredfurni.params.sources.users.title.physics.${id}`,
};

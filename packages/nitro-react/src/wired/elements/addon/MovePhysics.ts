/**
 * `addons/MovePhysics` (MOVE_PHYSICS, `wf_xtra_mov_physics`) - how the stack's movements treat
 * what is in the way: keep the altitude, move through furni, move through users, be blocked by
 * furni.
 *
 * Int params: `[ keep altitude, through furni, through users, blocked by furni ]`, each 0 or 1.
 * The input sources are titled `...title.physics.<id>`.
 */
import { flagsElement, type WiredElementDefinition, type WiredFlagsForm } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

/** The checkboxes' ids, `movephysics.<key>` captions in this order. */
export const MOVE_PHYSICS_OPTIONS = [ 'keep_altitude', 'move_through_furni', 'move_through_users', 'block_by_furni' ];

/** One flag per `MOVE_PHYSICS_OPTIONS` entry. */
export type MovePhysicsAddonForm = WiredFlagsForm;

export const movePhysicsAddon: WiredElementDefinition<MovePhysicsAddonForm> = {
    ...flagsElement('addon', AddonCodes.MOVE_PHYSICS, MOVE_PHYSICS_OPTIONS),
    furniSelectionTitle: id => `wiredfurni.params.sources.furni.title.physics.${id}`,
    userSelectionTitle: id => `wiredfurni.params.sources.users.title.physics.${id}`,
};

/**
 * `triggerconfs/RoomInitialized` (INITIALIZATION, `wf_trg_room_initializes`) - fires once when the
 * room initializes, before any other trigger. No params; its only input is the usage info, in a
 * dialog 1.5 times as wide.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const roomInitializedTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.INITIALIZATION,
    widthModifier: 1.5,
    createForm: () => ({}),
};

/**
 * `actiontypes/TeleportToRoom` (`TELEPORT_TO_ROOM`) - sends the selected users to another room.
 * Flash gives it nothing but its code (`INPUTS_TYPE_NONE`): no params, no view.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const teleportToRoomAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.TELEPORT_TO_ROOM,
    createForm: () => ({}),
};

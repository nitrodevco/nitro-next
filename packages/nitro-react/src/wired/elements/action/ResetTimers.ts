/**
 * `actiontypes/§_-817§` (RESET) - resets the room's wired timers. No params and no inputs
 * (`INPUTS_TYPE_NONE`); Flash widens its dialog by 6% (`widthModifier`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const resetTimersAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.RESET,
    createForm: () => ({}),
    widthModifier: 1.06,
};

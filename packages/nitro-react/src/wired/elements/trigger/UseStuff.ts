/**
 * `triggerconfs/§_-O16§` (USE_STUFF) - fires when one of the picked furni changes state (is used). No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const useStuffTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.USE_STUFF,
    createForm: () => ({}),
};

/**
 * `selectors/§_-V1r§` (FURNI_FROM_SIGNAL) - selects the furni a received signal carried. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

export const furniFromSignalSelector: WiredElementDefinition<Record<string, never>> = {
    holder: 'selector',
    code: SelectorCodes.FURNI_FROM_SIGNAL,
    createForm: () => ({}),
};

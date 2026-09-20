/**
 * `selectors/§_-Yu§` (SELECTED_FURNIS) - selects the picked furni. No params and no inputs
 * (`INPUTS_TYPE_NONE`); it forces furni picking whatever its input sources allow.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

export const selectedFurnisSelector: WiredElementDefinition<Record<string, never>> = {
    holder: 'selector',
    code: SelectorCodes.SELECTED_FURNIS,
    createForm: () => ({}),
    forceFurniSelection: () => true,
};

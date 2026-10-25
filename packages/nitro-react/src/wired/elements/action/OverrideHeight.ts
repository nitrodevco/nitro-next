/**
 * `actiontypes/§_-lX§` (OVERRIDE_HEIGHT) - overrides the stacking height of the picked furni.
 *
 * Int params: `[ height, type ]` - the height 0 to 8000 (slider and input), and the type:
 * 0 sets that height, 1 (`wiredfurni.params.override_height.type.1`) takes no height and greys
 * the slider out.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `createSliderSection(..., 0, 8000, 1)`. */
export const OVERRIDE_HEIGHT_MAX = 8000;
/** The type radio's id that needs no height. */
export const OVERRIDE_HEIGHT_TYPE_NO_HEIGHT = 1;

export interface OverrideHeightActionForm {
    height: number;
    type: number;
}

export const overrideHeightAction: WiredElementDefinition<OverrideHeightActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.OVERRIDE_HEIGHT,
    createForm: triggerable => ({
        height: getWiredInt(triggerable, 0),
        type: getWiredBoolean(triggerable, 1) ? 1 : 0,
    }),
    readIntParams: form => [ form.height, form.type ],
};

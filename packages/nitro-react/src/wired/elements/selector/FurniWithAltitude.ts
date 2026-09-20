/**
 * `selectors/FurniWithAltitude` (FURNI_WITH_ALTITUDE) - selects the furni whose altitude compares
 * to the given one as chosen.
 *
 * Int params: `[ altitude, comparison ]` - the altitude in hundredths of a tile (0 to 80.00), the
 * comparison `comparison.0` to `.2`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { clampSliderSectionValue } from '../trigger/triggerShared';
import { SelectorCodes } from './selectorCodes';

/** `createSliderSection("wiredfurni.params.setaltitude", "altitude", new SliderValueHundredth(), 0, 8000, 1)`. */
export const FURNI_WITH_ALTITUDE_MAX = 8000;
/** The comparison radio's ids. */
export const FURNI_WITH_ALTITUDE_COMPARISON_IDS = [ 0, 1, 2 ];

export interface FurniWithAltitudeSelectorForm {
    altitude: number;
    comparison: number;
}

export const furniWithAltitudeSelector: WiredElementDefinition<FurniWithAltitudeSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.FURNI_WITH_ALTITUDE,
    createForm: triggerable => ({
        altitude: clampSliderSectionValue(getWiredInt(triggerable, 0), 0, FURNI_WITH_ALTITUDE_MAX),
        comparison: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.altitude, form.comparison ],
};

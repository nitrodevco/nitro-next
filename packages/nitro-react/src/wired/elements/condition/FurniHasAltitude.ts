/**
 * `conditions/FurniHasAltitude` (`wf_cnd_has_altitude`) - the picked furni's altitude compares to
 * a height.
 *
 * Int params: `[ altitude, comparison ]` - the altitude in hundredths of a tile, 0 to 8000
 * (`setaltitude`, `SliderValueHundredth`), and the comparison 0 less than, 1 equal, 2 greater than.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.setaltitude", "", new SliderValueHundredth(), 0, 8000, 1)`. */
export const FURNI_HAS_ALTITUDE_MAX = 8000;

export interface FurniHasAltitudeConditionForm {
    altitude: number;
    comparison: number;
}

export const furniHasAltitudeCondition: WiredElementDefinition<FurniHasAltitudeConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.FURNI_HAS_ALTITUDE,
    createForm: triggerable => ({
        altitude: clampConditionSliderValue(getWiredInt(triggerable, 0), 0, FURNI_HAS_ALTITUDE_MAX),
        comparison: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.altitude, form.comparison ],
};

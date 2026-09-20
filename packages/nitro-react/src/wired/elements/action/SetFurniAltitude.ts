/**
 * `actiontypes/SetFurniAltitude` (`wf_act_set_altitude`) - sets, raises or lowers the altitude of
 * the selected furni.
 *
 * Int params: `[ altitude, operator ]` - the altitude in hundredths of a tile height, 0 to 8000
 * (shown as 0.00 to 80.00), and the operator 0 to 2 (`wiredfurni.params.operator.<n>`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `createSliderSection("wiredfurni.params.setaltitude", "altitude", new SliderValueHundredth(), 0, 8000, 1)`. */
export const SET_FURNI_ALTITUDE_MAX = 8000;

export interface SetFurniAltitudeActionForm {
    altitude: number;
    operator: number;
}

export const setFurniAltitudeAction: WiredElementDefinition<SetFurniAltitudeActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.SET_FURNI_ALTITUDE,
    createForm: triggerable => ({ altitude: getWiredInt(triggerable, 0), operator: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.altitude, form.operator ],
};

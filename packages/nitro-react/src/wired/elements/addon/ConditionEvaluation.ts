/**
 * `addons/§_-H2d§` (CONDITION_EVALUATION, `wf_xtra_or_eval`) - how the stack's conditions are
 * combined: all, any, none or not all of them (modes 0 to 3), or a count compared against a
 * number - at least, at most or exactly N of them (modes 4 to 6, each radio carrying its own
 * number input).
 *
 * Int params: `[ mode, compare type, compare value ]`. Modes 0 to 3 are sent as they are with
 * `[ 0, 0 ]` after them; a comparison is sent as mode -1, the comparison's index (0 to 2) and its
 * number.
 *
 * The reference server reads this box differently (`WiredAddonConditionsEval`: mode 0 to 6 in
 * the first param, N in the second); Flash's layout is the one kept here.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';

/** `§_-H2d§.§_-wW§` - the radio id of the first comparison mode. */
export const CONDITION_EVALUATION_FIRST_COMPARISON = 4;
/** `§_-H2d§._compareTypes` - at least, at most, exactly. */
export const CONDITION_EVALUATION_COMPARE_TYPES = 3;
/** The comparison modes' `NumberInputParam(0, 0, 1000, 35)`. */
export const CONDITION_EVALUATION_MAX_VALUE = 1000;

export interface ConditionEvaluationAddonForm {
    /** The radio: 0 to 3, or `CONDITION_EVALUATION_FIRST_COMPARISON` + the comparison's index. */
    mode: number;
    /** Each comparison's number input. */
    values: number[];
}

export const conditionEvaluationAddon: WiredElementDefinition<ConditionEvaluationAddonForm> = {
    holder: 'addon',
    code: AddonCodes.CONDITION_EVALUATION,
    createForm: (triggerable) => {
        const values = new Array<number>(CONDITION_EVALUATION_COMPARE_TYPES).fill(0);
        let mode = getWiredInt(triggerable, 0);

        if (mode === -1) {
            const compareType = getWiredInt(triggerable, 1);

            mode = CONDITION_EVALUATION_FIRST_COMPARISON + compareType;

            if ((compareType >= 0) && (compareType < values.length)) values[compareType] = getWiredInt(triggerable, 2);
        }

        return { mode, values };
    },
    readIntParams: (form) => {
        if (form.mode < CONDITION_EVALUATION_FIRST_COMPARISON) return [ form.mode, 0, 0 ];

        const compareType = form.mode - CONDITION_EVALUATION_FIRST_COMPARISON;

        return [ -1, compareType, form.values[compareType] ?? 0 ];
    },
};

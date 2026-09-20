/**
 * `conditions/DontHaveStackedFurnis` (`wf_cnd_not_furni_on`, `NOT_HAS_STACKED_FURNIS`) - nothing
 * is stacked on the picked furni.
 *
 * Int params: `[ require all ]` - 0 (`not_requireall.0`) or 1 (`not_requireall.1`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface DontHaveStackedFurnisConditionForm {
    requireAll: number;
}

export const dontHaveStackedFurnisCondition: WiredElementDefinition<DontHaveStackedFurnisConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.NOT_HAS_STACKED_FURNIS,
    createForm: triggerable => ({ requireAll: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.requireAll ],
};

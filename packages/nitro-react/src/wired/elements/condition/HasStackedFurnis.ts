/**
 * `conditions/HasStackedFurnis` (`wf_cnd_has_furni_on`) - furni are stacked on the picked furni.
 *
 * Int params: `[ require all ]` - 0 when one picked furni with something on it is enough
 * (`requireall.0`), 1 when all of them need it (`requireall.1`). The inverted box is its own
 * element, `DontHaveStackedFurnis`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface HasStackedFurnisConditionForm {
    requireAll: number;
}

export const hasStackedFurnisCondition: WiredElementDefinition<HasStackedFurnisConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.HAS_STACKED_FURNIS,
    createForm: triggerable => ({ requireAll: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.requireAll ],
};

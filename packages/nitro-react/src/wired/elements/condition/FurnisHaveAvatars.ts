/**
 * `conditions/FurnisHaveAvatars` (`wf_cnd_furnis_hv_avtrs`) - users stand on the picked furni.
 *
 * Int params: `[ require all ]` - 0 when one furni with a user on it is enough
 * (`requireall.2`), 1 when every furni needs one (`requireall.3`). The inverted box is its own
 * element, `FurnisHaveNoAvatars`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface FurnisHaveAvatarsConditionForm {
    requireAll: number;
}

export const furnisHaveAvatarsCondition: WiredElementDefinition<FurnisHaveAvatarsConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.FURNIS_HAVE_AVATARS,
    createForm: triggerable => ({ requireAll: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.requireAll ],
};

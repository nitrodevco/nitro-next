/**
 * `conditions/FurnisHaveNoAvatars` (`wf_cnd_not_hv_avtrs`, `NOT_FURNIS_HAVE_AVATARS`) - no users
 * stand on the picked furni. Flash extends `FurnisHaveAvatars` and replaces everything but the
 * param layout.
 *
 * Int params: `[ require all ]` - the radio lists 1 first (`not_requireall.2`), then 0
 * (`not_requireall.3`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface FurnisHaveNoAvatarsConditionForm {
    requireAll: number;
}

export const furnisHaveNoAvatarsCondition: WiredElementDefinition<FurnisHaveNoAvatarsConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.NOT_FURNIS_HAVE_AVATARS,
    createForm: triggerable => ({ requireAll: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.requireAll ],
};

/**
 * `conditions/§_-Q1I§` (TRIGGERER_IS_ON_FURNI, `wf_cnd_trggrer_on_frn`) - the user who triggered the stack stands on one of
 * the picked furni; inverted (`NOT_TRIGGERER_IS_ON_FURNI`), on none of them.
 *
 * No params and no inputs (`INPUTS_TYPE_NONE`): the box is its furni selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

export const triggererIsOnFurniCondition: WiredElementDefinition<Record<string, never>> = {
    holder: 'condition',
    code: ConditionCodes.TRIGGERER_IS_ON_FURNI,
    negativeCode: ConditionCodes.NOT_TRIGGERER_IS_ON_FURNI,
    createForm: () => ({}),
};

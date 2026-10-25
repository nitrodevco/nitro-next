/**
 * `conditions/StuffTypeMatches` (`wf_cnd_stuff_is`) - the furni of the first selection are of the
 * same types as the furni of the second; inverted (`NOT_STUFF_TYPE_MATCHES`), they are not.
 *
 * No params and no inputs (`INPUTS_TYPE_NONE`): the two furni selections are the box, titled
 * `sources.furni.title.match.<id>`, and the advanced settings that hold them are always shown.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

export const stuffTypeMatchesCondition: WiredElementDefinition<Record<string, never>> = {
    holder: 'condition',
    code: ConditionCodes.STUFF_TYPE_MATCHES,
    negativeCode: ConditionCodes.NOT_STUFF_TYPE_MATCHES,
    createForm: () => ({}),
    furniSelectionTitle: id => `wiredfurni.params.sources.furni.title.match.${id}`,
    advancedAlwaysVisible: true,
};

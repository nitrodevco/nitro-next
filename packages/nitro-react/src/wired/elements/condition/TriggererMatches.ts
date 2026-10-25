/**
 * `conditions/TriggererMatches` (`wf_cnd_triggerer_match`) - the triggering user is of a kind,
 * and optionally has a name; inverted (`NOT_TRIGGERER_MATCHES`, `wf_cnd_not_triggerer_match`),
 * is not.
 *
 * Int params: `[ user type ]` - 1 habbo, 2 pet, 4 bot (`usertype.1` / `.2` / `.4`). String param:
 * the name the user must have (at most 32 characters), empty for any user (`anyavatar`). The user
 * selections are titled `sources.users.title.match.<id>`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

/** `TextInputParam("", 32, ...)`'s limit. */
export const TRIGGERER_MATCHES_NAME_MAX_LENGTH = 32;
/** The `picktriggerer` radio: any user, or the one named (`certainavatar`). */
export const TRIGGERER_MATCHES_ANY = 0;
export const TRIGGERER_MATCHES_CERTAIN = 1;

export interface TriggererMatchesConditionForm {
    userType: number;
    /** `TRIGGERER_MATCHES_ANY` or `TRIGGERER_MATCHES_CERTAIN`. */
    pick: number;
    name: string;
}

export const triggererMatchesCondition: WiredElementDefinition<TriggererMatchesConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TRIGGERER_MATCHES,
    negativeCode: ConditionCodes.NOT_TRIGGERER_MATCHES,
    createForm: triggerable => ({
        userType: getWiredInt(triggerable, 0),
        pick: (triggerable.stringParam !== '') ? TRIGGERER_MATCHES_CERTAIN : TRIGGERER_MATCHES_ANY,
        name: triggerable.stringParam,
    }),
    readIntParams: form => [ form.userType ],
    readStringParam: form => ((form.pick === TRIGGERER_MATCHES_CERTAIN) ? form.name : ''),
    userSelectionTitle: id => `wiredfurni.params.sources.users.title.match.${id}`,
};

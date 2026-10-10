/**
 * `conditions/§_-eU§` (PERFORMING_ACTION, `wf_cnd_user_performs_action`) - the user is doing an
 * avatar action (`WiredUserAction`); inverted (`NOT_PERFORMING_ACTION`,
 * `wf_cnd_not_user_performs_action`), is not. Its body is `triggerconfs/PerformAction`'s - the
 * same sign and dance sections, constants and `updateExtraSections` - so the form, the param
 * layout and the view are that trigger's (`PerformActionForm`, `PerformActionView`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { createPerformActionForm, PerformActionForm, readPerformActionIntParams, readPerformActionStringParam } from '../trigger/PerformAction';
import { ConditionCodes } from './conditionCodes';

export const performingActionCondition: WiredElementDefinition<PerformActionForm> = {
    holder: 'condition',
    code: ConditionCodes.PERFORMING_ACTION,
    negativeCode: ConditionCodes.NOT_PERFORMING_ACTION,
    createForm: createPerformActionForm,
    readIntParams: readPerformActionIntParams,
    readStringParam: readPerformActionStringParam,
};

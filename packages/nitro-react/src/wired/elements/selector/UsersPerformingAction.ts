/**
 * `selectors/§_-O21§` (USERS_PERFORMING_ACTION) - selects the users performing the chosen avatar
 * action. Its body is `triggerconfs/PerformAction`'s line for line; the form, the param layout
 * and the view are that trigger's (`PerformActionForm`, `PerformActionView`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { createPerformActionForm, PerformActionForm, readPerformActionIntParams, readPerformActionStringParam } from '../trigger/PerformAction';
import { SelectorCodes } from './selectorCodes';

export const usersPerformingActionSelector: WiredElementDefinition<PerformActionForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_PERFORMING_ACTION,
    createForm: createPerformActionForm,
    readIntParams: readPerformActionIntParams,
    readStringParam: readPerformActionStringParam,
};

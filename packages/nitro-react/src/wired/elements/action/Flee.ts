/**
 * `actiontypes/§_-B2O§` (FLEE) - the picked furni move away from the nearest user.
 * No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import { noInputElement } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const fleeAction = noInputElement('action', ActionTypeCodes.FLEE);

/**
 * `actiontypes/§_-u1x§` (CHASE) - the picked furni move towards the nearest user.
 * No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import { noInputElement } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const chaseAction = noInputElement('action', ActionTypeCodes.CHASE);

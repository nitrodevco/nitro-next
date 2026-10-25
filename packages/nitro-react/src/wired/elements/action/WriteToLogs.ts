/**
 * `actiontypes/WriteToLogs` (code `§_-AE§`, negative code `§_-m1a§`) - writes a line to the room's
 * wired logs.
 *
 * Int params: `[ log level ]` - 0 to 3 (`wiredfurni.params.write_to_logs.log_level.<n>`). String
 * param: the message, at most 400 characters. The frame's header carries the "view logs" button.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The log level dropdown's ids. */
export const WRITE_TO_LOGS_LEVELS = [ 0, 1, 2, 3 ];
/** `TextInputParam("", 400)`. */
export const WRITE_TO_LOGS_MESSAGE_MAX_LENGTH = 400;

export interface WriteToLogsActionForm {
    /** The dropdown's `selectedId`. */
    logLevel: number;
    message: string;
}

export const writeToLogsAction: WiredElementDefinition<WriteToLogsActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.WRITE_TO_LOGS,
    negativeCode: ActionTypeCodes.NEG_WRITE_TO_LOGS,
    headerButton: 'logs',
    createForm: triggerable => ({ logLevel: getWiredInt(triggerable, 0), message: triggerable.stringParam }),
    readIntParams: form => [ form.logLevel ],
    readStringParam: form => form.message,
};

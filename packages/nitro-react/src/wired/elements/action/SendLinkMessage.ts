/**
 * `actiontypes/SendLinkMessage` (`wf_act_send_message`, code 63, WIN63-202610201032) - WIRED Effect:
 * Send Link Message: sends a message over the WIRED Link networks of the picked Links.
 *
 * Int params: `[ source ]` - 0 sends the text that fired the stack (`wiredfurni.params.link.from_trigger`),
 * 1 the custom message. String param: the custom message, at most 1000 UTF-8 bytes
 * (`TextAreaParam(60, -1, -1, -1, 1000)`, `validate` -> `wiredfurni.params.link.message_too_large`).
 * The picked furni are the Links (`furniSelectionTitle` `wiredfurni.params.link.endpoints`).
 */
import { utf8Length } from '../../common/wiredStorageLength';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `RadioButtonParam(0, from_trigger)` / `RadioButtonParam(1, custom_message)`. */
export const LINK_MESSAGE_FROM_TRIGGER = 0;
export const LINK_MESSAGE_CUSTOM = 1;

/** `TextAreaParam(60, -1, -1, -1, 1000)`'s limit, and `validate`'s UTF-8 byte limit. */
export const LINK_MESSAGE_MAX_LENGTH = 1000;

export interface SendLinkMessageForm {
    source: number;
    message: string;
    /** `setTextReferences(wiredContext.textPlaceholders)`. */
    placeholderNames: string[];
}

export const sendLinkMessageAction: WiredElementDefinition<SendLinkMessageForm> = {
    holder: 'action',
    code: ActionTypeCodes.SEND_LINK_MESSAGE,
    createForm: triggerable => ({
        source: getWiredInt(triggerable, 0),
        message: triggerable.stringParam,
        placeholderNames: triggerable.wiredContext.textPlaceholders?.placeholderNames ?? [],
    }),
    readIntParams: form => [ form.source ],
    readStringParam: form => form.message,
    validate: (form, ctx) => ((utf8Length(form.message) > LINK_MESSAGE_MAX_LENGTH) ? ctx.localize('wiredfurni.params.link.message_too_large') : null),
    furniSelectionTitle: () => 'wiredfurni.params.link.endpoints',
    forceHidePickFurniInstructions: true,
};

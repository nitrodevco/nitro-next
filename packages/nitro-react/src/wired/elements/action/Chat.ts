/**
 * `actiontypes/Chat` (`wf_act_show_message`) - shows a message to the selected users.
 *
 * String param: the message. Int params: `[ visibility, bubble style, bubble width ]` -
 * visibility 0 shows it to the selected users only and 1 to everyone in the room, the style is
 * one of `CHAT_NOTIFICATION_STYLES`, and the width is -1 (the room's default) to 2.
 *
 * Since WIN63-202610121624 (`actiontypes/_-01l`) the message is a `MessageEditorPreset`: its
 * placeholders come from the wired context's `textPlaceholders`, and its preview draws the
 * picked style and width with no name (`previewUsername` is `""`, `previewChatType` 0).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `Chat.NOTIFICATION_STYLES` - the chat bubble styles the style dropdown offers. */
export const CHAT_NOTIFICATION_STYLES = [ 34, 200, 201, 202, 210, 211, 212, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 250, 251, 252 ];

/** The bubble width dropdown's ids. */
export const CHAT_BUBBLE_WIDTHS = [ -1, 0, 1, 2 ];

/** `TextAreaParam(40, -1, 8, -1, 400)`'s last argument: the message's maximum length (200 before WIN63-202610121624). */
export const CHAT_MESSAGE_MAX_LENGTH = 400;

export interface ChatActionForm {
    message: string;
    /** `setTextReferences(wiredContext.textPlaceholders)` - what "Add placeholder" lists. */
    placeholderNames: string[];
    visibility: number;
    style: number;
    bubbleWidth: number;
}

export const chatAction: WiredElementDefinition<ChatActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.CHAT,
    createForm: triggerable => ({
        message: triggerable.stringParam,
        placeholderNames: triggerable.wiredContext.textPlaceholders?.placeholderNames ?? [],
        visibility: getWiredInt(triggerable, 0),
        style: getWiredInt(triggerable, 1),
        bubbleWidth: getWiredInt(triggerable, 2),
    }),
    readStringParam: form => form.message,
    readIntParams: form => [ form.visibility, form.style, form.bubbleWidth ],
};

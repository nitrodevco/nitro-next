/**
 * `triggerconfs/ReceiveLinkMessage` (`wf_trg_receive_message`, code 29, WIN63-202610201032) - WIRED
 * Trigger: Receive Link Message: fires when a message arrives over the WIRED Link networks of the
 * picked Links; the message is the `$(trigger_text)` placeholder. No params; the picked furni are
 * the Links (`furniSelectionTitle` `wiredfurni.params.link.endpoints`), and the advanced settings
 * are always shown (`advancedAlwaysVisible`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export type ReceiveLinkMessageForm = Record<string, never>;

export const receiveLinkMessageTrigger: WiredElementDefinition<ReceiveLinkMessageForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.RECEIVE_LINK_MESSAGE,
    createForm: () => ({}),
    furniSelectionTitle: () => 'wiredfurni.params.link.endpoints',
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};

/**
 * The wired chat commands of `ChatInputWidgetHandler` (`RWCM_MESSAGE_CHAT`): a message whose
 * first word is one of these is a command, and is not said.
 *
 * - `:wiredreset` - `HabboUserDefinedRoomEvents.resetCache`, which is
 *   `UserDefinedRoomEventsCtrl.clearCache`: the open dialog closes (there is no window cache
 *   here to drop, see `WiredConfigurationCache` in `wiredCommands.ts`);
 * - `:wf` / `:wired`, `:var` / `:variables`, `:inspect` / `:inspection` - the wired menu links;
 * - `:playtest` - `switchPlayTestMode`.
 *
 * The chat input's other commands are `runRoomChatCommand` (`commands/room/roomChatCommands`), and
 * the list the completion offers is `chatInputClientCommands`.
 */
import { Send } from '#base/context/communication';

import { openClientLink } from '../system/clientLinkCommands';
import { closeWiredSetup } from './wiredCommands';
import { switchWiredPlayTestMode } from './wiredMenuCommands';

/** Runs `text` when it is a wired chat command; `true` when it was one. */
export const runWiredChatCommand = (send: Send, text: string): boolean => {
    switch (text.split(' ')[0].toLowerCase()) {
        case ':wiredreset':
            closeWiredSetup();
            return true;
        case ':wf':
        case ':wired':
            openClientLink(send, 'wiredmenu/open');
            return true;
        case ':var':
        case ':variables':
            openClientLink(send, 'wiredmenu/open/variable_overview');
            return true;
        case ':inspect':
        case ':inspection':
            openClientLink(send, 'wiredmenu/open/inspection');
            return true;
        case ':playtest':
            switchWiredPlayTestMode(send);
            return true;
    }

    return false;
};

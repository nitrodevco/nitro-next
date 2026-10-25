/**
 * `triggerconfs/§_-Er§` (BOT_DESTINATION_REACHED) - fires when the named bot reaches one of the
 * picked furni.
 *
 * String param: the bot's name. The user source section is titled for bots.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

/** The bot name field of `§_-Er§` and `BotAvatarReached`: `TextInputParam("", 32, ...)`. */
export const TRIGGER_BOT_NAME_MAX_CHARACTERS = 32;

export interface TriggerBotNameForm {
    botName: string;
}

export const botDestinationReachedTrigger: WiredElementDefinition<TriggerBotNameForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.BOT_DESTINATION_REACHED,
    createForm: triggerable => ({ botName: triggerable.stringParam }),
    readStringParam: form => form.botName,
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.bots',
};

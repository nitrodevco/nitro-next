/**
 * `triggerconfs/BotAvatarReached` (BOT_AVATAR_REACHED) - fires when the named bot reaches a user.
 *
 * String param: the bot's name. The user source section is titled for bots. Same inputs as
 * `§_-Er§` (`BotDestinationReached`), whose form and view it shares.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import type { TriggerBotNameForm } from './BotDestinationReached';
import { TriggerConfCodes } from './triggerCodes';

export const botAvatarReachedTrigger: WiredElementDefinition<TriggerBotNameForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.BOT_AVATAR_REACHED,
    createForm: triggerable => ({ botName: triggerable.stringParam }),
    readStringParam: form => form.botName,
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.bots',
};

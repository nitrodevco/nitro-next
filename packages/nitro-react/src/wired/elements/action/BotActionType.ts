/**
 * `actiontypes/§_-P1d§` - the base class of every bot action (`BotMove`, `BotTalk`,
 * `BotTalkDirectToAvatar`, `BotGiveHandItem`, `BotFollowAvatar`, `BotChangeFigure` and the bot
 * teleport, `§_-mo§`). It has no code of its own; all it changes is the title of the first user
 * selection, which picks the bots the box acts on. A bot action spreads `botActionType` into its
 * definition.
 */
import type { WiredElementDefinition } from '../../WiredElement';

/** `§_-P1d§.userSelectionTitle` - the first user selection is the bots. */
export const botUserSelectionTitle = (id: number): string =>
    ((id === 0) ? 'wiredfurni.params.sources.users.title.bots' : 'wiredfurni.params.sources.users.title');

/** The members `§_-P1d§` overrides, for a bot action to spread into its definition. */
export const botActionType: Pick<WiredElementDefinition<unknown>, 'userSelectionTitle'> = {
    userSelectionTitle: botUserSelectionTitle,
};

/**
 * The bot name field every bot action (`actiontypes/§_-P1d§` and its subclasses `BotMove`,
 * `BotTalk`, `BotTalkDirectToAvatar`, `BotGiveHandItem`, `BotFollowAvatar`, `BotChangeFigure`,
 * the bot teleport `§_-mo§`) builds the same way:
 * `createTextInput(new TextInputParam("", 32, null, -1, null, true, loc("wiredfurni.tooltip.bot.name")))`.
 * The caller puts it in its `l("bot.name")` section, alone or in a list.
 */
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';

/** `TextInputParam("", 32, ...)` - a bot name's maximum length. */
const BOT_NAME_MAX_CHARACTERS = 32;

export interface WiredBotNameInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const WiredBotNameInput = ({ value, onChange }: WiredBotNameInputProps) => (
    <WiredTextInput
        value={value}
        onChange={onChange}
        maxCharacters={BOT_NAME_MAX_CHARACTERS}
        tooltip="${wiredfurni.tooltip.bot.name}"
    />
);

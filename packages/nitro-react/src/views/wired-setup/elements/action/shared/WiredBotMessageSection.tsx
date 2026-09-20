/**
 * The message section `BotTalk` and `BotTalkDirectToAvatar` build alike: a
 * `TextAreaParam(40, -1, 8, -1, 200, ...)` (40 high, at most 8 lines and 200 characters) over a
 * two-option radio, stacked in one `l("message")` section. Only the radio's options differ (talk /
 * shout, whisper / talk). The text area's `initialText` (`${wiredfurni.tooltip.bot.chatmessage}`)
 * is always overwritten by `onEditStart`, so it has no counterpart.
 */
import { WiredRadioGroup, WiredRadioOption } from '#base/views/wired-setup/kit/WiredRadioGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredTextArea } from '#base/views/wired-setup/kit/WiredTextArea';
import { BOT_MESSAGE_MAX_LENGTH } from '#base/wired';

/** `TextAreaParam(40, -1, 8, ...)`: the field's height and line limit. */
const MESSAGE_HEIGHT = 40;
const MESSAGE_MAX_LINES = 8;

export interface WiredBotMessageSectionProps {
    message: string;
    onMessageChange: (message: string) => void;
    options: WiredRadioOption[];
    mode: number;
    onModeChange: (mode: number) => void;
}

export const WiredBotMessageSection = ({ message, onMessageChange, options, mode, onModeChange }: WiredBotMessageSectionProps) => (
    <WiredSection title="${wiredfurni.params.message}">
        <WiredSimpleList>
            <WiredTextArea
                value={message}
                onChange={onMessageChange}
                height={MESSAGE_HEIGHT}
                maxLines={MESSAGE_MAX_LINES}
                maxCharacters={BOT_MESSAGE_MAX_LENGTH}
            />
            <WiredRadioGroup
                options={options}
                selected={mode}
                onSelect={onModeChange}
            />
        </WiredSimpleList>
    </WiredSection>
);

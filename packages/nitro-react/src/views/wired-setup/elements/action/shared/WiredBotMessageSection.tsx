/**
 * The message section `BotTalk` and `BotTalkDirectToAvatar` build alike (WIN63-202610121624
 * `_-J1x` / `_-7V`): the message editor (`createMessageEditor(TextAreaParam(40, -1, 8, -1, 400,
 * ...))`: 40 high, at most 8 lines and 400 characters), a two-option radio and the
 * "hide bot name" checkbox, stacked in one `l("message")` section. Only the radio's options
 * differ (talk / shout, whisper / talk). The editor previews bot style 31 as a talk, shout or
 * whisper. The text area's `initialText` (`${wiredfurni.tooltip.bot.chatmessage}`) is always
 * overwritten by `onEditStart`, so it has no counterpart.
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';

import { WiredCheckboxGroup } from '#base/views/wired-setup/kit/WiredCheckboxGroup';
import { WiredMessageEditor } from '#base/views/wired-setup/kit/WiredMessageEditor';
import { WiredRadioGroup, WiredRadioOption } from '#base/views/wired-setup/kit/WiredRadioGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { BOT_MESSAGE_MAX_LENGTH, BOT_TALK_PREVIEW_STYLE } from '#base/wired';

/** `TextAreaParam(40, -1, 8, ...)`: the field's height and line limit. */
const MESSAGE_HEIGHT = 40;
const MESSAGE_MAX_LINES = 8;

export interface WiredBotMessageSectionProps {
    message: string;
    onMessageChange: (message: string) => void;
    options: WiredRadioOption[];
    mode: number;
    onModeChange: (mode: number) => void;
    hideBotName: boolean;
    onHideBotNameChange: (hideBotName: boolean) => void;
    placeholderNames: readonly string[];
    bubbleWidth: number;
    /** `previewChatType` - the chat type the radio's current mode previews as. */
    previewChatType: RoomChatTypeEnum;
}

export const WiredBotMessageSection = ({ message, onMessageChange, options, mode, onModeChange, hideBotName, onHideBotNameChange, placeholderNames, bubbleWidth, previewChatType }: WiredBotMessageSectionProps) => (
    <WiredSection title="${wiredfurni.params.message}">
        <WiredSimpleList>
            <WiredMessageEditor
                value={message}
                onChange={onMessageChange}
                height={MESSAGE_HEIGHT}
                maxLines={MESSAGE_MAX_LINES}
                maxCharacters={BOT_MESSAGE_MAX_LENGTH}
                placeholderNames={placeholderNames}
                preview={{ styleId: BOT_TALK_PREVIEW_STYLE, bubbleWidth, chatType: previewChatType }}
            />
            <WiredRadioGroup
                options={options}
                selected={mode}
                onSelect={onModeChange}
            />
            <WiredCheckboxGroup
                options={[ { label: '${wiredfurni.params.bot_talk.hide_bot_name}', selected: hideBotName } ]}
                onToggle={(_, selected) => onHideBotNameChange(selected)}
            />
        </WiredSimpleList>
    </WiredSection>
);

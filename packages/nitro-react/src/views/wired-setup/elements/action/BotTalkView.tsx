/**
 * `actiontypes/BotTalk.buildInputs` and `actiontypes/BotTalkDirectToAvatar.buildInputs` - the bot
 * name in the `bot.name` section, the message editor with its radio and "hide bot name" in the
 * `message` section (talk / shout, or whisper / talk to the selected users), and the folded
 * bubble width section.
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';

import { BotTalkActionForm, WiredElementView, WiredElementViewProps } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredBotMessageSection } from './shared/WiredBotMessageSection';
import { WiredBotNameInput } from './shared/WiredBotNameInput';
import { WiredBubbleWidthSection } from './shared/WiredBubbleWidthSection';

type ModeOptions = { id: number; label: string }[];

const TALK_SHOUT_OPTIONS: ModeOptions = [ { id: 0, label: '${wiredfurni.params.talk}' }, { id: 1, label: '${wiredfurni.params.shout}' } ];
const WHISPER_TALK_OPTIONS: ModeOptions = [ { id: 1, label: '${wiredfurni.params.whisper}' }, { id: 0, label: '${wiredfurni.params.talk}' } ];

/** `previewChatType`: `BotTalk` previews mode 1 as a shout, `BotTalkDirectToAvatar` as a whisper. */
const shoutPreview = (mode: number) => ((mode === 1) ? RoomChatTypeEnum.Shout : RoomChatTypeEnum.Speak);
const whisperPreview = (mode: number) => ((mode === 1) ? RoomChatTypeEnum.Whisper : RoomChatTypeEnum.Speak);

const BotTalkInputs = ({ form, setForm, modeOptions, previewChatType }: WiredElementViewProps<BotTalkActionForm> & { modeOptions: ModeOptions; previewChatType: (mode: number) => RoomChatTypeEnum }) => (
    <>
        <WiredSection title="${wiredfurni.params.bot.name}">
            <WiredBotNameInput
                value={form.botName}
                onChange={botName => setForm({ botName })}
            />
        </WiredSection>
        <WiredBotMessageSection
            message={form.message}
            onMessageChange={message => setForm({ message })}
            options={modeOptions}
            mode={form.mode}
            onModeChange={mode => setForm({ mode })}
            hideBotName={form.hideBotName}
            onHideBotNameChange={hideBotName => setForm({ hideBotName })}
            placeholderNames={form.placeholderNames}
            bubbleWidth={form.bubbleWidth}
            previewChatType={previewChatType(form.mode)}
        />
        <WiredBubbleWidthSection
            value={form.bubbleWidth}
            onChange={bubbleWidth => setForm({ bubbleWidth })}
        />
    </>
);

export const BotTalkView: WiredElementView<BotTalkActionForm> = props => (
    <BotTalkInputs
        {...props}
        modeOptions={TALK_SHOUT_OPTIONS}
        previewChatType={shoutPreview}
    />
);

export const BotTalkDirectToAvatarView: WiredElementView<BotTalkActionForm> = props => (
    <BotTalkInputs
        {...props}
        modeOptions={WHISPER_TALK_OPTIONS}
        previewChatType={whisperPreview}
    />
);

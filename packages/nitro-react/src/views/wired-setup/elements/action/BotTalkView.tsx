/**
 * `actiontypes/BotTalk.buildInputs` - the bot name in the `bot.name` section, the message with the
 * talk / shout radio in the `message` section, and the folded bubble width section.
 */
import { BotTalkActionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredBotMessageSection } from './shared/WiredBotMessageSection';
import { WiredBotNameInput } from './shared/WiredBotNameInput';
import { WiredBubbleWidthSection } from './shared/WiredBubbleWidthSection';

const MODE_OPTIONS = [ { id: 0, label: '${wiredfurni.params.talk}' }, { id: 1, label: '${wiredfurni.params.shout}' } ];

export const BotTalkView: WiredElementView<BotTalkActionForm> = ({ form, setForm }) => (
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
            options={MODE_OPTIONS}
            mode={form.mode}
            onModeChange={mode => setForm({ mode })}
        />
        <WiredBubbleWidthSection
            value={form.bubbleWidth}
            onChange={bubbleWidth => setForm({ bubbleWidth })}
        />
    </>
);

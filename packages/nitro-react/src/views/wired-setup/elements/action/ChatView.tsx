/**
 * `actiontypes/Chat.buildInputs` - the usage info (folded), the message
 * (`TextAreaParam(40, -1, 8, -1, 200)`: 40 high, at most 8 lines and 200 characters), and three
 * folded sections: who sees it (the selected users or everyone), the bubble style
 * (`NOTIFICATION_STYLES`, each captioned `wiredfurni.params.show_message.style_selection.<id>`)
 * and the bubble width.
 */
import { CHAT_MESSAGE_MAX_LENGTH, CHAT_NOTIFICATION_STYLES, ChatActionForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredTextArea } from '../../kit/WiredTextArea';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';
import { WiredBubbleWidthSection } from './shared/WiredBubbleWidthSection';

/** `TextAreaParam(40, -1, 8, ...)`: the field's height and line limit. */
const MESSAGE_HEIGHT = 40;
const MESSAGE_MAX_LINES = 8;

const STYLE_OPTIONS = CHAT_NOTIFICATION_STYLES.map(id => ({ id, label: `\${wiredfurni.params.show_message.style_selection.${id}}` }));

export const ChatView: WiredElementView<ChatActionForm> = ({ form, setForm }) => (
    <>
        <WiredUsageInfoSection
            text="${wiredfurni.params.show_message.usage_info}"
            collapsed
        />
        <WiredSection title="${wiredfurni.params.message}">
            <WiredTextArea
                value={form.message}
                onChange={message => setForm({ message })}
                height={MESSAGE_HEIGHT}
                maxLines={MESSAGE_MAX_LINES}
                maxCharacters={CHAT_MESSAGE_MAX_LENGTH}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.show_message.visibility_selection.title}"
            collapsible
            defaultCollapsed
        >
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.show_message.visibility_selection.0}' }, { id: 1, label: '${wiredfurni.params.show_message.visibility_selection.1}' } ]}
                selected={form.visibility}
                onSelect={visibility => setForm({ visibility })}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.show_message.style_selection.title}"
            collapsible
            defaultCollapsed
        >
            <WiredDropdown
                options={STYLE_OPTIONS}
                selected={form.style}
                onSelect={style => setForm({ style })}
                caption="${wiredfurni.params.show_message.style_selection.title}"
            />
        </WiredSection>
        <WiredBubbleWidthSection
            value={form.bubbleWidth}
            onChange={bubbleWidth => setForm({ bubbleWidth })}
        />
    </>
);

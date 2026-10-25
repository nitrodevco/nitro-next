/**
 * `actiontypes/Chat.buildInputs` (WIN63-202610121624 `_-01l`) - the usage info (folded), the
 * message editor (`createMessageEditor(TextAreaParam(40, -1, 8, -1, 400), ...)`: 40 high, at most
 * 8 lines and 400 characters; it previews the picked style and width as a talk), and three
 * folded sections: who sees it (the selected users or everyone), the bubble style
 * (`NOTIFICATION_STYLES`, each captioned `wiredfurni.params.show_message.style_selection.<id>`)
 * and the bubble width.
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';

import { CHAT_MESSAGE_MAX_LENGTH, CHAT_NOTIFICATION_STYLES, ChatActionForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredMessageEditor } from '../../kit/WiredMessageEditor';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
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
            <WiredMessageEditor
                value={form.message}
                onChange={message => setForm({ message })}
                height={MESSAGE_HEIGHT}
                maxLines={MESSAGE_MAX_LINES}
                maxCharacters={CHAT_MESSAGE_MAX_LENGTH}
                placeholderNames={form.placeholderNames}
                preview={{ styleId: form.style, bubbleWidth: form.bubbleWidth, chatType: RoomChatTypeEnum.Speak }}
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

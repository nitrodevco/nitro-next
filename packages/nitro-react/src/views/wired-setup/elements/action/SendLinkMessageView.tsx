/**
 * `actiontypes/SendLinkMessage.buildInputs` (WIN63-202610201032) - "Message source:" (the text that
 * fired the stack, or a custom message) over the message editor
 * (`createMessageEditor(TextAreaParam(60, -1, -1, -1, 1000), ...)`: 60 high, no line limit, 1000
 * characters; its preview is style 211 with no name). The message section is disabled unless the
 * source is the custom message (`onSourceChanged`).
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';

import { LINK_MESSAGE_CUSTOM, LINK_MESSAGE_FROM_TRIGGER, LINK_MESSAGE_MAX_LENGTH, SendLinkMessageForm, WiredElementView } from '#base/wired';

import { WiredMessageEditor } from '../../kit/WiredMessageEditor';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** `TextAreaParam(60, -1, -1, ...)`: the field's height, no line limit. */
const MESSAGE_HEIGHT = 60;
const MESSAGE_MAX_LINES = -1;
/** `previewStyle` / `previewZero`. */
const PREVIEW = { styleId: 211, bubbleWidth: 0, chatType: RoomChatTypeEnum.Speak };

export const SendLinkMessageView: WiredElementView<SendLinkMessageForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.link.message_source}">
            <WiredRadioGroup
                options={[ { id: LINK_MESSAGE_FROM_TRIGGER, label: '${wiredfurni.params.link.from_trigger}' }, { id: LINK_MESSAGE_CUSTOM, label: '${wiredfurni.params.link.custom_message}' } ]}
                selected={form.source}
                onSelect={source => setForm({ source })}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.message}"
            disabled={form.source !== LINK_MESSAGE_CUSTOM}
        >
            <WiredMessageEditor
                value={form.message}
                onChange={message => setForm({ message })}
                height={MESSAGE_HEIGHT}
                maxLines={MESSAGE_MAX_LINES}
                maxCharacters={LINK_MESSAGE_MAX_LENGTH}
                placeholderNames={form.placeholderNames}
                preview={PREVIEW}
            />
        </WiredSection>
    </>
);

import { useState } from 'react';

import { sendModMessage } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { moderationFrame, moderationWindowKey, useModerationActions, useModerationStore } from '#base/context/moderation';
import { useWindowActions } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

/**
 * Flash's `moderation/SendMsgsCtrl`: the `send_msgs` window ("Msg To: name"). A template from the
 * drop menu fills the input; the layout's own text is a placeholder the first focus clears
 * (`onInputClick`). Send refuses an empty or placeholder message with "You must input a message to
 * the user", else sends `ModMessageMessageComposer(userId, text, -999, issueId)` - the call for help it
 * was opened from, or -1 - and closes.
 */
export const ModSendMessageView = ({ userId, userName, issueId }: { userId: number; userName: string; issueId?: number }) => {
    const { send } = useWebSocketContext();
    const templates = useModerationStore(x => x.init?.messageTemplates ?? []);
    const { showSimpleAlert } = useWindowActions();
    const { closeWindow } = useModerationActions();
    // `_placeHolderMessage`: the layout's caption until the input is focused or a template picked.
    const [ text, setText ] = useState<string | undefined>(undefined);
    const close = () => closeWindow({ kind: 'sendMessage', userId, userName });
    const [ frame ] = useState(() => moderationFrame(moderationWindowKey({ kind: 'sendMessage', userId, userName }), close));

    const sendMessage = () => {
        if (!text) {
            showSimpleAlert({ caption: 'Alert', message: 'You must input a message to the user' });

            return;
        }

        sendModMessage(send, userId, text, issueId);
        close();
    };

    return (
        <TemplateWindow
            id="habbo-moderation-com/send_msgs_xml"
            frame={frame}
            bindings={{
                '': { caption: `Msg To: ${userName}` },
                msgTemplatesSelect: { options: templates, onSelect: index => setText(templates[index]) },
                message_input: { ...((text !== undefined) ? { caption: text } : {}), onFocus: () => setText(text ?? ''), onChange: setText },
                send_message_but: { onPointerTap: sendMessage },
            }}
        />
    );
};

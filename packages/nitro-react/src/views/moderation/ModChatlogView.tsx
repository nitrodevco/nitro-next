import { useEffect, useState } from 'react';

import { forwardToModeratedRoom, requestModerationChatlog } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { moderationChatlogKey, moderationFrame, moderationWindowKey, useModerationActions, useModerationStore } from '#base/context/moderation';
import { findTemplateChild, TemplateWindow, useTemplate } from '#base/theme';

import { chatlogItems, useChatlogArrange } from './chatlogItems';

const TEMPLATE = 'habbo-moderation-com/evidence_frame_xml';

/**
 * Flash's `moderation/ChatlogCtrl`, not embedded: the `evidence_frame` window, which asks its chatlog
 * (`GetRoomChatlogMessageComposer(0, roomId)` or `GetUserChatlogMessageComposer(userId)`) and stays
 * hidden until it comes (`onChatlog` sets the caption and shows it). Each record is the list's first
 * item cloned as a header ("Room: name" with its "Room tool" button) and its lines the second
 * (`chatline`): time, chatter (a link to their user info; "Bot / pet" for 0) and message, rows in
 * alternating shades.
 */
export const ModChatlogView = ({ type, id }: { type: number; id: number }) => {
    const { send } = useWebSocketContext();
    const chatlog = useModerationStore(x => x.chatlogs[moderationChatlogKey(type, id)]);
    const { showWindow, closeWindow } = useModerationActions();
    const template = useTemplate(TEMPLATE);
    const key = moderationWindowKey({ kind: 'chatlog', type, id });
    const [ frame ] = useState(() => moderationFrame(key, () => closeWindow({ kind: 'chatlog', type, id })));
    const { bindings, arrange } = useChatlogArrange();

    useEffect(() => {
        requestModerationChatlog(send, type, id);
    }, [ send, type, id ]);

    const list = template && findTemplateChild(template.elements, 'evidence_list');
    const [ header, line ] = list?.children ?? [];

    if (!chatlog || !header || !line) return null;

    const items = chatlogItems(chatlog.records, header, line, key, showWindow, roomId => forwardToModeratedRoom(send, roomId));

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                ...bindings,
                '': { caption: chatlog.caption },
                evidence_list: { items },
            }}
            arrange={arrange}
        />
    );
};

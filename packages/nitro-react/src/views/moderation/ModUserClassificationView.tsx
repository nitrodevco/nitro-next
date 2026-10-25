import { useState } from 'react';

import { followModeratedUser } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { ModerationClassification, moderationClassificationKey, moderationFrame, useModerationActions } from '#base/context/moderation';
import { ClientGates, useClientGate } from '#base/context/user';
import { findTemplateChild, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';

const TEMPLATE = 'habbo-moderation-com/userclassification_frame_xml';

/** `UserClassificationCtrl.populateRoomRow`'s alternating row colours (`4288861930`, `4294967295`), the first row the shaded one. */
const ROW_COLORS = [ 0xFFA2D6EA, 0xFFFFFFFF ];

/**
 * Flash's `moderation/UserClassificationCtrl`: the `userclassification_frame` window the server's
 * answer to `:uc` / `:anew` opens (`ModerationMessageHandler.onRoomUserClassification`), its caption
 * emptied (`onUserClassification`). Each user is the list's `classificationrow` cloned: the name,
 * and for a moderator (`ModerationManager.isModerator`, security 5) the classification and "Visit";
 * a moderator's name opens the user's info beside the window (`OpenUserInfo`) and "Visit" follows
 * them (`VisitUserUtil`: `FollowFriendMessageComposer`).
 */
export const ModUserClassificationView = ({ classification }: { classification: ModerationClassification }) => {
    const { send } = useWebSocketContext();
    const { showWindow, closeClassification } = useModerationActions();
    const isModerator = useClientGate(ClientGates.ModerationUserLinks);
    const template = useTemplate(TEMPLATE);
    const key = moderationClassificationKey(classification.id);
    const [ frame ] = useState(() => moderationFrame(key, () => closeClassification(classification.id)));

    const row = template && findTemplateChild(template.elements, 'classificationrow');

    if (!row) return null;

    const items: TemplateItem[] = classification.users.map((user, index) => {
        const color = ROW_COLORS[index % 2];

        return {
            key: `u${user.userId}`,
            from: row,
            bindings: {
                '': { color },
                // A text window's `color` is its field's (the layout gives both a background).
                user_name_txt: { caption: user.userName, backgroundColor: color, ...(isModerator ? { onPointerTap: () => showWindow({ kind: 'userInfo', userId: user.userId }, key) } : {}) },
                user_classification_txt: { caption: user.classType, visible: isModerator },
                visit_room_txt: { backgroundColor: color, visible: isModerator, ...(isModerator ? { onPointerTap: () => followModeratedUser(send, user.userId) } : {}) },
            },
        };
    });

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                '': { caption: '' },
                userclassification_list: { items },
            }}
        />
    );
};

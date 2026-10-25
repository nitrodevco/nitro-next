import { useEffect, useState } from 'react';

import { openHousekeepingPage, requestModeratorRoomInfo, sendRoomModeration } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { MOD_CHATLOG_ROOM, moderationFrame, moderationWindowKey, useModerationActions, useModerationStore } from '#base/context/moderation';
import { useWindowActions } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

/**
 * Flash's `moderation/RoomToolCtrl`: the `roomtool_frame` window, shown once `ModeratorRoomInfo`
 * for its room comes (`onRoomInfo`). The room's name, description and tags (`tags_cont` taken out
 * without any), owner (a link to their user info), whether they are in, and the user count; enter
 * room, chatlog. Caution and message go to everyone in the room, with the kick / lock / change name
 * boxes (`ModerateRoomMessageComposer` when one is ticked), enabled only while the moderator is in
 * that room and holds `roomAlertPermission` (`setSendButtonState`); kick needs `roomKickPermission`.
 * The input's layout text is a placeholder the first focus clears; an empty message alerts "You
 * must input a message to the user". "Edit in HK" (`onEditInHk`) opens the room's housekeeping page,
 * `roomadmin.url` with its id.
 */
export const ModRoomToolView = ({ roomId }: { roomId: number }) => {
    const { send } = useWebSocketContext();
    const room = useModerationStore(x => x.roomInfos[roomId]);
    const init = useModerationStore(x => x.init);
    const currentRoomId = useModerationStore(x => x.currentRoomId);
    const { showSimpleAlert } = useWindowActions();
    const { showWindow, closeWindow } = useModerationActions();
    const [ text, setText ] = useState<string | undefined>(undefined);
    const [ checks, setChecks ] = useState({ kick: false, lock: false, changeName: false });
    const close = () => closeWindow({ kind: 'roomTool', roomId });
    const key = moderationWindowKey({ kind: 'roomTool', roomId });
    const [ frame ] = useState(() => moderationFrame(key, close));

    useEffect(() => {
        requestModeratorRoomInfo(send, roomId);
    }, [ send, roomId ]);

    if (!room || !init) return null;

    const templates = init.roomMessageTemplates;
    const canSend = (room.flatId === currentRoomId) && init.roomAlertPermission;

    const act = (caution: boolean) => {
        if (!text) {
            showSimpleAlert({ caption: 'Alert', message: 'You must input a message to the user' });

            return;
        }

        sendRoomModeration(send, room.flatId, caution, text, checks);

        close();
    };

    const toggle = (key: keyof typeof checks) => setChecks({ ...checks, [key]: !checks[key] });

    return (
        <TemplateWindow
            id="habbo-moderation-com/roomtool_frame_xml"
            frame={frame}
            bindings={{
                room_cont: { visible: room.room.exists },
                name: { caption: room.room.name ?? '' },
                desc: { caption: room.room.desc ?? '' },
                tags_cont: { visible: room.room.tags.length > 0 },
                tags_txt: { caption: room.room.tags.join(', ') },
                owner_name_txt: { caption: room.ownerName, onPointerTap: () => showWindow({ kind: 'userInfo', userId: room.ownerId }, key) },
                owner_in_room_txt: { caption: room.ownerInRoom ? 'Yes' : 'No' },
                user_count_txt: { caption: String(room.userCount) },
                chatlog_but: { onPointerTap: () => showWindow({ kind: 'chatlog', type: MOD_CHATLOG_ROOM, id: room.flatId }, key) },
                edit_in_hk_but: { onPointerTap: () => openHousekeepingPage('roomadmin.url', String(room.flatId)) },
                kick_check: { selected: checks.kick, disabled: !init.roomKickPermission, onPointerTap: () => toggle('kick') },
                lock_check: { selected: checks.lock, onPointerTap: () => toggle('lock') },
                changename_check: { selected: checks.changeName, onPointerTap: () => toggle('changeName') },
                msgTemplatesSelect: { options: templates, onSelect: index => setText(templates[index]) },
                message_input: { ...((text !== undefined) ? { caption: text } : {}), onFocus: () => setText(text ?? ''), onChange: setText },
                send_caution_but: { disabled: !canSend, onPointerTap: () => canSend && act(true) },
                send_message_but: { disabled: !canSend, onPointerTap: () => canSend && act(false) },
            }}
        />
    );
};

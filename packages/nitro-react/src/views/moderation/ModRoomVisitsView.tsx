import { useEffect, useState } from 'react';

import { forwardToModeratedRoom, requestRoomVisits } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { moderationFrame, moderationWindowKey, useModerationActions, useModerationStore } from '#base/context/moderation';
import { findTemplateChild, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';
import { twoDigits } from '#base/utils';

const TEMPLATE = 'habbo-moderation-com/roomvisits_frame_xml';

/** `RoomVisitsCtrl.populateRoomRow`'s alternating row colours (`4288861930`, `4294967295`), the first row the shaded one. */
const ROW_COLORS = [ 0xFFA2D6EA, 0xFFFFFFFF ];

/** `RoomVisitsCtrl.padToTwoDigits`. */

/**
 * Flash's `moderation/RoomVisitsCtrl`: the `roomvisits_frame` window, which asks the player's visits
 * (`GetRoomVisitsMessageComposer(userId)`) and shows once they come (`onRoomVisits`: caption "Room
 * visits: name"). Each visit is the list's `visitrow` cloned: the room name (a link to its room tool),
 * the time entered ("hh:mm") and "Enter" (`OpenRoomInSpectatorMode`: the room, as a forward).
 */
export const ModRoomVisitsView = ({ userId }: { userId: number }) => {
    const { send } = useWebSocketContext();
    const visits = useModerationStore(x => x.roomVisits[userId]);
    const { showWindow, closeWindow } = useModerationActions();
    const template = useTemplate(TEMPLATE);
    const key = moderationWindowKey({ kind: 'roomVisits', userId });
    const [ frame ] = useState(() => moderationFrame(key, () => closeWindow({ kind: 'roomVisits', userId })));

    useEffect(() => {
        requestRoomVisits(send, userId);
    }, [ send, userId ]);

    const row = template && findTemplateChild(template.elements, 'visitrow');

    if (!visits || !row) return null;

    const items: TemplateItem[] = visits.rooms.map((room, index) => {
        const color = ROW_COLORS[index % 2];

        return {
            key: `v${index}`,
            from: row,
            bindings: {
                '': { color },
                room_name_txt: { caption: room.roomName, color, onPointerTap: () => showWindow({ kind: 'roomTool', roomId: room.roomId }, key) },
                time_txt: { caption: `${twoDigits(room.enterHour)}:${twoDigits(room.enterMinute)}` },
                // `OpenRoomInSpectatorMode`: "Enter" goes to the room (`ModerationManager.goToRoom`).
                view_room_txt: { color, onPointerTap: () => forwardToModeratedRoom(send, room.roomId) },
            },
        };
    });

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                '': { caption: `Room visits: ${visits.userName}` },
                visits_list: { items },
            }}
        />
    );
};

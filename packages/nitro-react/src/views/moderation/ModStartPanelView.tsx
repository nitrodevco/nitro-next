import { useState } from 'react';

import { MOD_CHATLOG_ROOM, moderationFrame, START_PANEL, useModerationActions, useModerationIssueActions, useModerationStore } from '#base/context/moderation';
import { TemplateWindow } from '#base/theme';

/** `StartPanelCtrl.show`'s text colour for a button not usable yet (`6710886`), and `0` once it is. */
const DISABLED_COLOR = 0x666666;
const ENABLED_COLOR = 0;

const BUTTONS = [ 'room_tool_but', 'chatlog_but', 'userinfo_but', 'ticket_queue_but' ] as const;

type StartPanelButton = typeof BUTTONS[number];

/**
 * Flash's `moderation/StartPanelCtrl`: the `start_panel` window `ModeratorInit` shows. Room tool and
 * chatlog act on the guest room entered (`guestRoomEntered`; the chatlog only with
 * `chatlogsPermission`, `enableChatlogButton`), and are disabled out of one (`roomExited`); user info
 * opens the user last clicked in a room (`userSelected`: "User info: name"); the ticket queue the issue
 * browser (`IssueManager.init`). A hovered usable button shows its `mouseover` border.
 */
export const ModStartPanelView = () => {
    const init = useModerationStore(x => x.init);
    const { showWindow } = useModerationActions();
    const { showBrowser } = useModerationIssueActions();
    const roomId = useModerationStore(x => x.currentRoomId);
    const selectedUser = useModerationStore(x => x.selectedUser);
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);
    const [ frame ] = useState(() => moderationFrame(START_PANEL));

    if (!init) return null;

    const enabled: Record<StartPanelButton, boolean> = {
        room_tool_but: (roomId > 0),
        chatlog_but: (roomId > 0) && init.chatlogsPermission,
        userinfo_but: !!selectedUser,
        ticket_queue_but: true,
    };
    const open: Record<StartPanelButton, () => void> = {
        room_tool_but: () => showWindow({ kind: 'roomTool', roomId }, START_PANEL),
        chatlog_but: () => showWindow({ kind: 'chatlog', type: MOD_CHATLOG_ROOM, id: roomId }, START_PANEL),
        userinfo_but: () => selectedUser && showWindow({ kind: 'userInfo', userId: selectedUser.userId }, START_PANEL),
        ticket_queue_but: () => showBrowser(true),
    };

    const bindings: Record<string, object> = Object.fromEntries(BUTTONS.flatMap(name => [
        [ name, {
            disabled: !enabled[name],
            onPointerTap: () => enabled[name] && open[name](),
            onPointerOver: () => setHovered(name),
            onPointerOut: () => setHovered(undefined),
        } ],
        [ `${name}/mouseover`, { visible: enabled[name] && (hovered === name) } ],
        [ `${name}/offence_name`, { color: enabled[name] ? ENABLED_COLOR : DISABLED_COLOR } ],
    ]));

    if (selectedUser) bindings['userinfo_but/offence_name'] = { color: ENABLED_COLOR, caption: `User info: ${selectedUser.userName}` };

    return (
        <TemplateWindow
            id="habbo-moderation-com/start_panel_xml"
            frame={frame}
            bindings={bindings}
        />
    );
};

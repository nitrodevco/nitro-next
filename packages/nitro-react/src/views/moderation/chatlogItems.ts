/**
 * The chatlog list both moderation windows show (`ChatlogCtrl`): its items and the arrange that sizes
 * its lines and hides its scroller - for `ModChatlogView`'s own frame and the issue handler's embedded
 * `evidence_list`. Kept apart from the views so each view module exports only its component (Fast Refresh).
 */
import { IRoomChatlogData } from '@nitrodevco/nitro-packets';
import { useLayoutEffect, useRef, useState } from 'react';

import { ModerationWindow } from '#base/context/moderation';
import { findLayoutChildByName, getLayoutListItems, TemplateBindings, TemplateElement, TemplateItem, TemplateWindows } from '#base/theme';

/** `ChatlogCtrl.populateContentLine`'s alternating row colours (`4291030266`, `4294967295`), the first line the shaded one. */
const ROW_COLORS = [ 0xFFC3ECFA, 0xFFFFFFFF ];

/** `populateContentLine` / `refreshListDims`: a line is its message's `textHeight + 5` tall. */
const LINE_TEXT_MARGIN = 5;

/** `refreshScrollBarVisibility`: the list takes the scroller's 22px while the scroller is hidden. */
const SCROLLER_SPACE = 22;

/**
 * `populateContentLine`, before the line goes into the list: its message, time and chatter as tall as
 * the larger of the time and the message's `textHeight + 5` (the message wrapped at its layout width).
 */
const arrangeLine = ({ find, root }: TemplateWindows) => {
    const line = root();
    const time = find('time_txt');
    const chatter = find('chatter_txt');
    const msg = find('msg_txt');

    if (!line || !time || !chatter || !msg) return;

    const height = Math.max(time.height, msg.textHeight + LINE_TEXT_MARGIN);

    msg.setHeight(height);
    chatter.setHeight(height);
    time.setHeight(height);
    line.setHeight(height);
};

/** A room record's header (`populateEvidence`, record type 1): "Room: name", or "Room #id" without one. */
const headerCaption = (record: IRoomChatlogData) => {
    const roomName = record.context.get('roomName');

    if (record.recordType !== 1) return 'Context';

    return roomName ? `Room: ${String(roomName)}` : `Room #${String(record.context.get('roomId') ?? 0)}`;
};

/**
 * `ChatlogCtrl.populateEvidence`: each record the list's first item cloned as a header ("Room: name" with
 * its "Room tool" button, and for a room "View room" when `viewRoom` is given) and its lines the second
 * (`chatline`): time, chatter (a link to their user info; "Bot / pet" for 0) and message, rows in alternating shades. Windows it opens go beside `caller`.
 * A call for help's evidence passes its `issueId`, which the user info it opens holds (`ChatlogCtrl.onUserClick`).
 */
export const chatlogItems = (records: IRoomChatlogData[], header: TemplateElement, line: TemplateElement, caller: string, showWindow: (window: ModerationWindow, caller?: string) => void, viewRoom?: (roomId: number) => void, issueId?: number) => {
    const items: TemplateItem[] = [];

    records.forEach((record, recordIndex) => {
        const roomId = Number(record.context.get('roomId') ?? 0);

        items.push({
            key: `h${recordIndex}`,
            from: header,
            bindings: {
                text: { caption: headerCaption(record) },
                btnHeaderAction: (roomId > 0) ? { caption: 'Room tool', onPointerTap: () => showWindow({ kind: 'roomTool', roomId }, caller) } : { visible: false },
                // `OpenRoomInSpectatorMode`: "View room" goes to the room (`ModerationManager.goToRoom`).
                btnHeaderAction2: ((record.recordType === 1) && (roomId > 0) && viewRoom) ? { caption: 'View room', onPointerTap: () => viewRoom(roomId) } : { visible: false },
            },
        });

        record.chatlog.forEach((entry, index) => {
            const color = ROW_COLORS[index % 2];
            // The time, chatter and message take the line's colour (`_loc4_.color = _loc7_.color`).
            const fill = color & 0xFFFFFF;

            items.push({
                key: `l${recordIndex}:${index}`,
                from: line,
                bindings: {
                    '': { color },
                    time_txt: { caption: entry.timeStamp },
                    chatter_txt: (entry.chatterId > 0)
                        ? { caption: entry.chatterName, underline: true, backgroundColor: fill, onPointerTap: () => showWindow({ kind: 'userInfo', userId: entry.chatterId, issueId }, caller) }
                        : { caption: (entry.chatterId === 0) ? 'Bot / pet' : '-', underline: false, backgroundColor: fill },
                    msg_txt: { caption: entry.msg, backgroundColor: fill },
                },
                arrange: arrangeLine,
            });
        });
    });

    return items;
};

/**
 * `ChatlogCtrl.onResizeTimer`, run once the chatlog is in (and again on each resize): `refreshListDims`
 * widens each `chatline`'s message to the line's right edge and makes the line its message's
 * `textHeight + 5` tall; `refreshScrollBarVisibility` hides the list's sibling `scroller` while the
 * lines fit, the list taking its 22px - its lines stretch with it, their messages keep their width.
 * Returns the bindings that hide the scroller and the window's `arrange`, for the frame and for the
 * issue handler, which shows the chatlog in its own `evidence_list` (`_embedded`).
 */
export const useChatlogArrange = (): { bindings: TemplateBindings; arrange: (windows: TemplateWindows) => void } => {
    const [ scrollerHidden, setScrollerHidden ] = useState(false);
    const fits = useRef(scrollerHidden);

    useLayoutEffect(() => {
        if (fits.current !== scrollerHidden) setScrollerHidden(fits.current);
    });

    const arrange = ({ find }: TemplateWindows) => {
        const list = find('evidence_list');

        if (!list) return;

        for (const line of getLayoutListItems(list)) {
            if (line.element?.name !== 'chatline') continue;

            const msg = findLayoutChildByName(line, 'msg_txt');

            if (!msg) continue;

            msg.setWidth(line.width - msg.x);
            msg.setHeight(msg.textHeight + LINE_TEXT_MARGIN);
            line.setHeight(msg.height);
        }

        fits.current = list.scrollableRegion.height <= list.height;

        if (scrollerHidden) list.setWidth(list.width + SCROLLER_SPACE);
    };

    return { bindings: scrollerHidden ? { scroller: { visible: false } } : {}, arrange };
};

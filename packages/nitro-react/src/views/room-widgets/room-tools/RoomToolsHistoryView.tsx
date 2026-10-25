/**
 * The rooms visited this session, newest last - Flash `RoomToolsHistory`, on `habbo-room-ui-com`'s
 * `room_tools_history` layout with one `room_tools_history_item` added per room (`populate`): its
 * `room_name` the room's name, at x 5, the first at y 5 and each 2 under the last, and the panel as
 * high as the last row's bottom plus `2 * PADDING`. The rows are wider than the panel (169 against 152)
 * and are cut at its edge. A click on a row goes to its room (`onClick` -> `goToPrivateRoom`).
 */
import { TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

export interface RoomToolsHistoryEntry {
    roomId: number;
    roomName: string;
}

export interface RoomToolsHistoryViewProps {
    entries: RoomToolsHistoryEntry[];
    onSelect: (roomId: number) => void;
}

const HISTORY_TEMPLATE = 'habbo-room-ui-com/room_tools_history_xml';
const ITEM_TEMPLATE = 'habbo-room-ui-com/room_tools_history_item_xml';

/** `RoomToolsHistory.PADDING` / `SPACING`. */
const PADDING = 5;
const SPACING = 2;

/** `populate`: the rows stacked from the top, the panel ending under the last. */
const arrange = ({ root }: TemplateWindows) => {
    const window = root();

    if (!window) return;

    let bottom = 0;

    for (const item of window.children) {
        item.setX(PADDING);
        item.setY(bottom ? (bottom + SPACING) : PADDING);
        bottom = item.y + item.height;
    }

    window.setHeight(bottom + (2 * PADDING));
};

export const RoomToolsHistoryView = ({ entries, onSelect }: RoomToolsHistoryViewProps) => {
    const itemTemplate = useTemplate(ITEM_TEMPLATE);

    if (!itemTemplate) return null;

    const added: TemplateItem[] = entries.map(entry => ({
        key: String(entry.roomId),
        from: itemTemplate,
        bindings: {
            '': { onPointerTap: () => onSelect(entry.roomId) },
            room_name: { caption: entry.roomName },
        },
    }));

    return (
        <TemplateWindow
            id={HISTORY_TEMPLATE}
            bindings={{ '': { added } }}
            arrange={arrange}
        />
    );
};

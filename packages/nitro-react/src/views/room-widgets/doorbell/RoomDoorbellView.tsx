/**
 * Who is ringing at the door - Flash `DoorbellView`, on `habbo-room-ui-com`'s `doorbell` layout
 * (`createMainWindow`), opened where the layout places it (95, 55). `update` refills `user_list` with
 * one `doorbell_list_entry` per caller (`createListItem`): `user_name` the caller, the even rows white
 * (`color = 0xFFFFFFFF`) over the entry's own `0xEEEEEE`, and `accept` / `deny` answering for that
 * caller (`onButtonClicked`). The frame's `close` tag turns everyone away (`onClose` -> `denyAll`), which
 * the widget does. Only rooms you may answer for ever fill it, and it is gone again as soon as the last
 * caller has been let in or turned away (`hide`).
 *
 * The accept and deny regions carry no tooltip: the layout gives them none and `DoorbellView` sets none.
 */
import { TemplateItem, TemplateWindow, useTemplate } from '#base/theme';

export interface RoomDoorbellViewProps {
    /** Everyone waiting at the door, in the order they rang. */
    users: string[];
    onAccept: (username: string) => void;
    onDeny: (username: string) => void;
    /** Closing the window turns everyone away, as the Flash close button did. */
    onClose: () => void;
}

const DOORBELL_TEMPLATE = 'habbo-room-ui-com/doorbell';
const ENTRY_TEMPLATE = 'habbo-room-ui-com/doorbell_list_entry';

/** `createListItem`: an even row's `color`. */
const EVEN_ROW_COLOR = 0xffffffff;

/** The layout's frame position: `buildFromXML` puts the window on the desktop there. */
const LAYOUT_POSITION = { x: 95, y: 55 };

export const RoomDoorbellView = ({ users, onAccept, onDeny, onClose }: RoomDoorbellViewProps) => {
    const entryTemplate = useTemplate(ENTRY_TEMPLATE);

    if (!entryTemplate) return null;

    const items: TemplateItem[] = users.map((username, index) => ({
        key: username,
        from: entryTemplate,
        bindings: {
            '': (index % 2 === 0) ? { color: EVEN_ROW_COLOR } : {},
            user_name: { caption: username },
            accept: { onPointerTap: () => onAccept(username) },
            deny: { onPointerTap: () => onDeny(username) },
        },
    }));

    return (
        <TemplateWindow
            id={DOORBELL_TEMPLATE}
            frame={{ id: 'room-doorbell', defaultPosition: LAYOUT_POSITION, rememberPosition: false, onClose }}
            bindings={{ user_list: { items } }}
        />
    );
};

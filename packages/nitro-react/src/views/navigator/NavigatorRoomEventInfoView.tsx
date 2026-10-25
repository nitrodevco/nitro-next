import { TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

/**
 * The room event card - `RoomEventInfoCtrl` over `habbo-navigator-com/iro_event_info_xml`, docked in
 * the toolbar's extension column as `room_event_info`.
 *
 * `refresh` is the bindings: the owner's or the visitor's background for an expanded event, the
 * title bar for a folded one or for no event; the event's name in `header_txt` and, expanded, its
 * description; for whoever may change it the edit link, and the extend link when it may be
 * extended; for a visitor `in_progress_txt`; with no event, `get_event` for whoever may make one.
 * `create_link` never shows. The window is as tall as the background it shows.
 */
const TEMPLATE = 'habbo-navigator-com/iro_event_info_xml';

/** `event_bg_visitor`'s height (the expanded card) and `event_bg_contracted`'s (the title bar). */
const EXPANDED_HEIGHT = 135;
const CONTRACTED_HEIGHT = 25;

export interface NavigatorRoomEventInfoViewProps {
    /** `roomEventData.eventName` / `eventDescription`, while an event runs. */
    eventName: string | undefined;
    eventDescription: string;
    /** `_expanded`. */
    expanded: boolean;
    /** `currentRoomOwner`. */
    isOwner: boolean;
    /** The owner, an event moderator or a room controller (`roomControllerLevel == 1`). */
    canModify: boolean;
    /** `canExtend`. */
    canExtend: boolean;
    /** `onGetEventClick`. */
    onBackgroundClick: () => void;
    /** `onModify`. */
    onModify: () => void;
    /** `onExtend`. */
    onExtend: () => void;
}

export const NavigatorRoomEventInfoView = ({ eventName, eventDescription, expanded, isOwner, canModify, canExtend, onBackgroundClick, onModify, onExtend }: NavigatorRoomEventInfoViewProps) => {
    const hasEvent = eventName !== undefined;
    const open = expanded && hasEvent;
    const canEdit = open && canModify;

    const bindings: TemplateBindings = {
        event_bg_owner: { visible: open && isOwner },
        event_bg_visitor: { visible: open && !isOwner },
        event_bg_contracted: { visible: !open },
        bg_region: { onPointerTap: onBackgroundClick },
        modify_link_region: { visible: canEdit, onPointerTap: onModify },
        extend_event_region: { visible: canEdit && canExtend, onPointerTap: onExtend },
        get_event: { visible: !hasEvent && canModify },
        create_link: { visible: false },
        in_progress_txt: { visible: open && !canModify },
        desc_txt: { visible: open, caption: eventDescription },
        header_txt: { visible: hasEvent, caption: eventName ?? '' },
    };

    const arrange = ({ root }: TemplateWindows) => root()?.setHeight(open ? EXPANDED_HEIGHT : CONTRACTED_HEIGHT);

    return (
        <TemplateWindow
            id={TEMPLATE}
            bindings={bindings}
            arrange={arrange}
        />
    );
};

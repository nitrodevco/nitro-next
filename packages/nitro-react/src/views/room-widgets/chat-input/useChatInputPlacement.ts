import { useConfigValue, useFriendBarWidth, useToolbarAreaWidth } from '#base/context/system';
import { useRoomToolsCollapsed } from '#base/context/user';
import { useViewportSize } from '#base/hooks';
import { roomToolsRight } from '#base/views/room-widgets/room-tools/roomToolsGeometry';

/** `RoomChatInputView.updatePosition` - the gap kept from whatever sits left of the chat bar. */
const LEFT_MARGIN = 12;
/** The room the centred bar must leave the toolbar's icons on top of its own margin - `updatePosition`'s `+ 100`. */
const TOOLBAR_CLEARANCE = 100;
/** `bubblecont.y`: `height - 104` in the toolbar, `height - 160` above it. */
const BUBBLECONT_FROM_BOTTOM_IN_TOOLBAR = 104;
const BUBBLECONT_FROM_BOTTOM_ABOVE_TOOLBAR = 160;

export interface ChatInputPlacementOptions {
    width: number;
    height: number;
    viewportWidth: number;
    viewportHeight: number;
    toolbarAreaWidth: number;
    friendBarWidth: number;
    roomToolsCollapsed: boolean;
    configuredWidth?: number;
    configuredBottom?: number;
}

/**
 * `chat.input.width` opts into a centred bar width in stage pixels; `chat.input.bottom` sets the
 * gap from the bar's bottom edge to the viewport bottom in stage pixels. Both are optional;
 * without them the original toolbar-aware Flash placement is used.
 */
export const resolveChatInputPlacement = ({
    width,
    height,
    viewportWidth,
    viewportHeight,
    toolbarAreaWidth,
    friendBarWidth,
    roomToolsCollapsed,
    configuredWidth,
    configuredBottom,
}: ChatInputPlacementOptions) => {
    const hasConfiguredWidth = Number.isFinite(configuredWidth) && (configuredWidth as number) > 0;
    const hasConfiguredBottom = Number.isFinite(configuredBottom) && (configuredBottom as number) >= 0;
    const maxWidth = Math.max(1, viewportWidth - (LEFT_MARGIN * 2));
    const placedWidth = hasConfiguredWidth ? Math.min(configuredWidth as number, maxWidth) : width;

    const centredLeft = hasConfiguredWidth ? (viewportWidth - placedWidth) / 2 : ~~((viewportWidth / 2) - (width / 2));
    const fitsInToolbar = ((viewportWidth - toolbarAreaWidth - friendBarWidth) > (placedWidth + LEFT_MARGIN))
        && (centredLeft >= (toolbarAreaWidth + LEFT_MARGIN + TOOLBAR_CLEARANCE))
        && ((centredLeft + placedWidth) <= (viewportWidth - friendBarWidth));
    const left = hasConfiguredWidth ? centredLeft : fitsInToolbar ? centredLeft : Math.max(centredLeft, roomToolsRight(roomToolsCollapsed) + LEFT_MARGIN);
    const top = hasConfiguredBottom
        ? Math.max(0, Math.min(viewportHeight - height, viewportHeight - (configuredBottom as number) - height))
        : viewportHeight - (fitsInToolbar ? BUBBLECONT_FROM_BOTTOM_IN_TOOLBAR : BUBBLECONT_FROM_BOTTOM_ABOVE_TOOLBAR);

    return { left, top, width: placedWidth };
};

/**
 * `RoomChatInputView.updatePosition`: `bubblecont` (`width` wide) sits centred in the toolbar when
 * the toolbar's icons and the friend bar leave it the room - its top `height - 104` - and otherwise
 * moves up to `height - 160` and starts right of the room tools, still centred if the centre is
 * clear of them.
 */
export const useChatInputPlacement = (width: number, height: number) => {
    // The bar starts where the room tools end, as `RoomToolsWidget.getWidgetAreaWidth` told it to.
    const roomToolsCollapsed = useRoomToolsCollapsed();
    const { width: viewportWidth, height: viewportHeight } = useViewportSize();
    const toolbarAreaWidth = useToolbarAreaWidth();
    const friendBarWidth = useFriendBarWidth();
    const configuredWidth = useConfigValue<number>('chat.input.width');
    const configuredBottom = useConfigValue<number>('chat.input.bottom');

    return resolveChatInputPlacement({
        width,
        height,
        viewportWidth,
        viewportHeight,
        toolbarAreaWidth,
        friendBarWidth,
        roomToolsCollapsed,
        configuredWidth,
        configuredBottom,
    });
};

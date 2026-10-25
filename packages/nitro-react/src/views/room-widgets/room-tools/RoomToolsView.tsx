/**
 * The room tools - Flash `RoomToolsToolbarCtrl`, on `habbo-room-ui-com`'s `room_tools_toolbar` layout:
 * the column of room actions in the bottom-left corner (`_window.position = (TOOLBAR_X, desktop.height -
 * DISTANCE_FROM_BOTTOM - height)`), with the zoom row on top and the visit-history arrows at the bottom,
 * and the strip down its left side that folds it away.
 *
 * - The rows the widget passes show (`setElementVisible`: `button_settings`, `button_like`,
 *   `button_share` and the rest by their layout names); the others are hidden, `button_zoom` as in the
 *   layout. A row's press is the widget's (`onWindowEvent`'s `WME_CLICK` by name).
 * - `updateZoomControls`: `zoom_text` is `room.zoom.text` with the level as its `%zoom_level%`, and
 *   `zoom_in_btn` / `zoom_out_btn` disabled where the room cannot zoom further.
 * - `updateRoomHistoryButtons`: `button_history_back` / `_forward` disabled where there is no room
 *   that way, `button_history` (the list, `toggleHistory`) until somewhere else has been visited.
 * - `updatePosition` sums the heights of the visible rows and makes the window, the list,
 *   `window_bg`, both side bars and their regions that high, centring each arrow on it
 *   (`int(height * 0.5 - arrow.height * 0.5)`); the history list (`RoomToolsHistory`) is parked with its
 *   right edge on the column's (`right`), above it.
 * - Collapsing (`button_collapse` / `button_expand`, `setCollapsed`) slides `window_bg` rather than
 *   switching it: `beginAnimation` moves it between x 1 and its collapsed offset
 *   (`getCollapsedExpandedOffsetX`: `side_bar_expand.width - window_bg.width - 1`) over 140 ms, eased
 *   `1 - (1 - t)^3` (`update`), under the strip; `updateVisuals` shows `side_bar_collapse` while it is
 *   open and `side_bar_expand` once it is shut, and keeps `window_bg` drawn while it is still sliding.
 *
 * Not carried: the room mouse block rect (`setMouseEventsDisabledRect`), and the collapse timer cleared
 * on a click (`clearCollapseTimer`), which the info card's widget owns.
 */
import { ReactNode } from 'react';

import { easeOutCubic, useTween } from '#base/hooks';
import { Box, getLayoutListItems, TemplateBinding, TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

import { ROOM_TOOLS_BOTTOM, ROOM_TOOLS_SIDE_BAR_WIDTH, ROOM_TOOLS_X } from './roomToolsGeometry';

/** One row of the tool column, by its layout name. */
export interface RoomToolsButton {
    /** The row's name in `room_tools_toolbar` (`button_settings`, `button_like`, `button_share`...). */
    key: string;
    disabled?: boolean;
    onPress: () => void;
}

export interface RoomToolsViewProps {
    buttons: RoomToolsButton[];
    /** The zoom row's readout - `room.zoom.text` with the level in it. */
    zoomLevel: number;
    canZoomIn: boolean;
    canZoomOut: boolean;
    onZoomIn: () => void;
    onZoomOut: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
    /** The list button is dead until somewhere other than here has been visited. */
    canOpenHistory: boolean;
    onGoBack: () => void;
    onGoForward: () => void;
    onToggleHistory: () => void;
    collapsed: boolean;
    onToggleCollapsed: () => void;
    /** The history list, drawn above the column when it is open. */
    history?: ReactNode;
}

const TOOLBAR_TEMPLATE = 'habbo-room-ui-com/room_tools_toolbar_xml';

/** The rows `setElementVisible` shows or hides; the widget's are shown. */
const ROW_NAMES = [ 'button_achievements', 'button_settings', 'button_chat_history', 'button_like', 'button_camera', 'button_share' ];

/** `window_bg`'s width in the layout. */
const WINDOW_BG_WIDTH = 164;
/** `getCollapsedExpandedOffsetX`: `side_bar_expand.width - window_bg.width - 1`. */
const COLLAPSED_OFFSET_X = ROOM_TOOLS_SIDE_BAR_WIDTH - WINDOW_BG_WIDTH - 1;
/** `TOOLBAR_EXPAND_TARGET_X`: `window_bg`'s x, open. */
const EXPAND_TARGET_X = 1;
/** `RoomToolsToolbarCtrl.ANIMATION_DURATION_MS`. */
const ANIMATION_DURATION_MS = 140;

export const RoomToolsView = ({
    buttons, zoomLevel, canZoomIn, canZoomOut, onZoomIn, onZoomOut,
    canGoBack, canGoForward, canOpenHistory, onGoBack, onGoForward, onToggleHistory,
    collapsed, onToggleCollapsed, history,
}: RoomToolsViewProps) => {
    // `applyExpandedBranchOffset`: `window_bg` sits at 1 + the offset, which slides between 0 and the collapsed one.
    const offsetX = useTween(collapsed ? COLLAPSED_OFFSET_X : 0, ANIMATION_DURATION_MS, easeOutCubic);
    // `updateVisuals`: `window_bg` stays drawn while the column is still sliding shut.
    const sliding = offsetX !== (collapsed ? COLLAPSED_OFFSET_X : 0);

    const rows: TemplateBindings = {};

    for (const name of ROW_NAMES) {
        const button = buttons.find(each => each.key === name);
        const binding: TemplateBinding = button ? { visible: true, disabled: button.disabled, onPointerTap: button.onPress } : { visible: false };

        rows[name] = binding;
    }

    const arrange = ({ root, find }: TemplateWindows) => {
        const window = root();
        const list = find('itemlist_buttons');
        const background = find('window_bg');
        const collapseBar = find('side_bar_collapse');
        const expandBar = find('side_bar_expand');

        if (!window || !list || !background || !collapseBar || !expandBar) return;

        background.setX(EXPAND_TARGET_X + offsetX);

        // `updatePosition`.
        const height = getLayoutListItems(list).reduce((total, item) => (item.visible ? (total + item.height) : total), 0);

        collapseBar.setHeight(height);
        collapseBar.setX(0);
        expandBar.setHeight(height);
        expandBar.setX(0);
        expandBar.setY(0);
        background.setHeight(height);
        list.setHeight(height);
        window.setHeight(height);
        find('button_collapse')?.setHeight(height);
        find('button_expand')?.setHeight(height);

        for (const name of [ 'arrow_collapse', 'arrow_expand' ]) {
            const arrow = find(name);

            if (arrow) arrow.setY((height * 0.5) - (arrow.height * 0.5));
        }
    };

    return (
        <Box
            pointerTransparent
            layout={{ position: 'absolute', left: ROOM_TOOLS_X, bottom: ROOM_TOOLS_BOTTOM, flexDirection: 'column', alignItems: 'flex-end' }}
        >
            {/* `updatePosition`: the history list's right edge on the column's, above it. */}
            {history}
            <TemplateWindow
                id={TOOLBAR_TEMPLATE}
                parameters={{ 'room.zoom.text': { zoom_level: String(zoomLevel) } }}
                bindings={{
                    window_bg: { visible: !collapsed || sliding },
                    side_bar_collapse: { visible: !collapsed },
                    side_bar_expand: { visible: collapsed },
                    button_collapse: { onPointerTap: onToggleCollapsed },
                    button_expand: { onPointerTap: onToggleCollapsed },
                    zoom_in_btn: { disabled: !canZoomIn, onPointerTap: onZoomIn },
                    zoom_out_btn: { disabled: !canZoomOut, onPointerTap: onZoomOut },
                    ...rows,
                    button_history_back: { disabled: !canGoBack, onPointerTap: onGoBack },
                    button_history: { disabled: !canOpenHistory, onPointerTap: onToggleHistory },
                    button_history_forward: { disabled: !canGoForward, onPointerTap: onGoForward },
                }}
                arrange={arrange}
            />
        </Box>
    );
};

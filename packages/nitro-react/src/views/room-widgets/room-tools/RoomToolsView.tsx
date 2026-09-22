import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { ROOM_TOOLS_BOTTOM, ROOM_TOOLS_SIDE_BAR_WIDTH, ROOM_TOOLS_WIDTH, ROOM_TOOLS_X } from './roomToolsGeometry';

/** One entry in the tool column, in the order `room_tools_toolbar` stacks them. */
export interface RoomToolsButton {
    key: string;
    icon: string;
    /**
     * The icon's box in its 130x25 row - `x` and `width` of the row's `static_bitmap`, the art
     * centred in it and etched: 3/25 for the gear, 2/27 for the like and share icons.
     */
    iconLeft: number;
    iconWidth: number;
    /** The label's `y` in the row - 4 beside the gear, 3 beside the like and share icons. */
    labelTop: number;
    /** The label beside the icon; the whole row is 130 wide whatever it says. */
    labelKey: string;
    tooltipKey?: string;
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

const BUTTON_HEIGHT = 25;
const ZOOM_ROW_HEIGHT = 30;
const HISTORY_ROW_HEIGHT = 43;
/**
 * The rows whose label is `u_regular` in `0xcccccc` (`button_settings`, and `button_achievements`,
 * which shares its `text_settings`); every other row's is `u_button_tab` in `0xbbbbbb`.
 */
const PLAIN_LABEL_KEYS = [ 'button_settings', 'button_achievements' ];
/** `roomtools_minimizebutton`'s height, which `arrow_collapse` / `arrow_expand` fit to. */
const ARROW_HEIGHT = 8;

/**
 * The room tools, on the `room_tools_toolbar` layout (165 wide): the column of room actions in
 * the bottom-left corner, with the zoom readout under them and the visit-history arrows at the
 * bottom. The strip down its left side collapses the column away.
 *
 * Flash sized the window by summing whichever rows were visible, so the same is done here rather
 * than leaving the layout's nominal 229 height standing when half the rows are hidden.
 */
export const RoomToolsView = ({
    buttons, zoomLevel, canZoomIn, canZoomOut, onZoomIn, onZoomOut,
    canGoBack, canGoForward, canOpenHistory, onGoBack, onGoForward, onToggleHistory,
    collapsed, onToggleCollapsed, history,
}: RoomToolsViewProps) => {
    const t = useTranslation();
    const height = (buttons.length * BUTTON_HEIGHT) + ZOOM_ROW_HEIGHT + HISTORY_ROW_HEIGHT;

    return (
        <Box layout={{ position: 'absolute', left: ROOM_TOOLS_X, bottom: ROOM_TOOLS_BOTTOM, width: ROOM_TOOLS_WIDTH, height }}>
            {/* `RoomToolsToolbarCtrl.updatePosition` parks the list against the column's right edge, above it. */}
            {history && (
                <Box layout={{ position: 'absolute', right: 0, bottom: height }}>
                    {history}
                </Box>
            )}
            {!collapsed && (
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    ownGraphicContext
                    layout={{ position: 'absolute', left: 1, width: 164, top: 0, bottom: 0 }}
                >
                    <Region
                        name="itemlist_buttons"
                        layout={{ position: 'absolute', left: 24, top: 6, minWidth: 140, flexDirection: 'column' }}
                    >
                        <Region layout={{ width: 130, height: ZOOM_ROW_HEIGHT, flexShrink: 0 }}>
                            <ThemeText
                                text={t('room.zoom.text', 'Zoom %zoom_level%', { zoom_level: String(zoomLevel) })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#cccccc', fontSize: 11 }}
                                clip
                                name="zoom_text"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 6, width: 90, top: 4, height: 14, maxWidth: 90 }}
                            />
                            <Region
                                backgroundColor="#707070"
                                alpha={0.5}
                                layout={{ position: 'absolute', left: 3, width: 125, top: 26, height: 1 }}
                            />
                            <Region
                                name="zoom_in_btn"
                                dynamicStyle="button"
                                tooltip={t('room.zoom.zoom_in.tooltip')}
                                disabled={!canZoomIn}
                                onPointerTap={onZoomIn}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 87, width: 18, top: 3, height: 19 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_zoom_in.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                />
                            </Region>
                            <Region
                                name="zoom_out_btn"
                                dynamicStyle="button"
                                tooltip={t('room.zoom.zoom_out.tooltip')}
                                disabled={!canZoomOut}
                                onPointerTap={onZoomOut}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 107, width: 18, top: 3, height: 19 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_zoom_out.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                />
                            </Region>
                        </Region>
                        {buttons.map(button => (
                            <Region
                                key={button.key}
                                name={button.key}
                                tooltip={button.tooltipKey ? t(button.tooltipKey) : undefined}
                                dynamicStyle="brightness_and_shadow_under"
                                disabled={button.disabled}
                                onPointerTap={button.onPress}
                                cursor="pointer"
                                layout={{ width: 130, height: BUTTON_HEIGHT, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    src={button.icon}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: button.iconLeft, width: button.iconWidth, top: 0, height: BUTTON_HEIGHT }}
                                />
                                <ThemeText
                                    text={t(button.labelKey)}
                                    textStyle={PLAIN_LABEL_KEYS.includes(button.key) ? 'u_regular' : 'u_button_tab'}
                                    textOptions={{ fill: PLAIN_LABEL_KEYS.includes(button.key) ? '#cccccc' : '#bbbbbb', fontSize: 11 }}
                                    flashFormat={{ underline: true }}
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 36, width: 90, top: button.labelTop, height: 14, maxWidth: 90 }}
                                />
                            </Region>
                        ))}
                        <Region
                            name="cnt_history"
                            layout={{ width: 115, height: HISTORY_ROW_HEIGHT, marginLeft: 3, flexShrink: 0 }}
                        >
                            <Region
                                name="button_history_back"
                                tooltip={t('room.history.button.back.tooltip')}
                                dynamicStyle="brightness_and_shadow_under"
                                disabled={!canGoBack}
                                onPointerTap={onGoBack}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 37, top: 3, height: 34 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_forward_bg.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, zoomX: -1, etchingColor: 0x48000000, fitSizeToContents: true }}
                                    tint="#44a88d"
                                    dynamicRole="bg"
                                    layout={{ position: 'absolute', left: 3, width: 34, top: 2, height: 31 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_back_icon.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 4, width: 30, top: 3, height: 30 }}
                                />
                            </Region>
                            <Region
                                name="button_history"
                                tooltip={t('room.history.button.tooltip')}
                                dynamicStyle="brightness_and_shadow_under"
                                disabled={!canOpenHistory}
                                onPointerTap={onToggleHistory}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 38, width: 35, top: 0, height: 38 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_open_bg.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                                    tint="#44a88d"
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 35 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('shared/roomtools_history_open_icon.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 2, width: 32, top: 3, height: 35 }}
                                />
                            </Region>
                            <Region
                                name="button_history_forward"
                                tooltip={t('room.history.button.forward.tooltip')}
                                dynamicStyle="brightness_and_shadow_under"
                                disabled={!canGoForward}
                                onPointerTap={onGoForward}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 74, width: 34, top: 5, height: 32 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_forward_bg.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                                    tint="#44a88d"
                                    dynamicRole="bg"
                                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 31 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_back_icon.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, zoomX: -1, pivot: 'center', etchingColor: 0x48000000 }}
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 3, width: 30, top: 1, height: 30 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            )}
            <Border
                variant="2"
                tintColor="#3b3933"
                onPointerTap={onToggleCollapsed}
                layout={{ position: 'absolute', left: 0, width: ROOM_TOOLS_SIDE_BAR_WIDTH, top: 0, bottom: 0, flex: 1 }}
            >
                {/*
                  * `arrow_collapse` (x 9) while the column is open, `arrow_expand` (x 11, mirrored)
                  * once it is shut; `RoomToolsToolbarCtrl.updatePosition` centres either on the column's
                  * height, `int(height * 0.5 - arrow.height * 0.5)`.
                  */}
                <ThemeImage
                    src={LayoutImage('shared/roomtools_minimizebutton.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true, ...(collapsed && { zoomX: -1 }) }}
                    dynamicRole={collapsed ? undefined : 'icon'}
                    layout={{ position: 'absolute', left: collapsed ? 11 : 9, top: Math.trunc((height * 0.5) - (ARROW_HEIGHT * 0.5)), width: 6, height: ARROW_HEIGHT }}
                />
            </Border>
        </Box>
    );
};

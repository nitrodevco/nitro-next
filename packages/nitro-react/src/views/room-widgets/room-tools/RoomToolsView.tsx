import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { ROOM_TOOLS_BOTTOM, ROOM_TOOLS_SIDE_BAR_WIDTH, ROOM_TOOLS_WIDTH, ROOM_TOOLS_X } from './roomToolsGeometry';

/** One entry in the tool column, in the order `room_tools_toolbar` stacks them. */
export interface RoomToolsButton {
    key: string;
    icon: string;
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
                                textOptions={{ fill: '#cccccc', fontSize: 11 }}
                                textStyle="u_regular"
                                name="zoom_text"
                                layout={{ position: 'absolute', left: 6, width: 90, top: 4, height: 14, maxWidth: 90 }}
                            />
                            <Region
                                backgroundColor="#707070"
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
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            backgroundColor="#707070"
                            layout={{ position: 'absolute', left: 3, width: 125, top: 26, height: 1 }}
                        />
                        {buttons.map(button => (
                            <Region
                                key={button.key}
                                name={button.key}
                                tooltip={button.tooltipKey ? t(button.tooltipKey) : undefined}
                                dynamicStyle="brightness_and_shadow_under"
                                disabled={button.disabled}
                                onPointerTap={button.onPress}
                                cursor="pointer"
                                layout={{ alignItems: 'center', gap: 4, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    src={button.icon}
                                    dynamicRole="icon"
                                />
                                <ThemeText
                                    text={t(button.labelKey)}
                                    textStyle="u_button_tab"
                                    textOptions={{ fill: '#bbbbbb', fontSize: 11 }}
                                    flashFormat={{ underline: true }}
                                />
                            </Region>
                        ))}
                        <Region
                            name="cnt_history"
                            layout={{ width: 115, height: HISTORY_ROW_HEIGHT, flexShrink: 0 }}
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
                                    tint="#44a88d"
                                    dynamicRole="bg"
                                    layout={{ position: 'absolute', left: 3, width: 34, top: 2, height: 31 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_back_icon.png')}
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
                                    tint="#44a88d"
                                    dynamicRole="icon"
                                    layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 35 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('shared/roomtools_history_open_icon.png')}
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
                                    tint="#44a88d"
                                    dynamicRole="bg"
                                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 31 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/roomtools_history_back_icon.png')}
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
                layout={{ position: 'absolute', left: 0, width: ROOM_TOOLS_SIDE_BAR_WIDTH, top: 0, bottom: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeImage
                    src={LayoutImage('shared/roomtools_minimizebutton.png')}
                    dynamicRole="icon"
                    scaleX={collapsed ? 1 : -1}
                />
            </Border>
        </Box>
    );
};

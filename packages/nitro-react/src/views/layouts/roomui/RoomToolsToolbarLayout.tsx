import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `832_room_tools_toolbar_xml` (layout "room_tools_toolbar", 165x229) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsToolbarLayoutProps {
    captionZoomText?: string;
    itemsItemlistButtons?: ReactNode;
    layout?: BoxLayout;
    onButtonCollapse?: () => void;
    onButtonExpand?: () => void;
    onZoomInBtn?: () => void;
    onZoomOutBtn?: () => void;
    srcArrowCollapse?: string;
    srcArrowExpand?: string;
}

export const RoomToolsToolbarLayout = ({ captionZoomText, itemsItemlistButtons, layout, onButtonCollapse, onButtonExpand, onZoomInBtn, onZoomOutBtn, srcArrowCollapse, srcArrowExpand }: RoomToolsToolbarLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 165, height: 229, ...layout }}>
            <Region
                params={16384}
                layout={{ position: 'absolute', left: -2, width: 165, top: 0, height: 229 }}
            >
                <Border
                    variant="2"
                    name="window_bg"
                    params={8538112}
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 1, width: 164, top: 0, bottom: 0 }}
                >
                    <Region
                        name="itemlist_buttons"
                        params={8536064}
                        layout={{ position: 'absolute', left: 24, top: 6, minWidth: 140, flexDirection: 'column' }}
                    >
                        {itemsItemlistButtons ?? (
                            <>
                                <RoomToolsToolbarLayoutButtonZoomItem />
                                <RoomToolsToolbarLayoutButtonAchievementsItem />
                                <RoomToolsToolbarLayoutButtonSettingsItem />
                                <RoomToolsToolbarLayoutButtonChatHistoryItem />
                                <RoomToolsToolbarLayoutButtonLikeItem />
                                <RoomToolsToolbarLayoutButtonCameraItem />
                                <RoomToolsToolbarLayoutButtonShareItem />
                                <RoomToolsToolbarLayoutCntHistoryItem />
                            </>
                        )}
                        <Region
                            params={16}
                            layout={{ width: 130, height: 30, flexShrink: 0 }}
                        >
                            <Region
                                name="zoom_text"
                                params={16}
                                layout={{ position: 'absolute', left: 6, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionZoomText ?? t('room.zoom.text')}
                                    textOptions={{ fill: '#cccccc' }}
                                />
                            </Region>
                            <Region
                                params={16}
                                backgroundColor="#707070"
                                layout={{ position: 'absolute', left: 3, width: 125, top: 26, height: 1 }}
                            />
                            <Region
                                name="zoom_in_btn"
                                tooltip={t('room.zoom.zoom_in.tooltip')}
                                params={1}
                                dynamicStyle="button"
                                onPointerTap={onZoomInBtn}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 87, width: 18, top: 3, height: 19 }}
                            >
                                <ThemeImage
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('roomtools_zoom_in.png')}
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                />
                            </Region>
                            <Region
                                name="zoom_out_btn"
                                tooltip={t('room.zoom.zoom_out.tooltip')}
                                params={1}
                                dynamicStyle="button"
                                onPointerTap={onZoomOutBtn}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 107, width: 18, top: 3, height: 19 }}
                            >
                                <ThemeImage
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('roomtools_zoom_out.png')}
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="side_bar_collapse"
                    params={16384}
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 172 }}
                >
                    <Region
                        name="button_collapse"
                        params={1}
                        onPointerTap={onButtonCollapse}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 172 }}
                    >
                        <ThemeImage
                            name="arrow_collapse"
                            tags={[ '#icon' ]}
                            params={3145744}
                            src={srcArrowCollapse ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 9, width: 6, top: '50%', marginTop: 13, height: 8 }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="side_bar_expand"
                    params={1064960}
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, bottom: 57, height: 108 }}
                >
                    <Region
                        name="button_expand"
                        params={2049}
                        onPointerTap={onButtonExpand}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            name="arrow_expand"
                            params={3145744}
                            src={srcArrowExpand ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 11, width: 6, top: '50%', marginTop: -4, height: 8 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `button_zoom` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonZoomItemProps {
    captionTextZoom?: string;
    layout?: BoxLayout;
    onButtonZoom?: () => void;
    visibleButtonZoom?: boolean;
}

export const RoomToolsToolbarLayoutButtonZoomItem = ({ captionTextZoom, layout, onButtonZoom, visibleButtonZoom }: RoomToolsToolbarLayoutButtonZoomItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_zoom"
            tooltip={t('toolbar.icon.tooltip.zoom')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            visible={visibleButtonZoom ?? false}
            onPointerTap={onButtonZoom}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_magnifier.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_zoom"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextZoom ?? t('room.zoom.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_achievements` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonAchievementsItemProps {
    captionTextSettings?: string;
    layout?: BoxLayout;
    onButtonAchievements?: () => void;
}

export const RoomToolsToolbarLayoutButtonAchievementsItem = ({ captionTextSettings, layout, onButtonAchievements }: RoomToolsToolbarLayoutButtonAchievementsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_achievements"
            tooltip={t('room.settings.button.tooltip')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonAchievements}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_achievements.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_settings"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextSettings ?? t('room.achievements.button.text')}
                    textOptions={{ fill: '#cccccc' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_settings` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonSettingsItemProps {
    captionTextSettings?: string;
    layout?: BoxLayout;
    onButtonSettings?: () => void;
}

export const RoomToolsToolbarLayoutButtonSettingsItem = ({ captionTextSettings, layout, onButtonSettings }: RoomToolsToolbarLayoutButtonSettingsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_settings"
            tooltip={t('room.settings.button.tooltip')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonSettings}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_gear.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_settings"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextSettings ?? t('room.settings.button.text')}
                    textOptions={{ fill: '#cccccc' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_chat_history` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonChatHistoryItemProps {
    captionTextChatHistory?: string;
    layout?: BoxLayout;
    onButtonChatHistory?: () => void;
}

export const RoomToolsToolbarLayoutButtonChatHistoryItem = ({ captionTextChatHistory, layout, onButtonChatHistory }: RoomToolsToolbarLayoutButtonChatHistoryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_chat_history"
            tooltip={t('chat.history.button.tooltip')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonChatHistory}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_chat_history.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_chat_history"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextChatHistory ?? t('room.chathistory.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_like` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonLikeItemProps {
    captionTextLike?: string;
    layout?: BoxLayout;
    onButtonLike?: () => void;
}

export const RoomToolsToolbarLayoutButtonLikeItem = ({ captionTextLike, layout, onButtonLike }: RoomToolsToolbarLayoutButtonLikeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_like"
            tooltip={t('room.like.button.tooltip')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLike}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_like.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_like"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextLike ?? t('room.like.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_camera` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonCameraItemProps {
    captionTextCamera?: string;
    layout?: BoxLayout;
    onButtonCamera?: () => void;
}

export const RoomToolsToolbarLayoutButtonCameraItem = ({ captionTextCamera, layout, onButtonCamera }: RoomToolsToolbarLayoutButtonCameraItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_camera"
            tooltip={t('room.camera.button.tooltip')}
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonCamera}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('roomtools_camera.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_camera"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextCamera ?? t('room.camera.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `button_share` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonShareItemProps {
    captionTextShare?: string;
    layout?: BoxLayout;
    onButtonShare?: () => void;
}

export const RoomToolsToolbarLayoutButtonShareItem = ({ captionTextShare, layout, onButtonShare }: RoomToolsToolbarLayoutButtonShareItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_share"
            params={131073}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonShare}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }}
            />
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('navigation_icon_weblink.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_share"
                params={16}
                layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextShare ?? t('navigator.embed.caption')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `cnt_history` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutCntHistoryItemProps {
    layout?: BoxLayout;
    onButtonHistory?: () => void;
    onButtonHistoryBack?: () => void;
    onButtonHistoryForward?: () => void;
}

export const RoomToolsToolbarLayoutCntHistoryItem = ({ layout, onButtonHistory, onButtonHistoryBack, onButtonHistoryForward }: RoomToolsToolbarLayoutCntHistoryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cnt_history"
            layout={{ width: 115, height: 43, flexShrink: 0, ...layout }}
        >
            <Region
                name="button_history_back"
                tooltip={t('room.history.button.back.tooltip')}
                params={131073}
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonHistoryBack}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 37, top: 3, height: 34 }}
            >
                <ThemeImage
                    tags={[ '#bg' ]}
                    params={16}
                    src={layoutImage('roomtools_history_forward_bg.png')}
                    tint="#44a88d"
                    layout={{ position: 'absolute', left: 3, width: 34, top: 2, height: 31 }}
                />
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('roomtools_history_back_icon.png')}
                    layout={{ position: 'absolute', left: 4, width: 30, top: 3, height: 30 }}
                />
            </Region>
            <Region
                name="button_history"
                tooltip={t('room.history.button.tooltip')}
                params={131073}
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonHistory}
                cursor="pointer"
                layout={{ position: 'absolute', left: 38, width: 35, top: 0, height: 38 }}
            >
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('roomtools_history_open_bg.png')}
                    tint="#44a88d"
                    layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 35 }}
                />
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('roomtools_history_open_icon.png')}
                    layout={{ position: 'absolute', left: 2, width: 32, top: 3, height: 35 }}
                />
            </Region>
            <Region
                name="button_history_forward"
                tooltip={t('room.history.button.forward.tooltip')}
                params={131073}
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonHistoryForward}
                cursor="pointer"
                layout={{ position: 'absolute', left: 74, width: 34, top: 5, height: 32 }}
            >
                <ThemeImage
                    tags={[ '#bg' ]}
                    params={16}
                    src={layoutImage('roomtools_history_forward_bg.png')}
                    tint="#44a88d"
                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 31 }}
                />
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('roomtools_history_back_icon.png')}
                    layout={{ position: 'absolute', left: 3, width: 30, top: 1, height: 30 }}
                />
            </Region>
        </Region>
    );
};

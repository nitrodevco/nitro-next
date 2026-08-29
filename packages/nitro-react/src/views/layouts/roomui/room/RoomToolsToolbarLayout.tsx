import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `832_room_tools_toolbar_xml` (layout "room_tools_toolbar", 165x229) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsToolbarLayoutProps {
    buttonCollapse?: RoomToolsToolbarLayoutButtonCollapseProps;
    buttonExpand?: RoomToolsToolbarLayoutButtonExpandProps;
    itemlistButtons?: RoomToolsToolbarLayoutItemlistButtonsProps;
    layout?: BoxLayout;
}

export const RoomToolsToolbarLayout = ({ buttonCollapse, buttonExpand, itemlistButtons, layout }: RoomToolsToolbarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 165, height: 229, ...layout }}>
            <Region layout={{ position: 'absolute', left: -2, width: 165, top: 0, height: 229 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 1, width: 164, top: 0, bottom: 0 }}
                >
                    <RoomToolsToolbarLayoutItemlistButtons {...itemlistButtons} />
                </Border>
                <Border
                    variant="2"
                    name="side_bar_collapse"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 172 }}
                >
                    <RoomToolsToolbarLayoutButtonCollapse {...buttonCollapse} />
                </Border>
                <Border
                    variant="2"
                    name="side_bar_expand"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, bottom: 57, height: 108 }}
                >
                    <RoomToolsToolbarLayoutButtonExpand {...buttonExpand} />
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
            dynamicStyle="brightness_and_shadow_under"
            visible={visibleButtonZoom ?? false}
            onPointerTap={onButtonZoom}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
            <ThemeImage
                src={layoutImage('roomtools_magnifier.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_zoom"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonAchievements}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
            <ThemeImage
                src={layoutImage('roomtools_achievements.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_settings"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonSettings}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
            <ThemeImage
                src={layoutImage('roomtools_gear.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_settings"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonChatHistory}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }}
            />
            <ThemeImage
                src={layoutImage('roomtools_chat_history.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            <Region
                name="text_chat_history"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLike}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
            <ThemeImage
                src={layoutImage('roomtools_like.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_like"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonCamera}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }} />
            <ThemeImage
                src={layoutImage('roomtools_camera.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_camera"
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
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonShare}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }} />
            <ThemeImage
                src={layoutImage('navigation_icon_weblink.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            <Region
                name="text_share"
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

/** Named region `button_history_back` of RoomToolsToolbarLayout - configured through the parent's `buttonHistoryBack` prop. */
export interface RoomToolsToolbarLayoutButtonHistoryBackProps {
    layout?: BoxLayout;
    onButtonHistoryBack?: () => void;
}

export const RoomToolsToolbarLayoutButtonHistoryBack = ({ layout, onButtonHistoryBack }: RoomToolsToolbarLayoutButtonHistoryBackProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_history_back"
            tooltip={t('room.history.button.back.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonHistoryBack}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 37, top: 3, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_history_forward_bg.png')}
                tint="#44a88d"
                layout={{ position: 'absolute', left: 3, width: 34, top: 2, height: 31 }}
            />
            <ThemeImage
                src={layoutImage('roomtools_history_back_icon.png')}
                layout={{ position: 'absolute', left: 4, width: 30, top: 3, height: 30 }}
            />
        </Region>
    );
};

/** Named region `button_history` of RoomToolsToolbarLayout - configured through the parent's `buttonHistory` prop. */
export interface RoomToolsToolbarLayoutButtonHistoryProps {
    layout?: BoxLayout;
    onButtonHistory?: () => void;
}

export const RoomToolsToolbarLayoutButtonHistory = ({ layout, onButtonHistory }: RoomToolsToolbarLayoutButtonHistoryProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_history"
            tooltip={t('room.history.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonHistory}
            cursor="pointer"
            layout={{ position: 'absolute', left: 38, width: 35, top: 0, height: 38, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_history_open_bg.png')}
                tint="#44a88d"
                layout={{ position: 'absolute', left: 1, width: 33, top: 1, height: 35 }}
            />
            <ThemeImage
                src={layoutImage('roomtools_history_open_icon.png')}
                layout={{ position: 'absolute', left: 2, width: 32, top: 3, height: 35 }}
            />
        </Region>
    );
};

/** Named region `button_history_forward` of RoomToolsToolbarLayout - configured through the parent's `buttonHistoryForward` prop. */
export interface RoomToolsToolbarLayoutButtonHistoryForwardProps {
    layout?: BoxLayout;
    onButtonHistoryForward?: () => void;
}

export const RoomToolsToolbarLayoutButtonHistoryForward = ({ layout, onButtonHistoryForward }: RoomToolsToolbarLayoutButtonHistoryForwardProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_history_forward"
            tooltip={t('room.history.button.forward.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonHistoryForward}
            cursor="pointer"
            layout={{ position: 'absolute', left: 74, width: 34, top: 5, height: 32, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_history_forward_bg.png')}
                tint="#44a88d"
                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 31 }}
            />
            <ThemeImage
                src={layoutImage('roomtools_history_back_icon.png')}
                layout={{ position: 'absolute', left: 3, width: 30, top: 1, height: 30 }}
            />
        </Region>
    );
};

/** Row template `cnt_history` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutCntHistoryItemProps {
    buttonHistory?: RoomToolsToolbarLayoutButtonHistoryProps;
    buttonHistoryBack?: RoomToolsToolbarLayoutButtonHistoryBackProps;
    buttonHistoryForward?: RoomToolsToolbarLayoutButtonHistoryForwardProps;
    layout?: BoxLayout;
}

export const RoomToolsToolbarLayoutCntHistoryItem = ({ buttonHistory, buttonHistoryBack, buttonHistoryForward, layout }: RoomToolsToolbarLayoutCntHistoryItemProps) => {
    return (
        <Region
            name="cnt_history"
            layout={{ width: 115, height: 43, flexShrink: 0, ...layout }}
        >
            <RoomToolsToolbarLayoutButtonHistoryBack {...buttonHistoryBack} />
            <RoomToolsToolbarLayoutButtonHistory {...buttonHistory} />
            <RoomToolsToolbarLayoutButtonHistoryForward {...buttonHistoryForward} />
        </Region>
    );
};

/** Named region `zoom_in_btn` of RoomToolsToolbarLayout - configured through the parent's `zoomInBtn` prop. */
export interface RoomToolsToolbarLayoutZoomInBtnProps {
    layout?: BoxLayout;
    onZoomInBtn?: () => void;
}

export const RoomToolsToolbarLayoutZoomInBtn = ({ layout, onZoomInBtn }: RoomToolsToolbarLayoutZoomInBtnProps) => {
    const t = useTranslation();

    return (
        <Region
            name="zoom_in_btn"
            tooltip={t('room.zoom.zoom_in.tooltip')}
            dynamicStyle="button"
            onPointerTap={onZoomInBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 87, width: 18, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_zoom_in.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Named region `zoom_out_btn` of RoomToolsToolbarLayout - configured through the parent's `zoomOutBtn` prop. */
export interface RoomToolsToolbarLayoutZoomOutBtnProps {
    layout?: BoxLayout;
    onZoomOutBtn?: () => void;
}

export const RoomToolsToolbarLayoutZoomOutBtn = ({ layout, onZoomOutBtn }: RoomToolsToolbarLayoutZoomOutBtnProps) => {
    const t = useTranslation();

    return (
        <Region
            name="zoom_out_btn"
            tooltip={t('room.zoom.zoom_out.tooltip')}
            dynamicStyle="button"
            onPointerTap={onZoomOutBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 107, width: 18, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_zoom_out.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Named region `itemlist_buttons` of RoomToolsToolbarLayout - configured through the parent's `itemlistButtons` prop. */
export interface RoomToolsToolbarLayoutItemlistButtonsProps {
    captionZoomText?: string;
    itemsItemlistButtons?: ReactNode;
    layout?: BoxLayout;
    zoomInBtn?: RoomToolsToolbarLayoutZoomInBtnProps;
    zoomOutBtn?: RoomToolsToolbarLayoutZoomOutBtnProps;
}

export const RoomToolsToolbarLayoutItemlistButtons = ({ captionZoomText, itemsItemlistButtons, layout, zoomInBtn, zoomOutBtn }: RoomToolsToolbarLayoutItemlistButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="itemlist_buttons"
            layout={{ position: 'absolute', left: 24, top: 6, minWidth: 140, flexDirection: 'column', ...layout }}
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
            <Region layout={{ width: 130, height: 30, flexShrink: 0 }}>
                <Region
                    name="zoom_text"
                    layout={{ position: 'absolute', left: 6, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionZoomText ?? t('room.zoom.text')}
                        textOptions={{ fill: '#cccccc' }}
                    />
                </Region>
                <Region
                    backgroundColor="#707070"
                    layout={{ position: 'absolute', left: 3, width: 125, top: 26, height: 1 }}
                />
                <RoomToolsToolbarLayoutZoomInBtn {...zoomInBtn} />
                <RoomToolsToolbarLayoutZoomOutBtn {...zoomOutBtn} />
            </Region>
        </Region>
    );
};

/** Named region `button_collapse` of RoomToolsToolbarLayout - configured through the parent's `buttonCollapse` prop. */
export interface RoomToolsToolbarLayoutButtonCollapseProps {
    layout?: BoxLayout;
    onButtonCollapse?: () => void;
    srcArrowCollapse?: string;
}

export const RoomToolsToolbarLayoutButtonCollapse = ({ layout, onButtonCollapse, srcArrowCollapse }: RoomToolsToolbarLayoutButtonCollapseProps) => {
    return (
        <Region
            name="button_collapse"
            onPointerTap={onButtonCollapse}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 172, ...layout }}
        >
            <ThemeImage
                name="arrow_collapse"
                src={srcArrowCollapse ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', left: 9, width: 6, alignSelf: 'center', marginTop: 17, marginBottom: -17, height: 8 }}
            />
        </Region>
    );
};

/** Named region `button_expand` of RoomToolsToolbarLayout - configured through the parent's `buttonExpand` prop. */
export interface RoomToolsToolbarLayoutButtonExpandProps {
    layout?: BoxLayout;
    onButtonExpand?: () => void;
    srcArrowExpand?: string;
}

export const RoomToolsToolbarLayoutButtonExpand = ({ layout, onButtonExpand, srcArrowExpand }: RoomToolsToolbarLayoutButtonExpandProps) => {
    return (
        <Region
            name="button_expand"
            onPointerTap={onButtonExpand}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 19, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="arrow_expand"
                src={srcArrowExpand ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', left: 11, width: 6, alignSelf: 'center', height: 8 }}
            />
        </Region>
    );
};

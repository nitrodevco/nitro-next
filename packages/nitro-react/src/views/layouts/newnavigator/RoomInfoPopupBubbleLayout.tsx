import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `141_room_info_popup_bubble_xml` (layout "room_info_popup_bubble", 374x350) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomInfoPopupBubbleLayoutProps {
    layout?: BoxLayout;
    mainContent?: RoomInfoPopupBubbleLayoutMainContentProps;
}

export const RoomInfoPopupBubbleLayout = ({ layout, mainContent }: RoomInfoPopupBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 374, height: 350, ...layout }}>
            <Bubble
                variant="7"
                pointer="left"
                layout={{ position: 'absolute', left: 0, width: 374, top: 0, height: 350 }}
            >
                <RoomInfoPopupBubbleLayoutMainContent {...mainContent} />
            </Bubble>
        </Region>
    );
};

/** Row template `room_thumbnail_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomThumbnailContainerItemProps {
    layout?: BoxLayout;
    srcRoomThumbnail?: string;
}

export const RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem = ({ layout, srcRoomThumbnail }: RoomInfoPopupBubbleLayoutRoomThumbnailContainerItemProps) => {
    return (
        <Region
            name="room_thumbnail_container"
            backgroundColor="#000000"
            layout={{ width: 112, height: 112, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="room_thumbnail"
                src={srcRoomThumbnail ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="room_group_badge"
                options={{ 'badge_image:type': 'group', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
            />
        </Region>
    );
};

/** Row template `room_name_desc_owner_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItemProps {
    captionRoomDesc?: string;
    captionRoomName?: string;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem = ({ captionRoomDesc, captionRoomName, layout }: RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItemProps) => {
    return (
        <Region
            name="room_name_desc_owner_container"
            layout={{ width: 219, height: 112, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 6, width: 214, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomName ?? 'ROOM NAME PLACEHOLDER LOREM IPSUM DOLOR SIT AMET'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                />
            </Region>
            <Region
                name="room_desc"
                layout={{ position: 'absolute', left: 5, width: 214, top: 33, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomDesc ?? 'ROOM DESC PLACEHOLDER LOREM IPSUM DOLOR SIT AMET'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `header_top` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutHeaderTopItemProps {
    itemsHeaderTop?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutHeaderTopItem = ({ itemsHeaderTop, layout }: RoomInfoPopupBubbleLayoutHeaderTopItemProps) => {
    return (
        <Region
            name="header_top"
            layout={{ width: 329, height: 112, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsHeaderTop ?? (
                <>
                    <RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem />
                    <RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `header_content` of RoomInfoPopupBubbleLayout - configured through the parent's `headerContent` prop. */
export interface RoomInfoPopupBubbleLayoutHeaderContentProps {
    itemsHeaderContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutHeaderContent = ({ itemsHeaderContent, layout }: RoomInfoPopupBubbleLayoutHeaderContentProps) => {
    return (
        <Region
            name="header_content"
            layout={{ position: 'absolute', left: 7, width: 331, top: 6, height: 112, flexDirection: 'column', gap: 7, ...layout }}
        >
            {itemsHeaderContent ?? (
                <RoomInfoPopupBubbleLayoutHeaderTopItem />
            )}
        </Region>
    );
};

/** Row template `header` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutHeaderItemProps {
    headerContent?: RoomInfoPopupBubbleLayoutHeaderContentProps;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutHeaderItem = ({ headerContent, layout }: RoomInfoPopupBubbleLayoutHeaderItemProps) => {
    return (
        <Border
            variant="2"
            name="header"
            layout={{ width: 345, height: 125, flexShrink: 0, minHeight: 125, maxHeight: 125, ...layout }}
        >
            <RoomInfoPopupBubbleLayoutHeaderContent {...headerContent} />
        </Border>
    );
};

/** Row template `room_group_owner_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItemProps {
    captionGroupName?: string;
    captionOwnerName?: string;
    layout?: BoxLayout;
    onRoomGroupRegion?: () => void;
    onRoomOwnerRegion?: () => void;
}

export const RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem = ({ captionGroupName, captionOwnerName, layout, onRoomGroupRegion, onRoomOwnerRegion }: RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_group_owner_container"
            layout={{ width: 344, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_group_region"
                tooltip={t('navigator.tooltip.groupinfo.owner')}
                onPointerTap={onRoomGroupRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 175, width: 170, top: 3, height: 30 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_icon_group.png')}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                />
                <Region
                    name="group_name"
                    layout={{ position: 'absolute', left: 20, width: 170, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGroupName ?? 'The Bubblers'}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                    />
                </Region>
            </Region>
            <Region
                name="room_owner_region"
                tooltip={t('navigator.tooltip.roominfo.owner')}
                onPointerTap={onRoomOwnerRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 150, top: 3, height: 30 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_friendlist_eye.png')}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                />
                <Region
                    name="owner_name"
                    layout={{ position: 'absolute', left: 20, width: 130, top: -2, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOwnerName ?? 'Macklebee'}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `settings_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutSettingsContainerItemProps {
    layout?: BoxLayout;
    onSettingsRegion?: () => void;
    srcSettingsIcon?: string;
}

export const RoomInfoPopupBubbleLayoutSettingsContainerItem = ({ layout, onSettingsRegion, srcSettingsIcon }: RoomInfoPopupBubbleLayoutSettingsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings_container"
            layout={{ width: 170, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="settings_region"
                onPointerTap={onSettingsRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            >
                <ThemeImage
                    name="settings_icon"
                    src={srcSettingsIcon ?? layoutImage('newnavigator_room_settings_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 235, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('navigator.room.popup.info.room.settings')} />
            </Region>
        </Region>
    );
};

/** Row template `report_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutReportContainerItemProps {
    layout?: BoxLayout;
    onReportRegion?: () => void;
    srcReportIcon?: string;
}

export const RoomInfoPopupBubbleLayoutReportContainerItem = ({ layout, onReportRegion, srcReportIcon }: RoomInfoPopupBubbleLayoutReportContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="report_container"
            layout={{ width: 170, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="report_region"
                onPointerTap={onReportRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            >
                <ThemeImage
                    name="report_icon"
                    src={srcReportIcon ?? layoutImage('newnavigator_report_room.png')}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 202, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('navigator.room.popup.report.room')} />
            </Region>
        </Region>
    );
};

/** Named region `midBottom_itemlist` of RoomInfoPopupBubbleLayout - configured through the parent's `midBottomItemlist` prop. */
export interface RoomInfoPopupBubbleLayoutMidBottomItemlistProps {
    itemsMidBottomItemlist?: ReactNode;
    layout?: BoxLayout;
    onFavoriteRegion?: () => void;
    onHomeRegion?: () => void;
    srcFavoriteIcon?: string;
    srcHomeIcon?: string;
}

export const RoomInfoPopupBubbleLayoutMidBottomItemlist = ({ itemsMidBottomItemlist, layout, onFavoriteRegion, onHomeRegion, srcFavoriteIcon, srcHomeIcon }: RoomInfoPopupBubbleLayoutMidBottomItemlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="midBottom_itemlist"
            layout={{ position: 'absolute', left: 12, width: 170, top: 0, height: 80, flexDirection: 'column', ...layout }}
        >
            {itemsMidBottomItemlist ?? (
                <>
                    <RoomInfoPopupBubbleLayoutSettingsContainerItem />
                    <RoomInfoPopupBubbleLayoutReportContainerItem />
                </>
            )}
            <Region layout={{ width: 170, height: 20, flexShrink: 0 }}>
                <Region
                    name="favorite_region"
                    onPointerTap={onFavoriteRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ThemeImage
                        name="favorite_icon"
                        src={srcFavoriteIcon ?? layoutImage('newnavigator_icon_fav_no.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 20, width: 236, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('navigator.room.popup.room.info.favorite')} />
                </Region>
            </Region>
            <Region layout={{ width: 170, height: 20, flexShrink: 0 }}>
                <Region
                    name="home_region"
                    onPointerTap={onHomeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ThemeImage
                        name="home_icon"
                        src={srcHomeIcon ?? layoutImage('newnavigator_icon_home_no.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 20, width: 224, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('navigator.room.popup.room.info.home')} />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `midBottom` of RoomInfoPopupBubbleLayout - configured through the parent's `midBottom` prop. */
export interface RoomInfoPopupBubbleLayoutMidBottomProps {
    layout?: BoxLayout;
    midBottomItemlist?: RoomInfoPopupBubbleLayoutMidBottomItemlistProps;
}

export const RoomInfoPopupBubbleLayoutMidBottom = ({ layout, midBottomItemlist }: RoomInfoPopupBubbleLayoutMidBottomProps) => {
    return (
        <Region
            name="midBottom"
            layout={{ position: 'absolute', left: 166, width: 170, top: 0, height: 80, ...layout }}
        >
            <RoomInfoPopupBubbleLayoutMidBottomItemlist {...midBottomItemlist} />
        </Region>
    );
};

/** Row template `newMid` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutNewMidItemProps {
    layout?: BoxLayout;
    midBottom?: RoomInfoPopupBubbleLayoutMidBottomProps;
}

export const RoomInfoPopupBubbleLayoutNewMidItem = ({ layout, midBottom }: RoomInfoPopupBubbleLayoutNewMidItemProps) => {
    return (
        <Region
            name="newMid"
            layout={{ width: 344, height: 80, flexShrink: 0, ...layout }}
        >
            <Region
                name="mid"
                layout={{ position: 'absolute', left: 0, width: 174, top: 0, height: 65 }}
            >
                <Region
                    name="properties"
                    layout={{ position: 'absolute', left: 0, width: 263, top: 0, height: 65, flexDirection: 'column' }}
                />
            </Region>
            <RoomInfoPopupBubbleLayoutMidBottom {...midBottom} />
        </Region>
    );
};

/** Row template `tag_and_group_info` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutTagAndGroupInfoItemProps {
    layout?: BoxLayout;
    srcGroupModeAdmin?: string;
    srcGroupModeFurnish?: string;
    srcGroupModeSize?: string;
}

export const RoomInfoPopupBubbleLayoutTagAndGroupInfoItem = ({ layout, srcGroupModeAdmin, srcGroupModeFurnish, srcGroupModeSize }: RoomInfoPopupBubbleLayoutTagAndGroupInfoItemProps) => {
    return (
        <Region
            name="tag_and_group_info"
            layout={{ width: 345, height: 23, flexShrink: 0, ...layout }}
        >
            <Region
                name="tag_list"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
            />
            <ThemeImage
                name="group_mode_furnish"
                src={srcGroupModeFurnish}
                layout={{ position: 'absolute', left: 318, width: 18, top: 0, height: 16 }}
            />
            <ThemeImage
                name="group_mode_admin"
                src={srcGroupModeAdmin}
                layout={{ position: 'absolute', left: 279, width: 18, top: 0, height: 16 }}
            />
            <ThemeImage
                name="group_mode_size"
                src={srcGroupModeSize}
                layout={{ position: 'absolute', left: 299, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `event_info` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutEventInfoItemProps {
    captionEventDesc?: string;
    captionEventName?: string;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutEventInfoItem = ({ captionEventDesc, captionEventName, layout }: RoomInfoPopupBubbleLayoutEventInfoItemProps) => {
    return (
        <Border
            variant="3"
            name="event_info"
            tintColor="#f1a700"
            blend={0.7}
            layout={{ width: 331, height: 55, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_event_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 42, top: 9, height: 40 }}
            />
            <Region
                name="event_name"
                layout={{ position: 'absolute', left: 54, width: 275, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventName ?? 'EVENT NAME LOREM IPSUM DOLOR SIT AMET'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="event_desc"
                layout={{ position: 'absolute', left: 54, width: 275, top: 19, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEventDesc ?? 'EVENT DESCRIPTION LOREM IPSUM DOLOR SIT AMET'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 275 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `bottom_itemlist` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutBottomItemlistItemProps {
    itemsBottomItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutBottomItemlistItem = ({ itemsBottomItemlist, layout }: RoomInfoPopupBubbleLayoutBottomItemlistItemProps) => {
    return (
        <Region
            name="bottom_itemlist"
            layout={{ width: 345, height: 80, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsBottomItemlist ?? (
                <>
                    <RoomInfoPopupBubbleLayoutTagAndGroupInfoItem />
                    <RoomInfoPopupBubbleLayoutEventInfoItem />
                </>
            )}
        </Region>
    );
};

/** Named region `main_content` of RoomInfoPopupBubbleLayout - configured through the parent's `mainContent` prop. */
export interface RoomInfoPopupBubbleLayoutMainContentProps {
    itemsMainContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutMainContent = ({ itemsMainContent, layout }: RoomInfoPopupBubbleLayoutMainContentProps) => {
    return (
        <Region
            name="main_content"
            layout={{ position: 'absolute', left: 11, width: 345, top: -21, height: 324, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsMainContent ?? (
                <>
                    <RoomInfoPopupBubbleLayoutHeaderItem />
                    <RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem />
                    <RoomInfoPopupBubbleLayoutNewMidItem />
                    <RoomInfoPopupBubbleLayoutBottomItemlistItem />
                </>
            )}
        </Region>
    );
};

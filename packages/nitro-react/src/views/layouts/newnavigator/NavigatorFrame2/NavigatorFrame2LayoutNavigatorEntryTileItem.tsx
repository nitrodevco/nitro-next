import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutRoomUsercountIconItem } from './NavigatorFrame2LayoutRoomUsercountIconItem';
import { NavigatorFrame2LayoutRoomUsercountItem } from './NavigatorFrame2LayoutRoomUsercountItem';

/** Row template `navigator_entry_tile` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileItemProps {
    captionRoomName?: string;
    goToRoomRegion?: ReactNode;
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    onInfoPopupClickRegion?: () => void;
    roomGroupBadge?: ReactNode;
    srcDoormodeIcon?: string;
    srcRoomPicPlaceholder?: string;
    visibleDoormodeIcon?: boolean;
    visibleGoToRoomRegion?: boolean;
    visibleInfoPopupClickRegion?: boolean;
    visibleRoomGroupBadge?: boolean;
    visibleRoomInfoUsercountBorder?: boolean;
    visibleRoomName?: boolean;
    visibleRoomPicPlaceholder?: boolean;
    visibleUsercount?: boolean;
}

export const NavigatorFrame2LayoutNavigatorEntryTileItem = ({ captionRoomName, goToRoomRegion, itemsUsercount, layout, onGoToRoomRegion, onInfoPopupClickRegion, roomGroupBadge, srcDoormodeIcon, srcRoomPicPlaceholder, visibleDoormodeIcon, visibleGoToRoomRegion, visibleInfoPopupClickRegion, visibleRoomGroupBadge, visibleRoomInfoUsercountBorder, visibleRoomName, visibleRoomPicPlaceholder, visibleUsercount }: NavigatorFrame2LayoutNavigatorEntryTileItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="10"
            name="navigator_entry_tile"
            tintColor="#ebe9df"
            layout={{ width: 122, height: 146, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, width: 108, top: 6, height: 109 }}
            />
            {(visibleRoomPicPlaceholder ?? true) && (
                <ThemeImage
                    name="room_pic_placeholder"
                    src={srcRoomPicPlaceholder ?? layoutImage('newnavigator_default_room.png')}
                    layout={{ position: 'absolute', left: 8, width: 106, top: 7, height: 106 }}
                />
            )}
            {(visibleRoomGroupBadge ?? false) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="room_group_badge"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 4, width: 50, top: -3, height: 61 }}
                >
                    {roomGroupBadge}
                </WidgetSlot>
            )}
            {(visibleGoToRoomRegion ?? true) && (
                <Region
                    name="go_to_room_region"
                    tooltip={t('navigator.tooltip.go.to.room')}
                    onPointerTap={onGoToRoomRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {goToRoomRegion}
                </Region>
            )}
            {(visibleRoomName ?? true) && (
                <ThemeText
                    text={captionRoomName ?? 'Room Name PH'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 100 }}
                    name="room_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 100, top: 116, height: 30 }}
                />
            )}
            {(visibleRoomInfoUsercountBorder ?? true) && (
                <Border
                    variant="3"
                    name="room_info_usercount_border"
                    tintColor="#000000"
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, bottom: 35, height: 18, justifyContent: 'center' }}
                >
                    {(visibleUsercount ?? true) && (
                        <Region
                            name="usercount"
                            layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                        >
                            {itemsUsercount ?? (
                                <>
                                    <NavigatorFrame2LayoutRoomUsercountIconItem />
                                    <NavigatorFrame2LayoutRoomUsercountItem />
                                </>
                            )}
                        </Region>
                    )}
                </Border>
            )}
            {(visibleDoormodeIcon ?? true) && (
                <ThemeImage
                    name="doormode_icon"
                    src={srcDoormodeIcon}
                    layout={{ position: 'absolute', left: 92, width: 16, top: 96, height: 14 }}
                />
            )}
            {(visibleInfoPopupClickRegion ?? true) && (
                <Region
                    name="info_popup_click_region"
                    onPointerTap={onInfoPopupClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 98, width: 18, top: 120, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_button_show_room_info.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                </Region>
            )}
        </Border>
    );
};

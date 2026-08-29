import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `room_thumbnail_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutRoomThumbnailContainerItemProps {
    layout?: BoxLayout;
    roomGroupBadge?: ReactNode;
    srcRoomThumbnail?: string;
    visibleRoomGroupBadge?: boolean;
    visibleRoomThumbnail?: boolean;
}

export const RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem = ({ layout, roomGroupBadge, srcRoomThumbnail, visibleRoomGroupBadge, visibleRoomThumbnail }: RoomInfoPopupBubbleLayoutRoomThumbnailContainerItemProps) => {
    return (
        <Region
            name="room_thumbnail_container"
            backgroundColor="#000000"
            layout={{ width: 112, height: 112, flexShrink: 0, ...layout }}
        >
            {(visibleRoomThumbnail ?? true) && (
                <ThemeImage
                    name="room_thumbnail"
                    src={srcRoomThumbnail ?? layoutImage('newnavigator_default_room.png')}
                    layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                />
            )}
            {(visibleRoomGroupBadge ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="room_group_badge"
                    options={{ 'badge_image:type': 'group', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                >
                    {roomGroupBadge}
                </WidgetSlot>
            )}
        </Region>
    );
};

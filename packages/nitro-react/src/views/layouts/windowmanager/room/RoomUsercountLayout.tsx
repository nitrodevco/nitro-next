import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2481_room_usercount_xml` (layout "room_info_usercount", 40x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomUsercountLayoutProps {
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
}

export const RoomUsercountLayout = ({ itemsUsercount, layout }: RoomUsercountLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 18, ...layout }}>
            <Border
                variant="3"
                name="room_info_usercount_border"
                tintColor="#000000"
                layout={{ position: 'absolute', width: 40, bottom: 0, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="usercount"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsUsercount ?? (
                        <>
                            <RoomUsercountLayoutRoomUsercountIconItem />
                            <RoomUsercountLayoutRoomUsercountItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `room_usercount_icon` of RoomUsercountLayout - pass real rows through its `items…` slot. */
export interface RoomUsercountLayoutRoomUsercountIconItemProps {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
}

export const RoomUsercountLayoutRoomUsercountIconItem = ({ layout, srcRoomUsercountIcon }: RoomUsercountLayoutRoomUsercountIconItemProps) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `room_usercount` of RoomUsercountLayout - pass real rows through its `items…` slot. */
export interface RoomUsercountLayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const RoomUsercountLayoutRoomUsercountItem = ({ captionRoomUsercount, layout }: RoomUsercountLayoutRoomUsercountItemProps) => {
    return (
        <Region
            name="room_usercount"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomUsercount ?? '99'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

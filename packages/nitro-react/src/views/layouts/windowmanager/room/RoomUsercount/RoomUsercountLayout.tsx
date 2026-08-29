import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { RoomUsercountLayoutRoomUsercountIconItem } from './RoomUsercountLayoutRoomUsercountIconItem';
import { RoomUsercountLayoutRoomUsercountItem } from './RoomUsercountLayoutRoomUsercountItem';

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

import { BoxLayout, Region } from '#base/theme';

import { RoomDesktopLayoutLayoutRoomDesktopLayout, RoomDesktopLayoutLayoutRoomDesktopLayoutProps } from './RoomDesktopLayoutLayoutRoomDesktopLayout';

/** Generated from `1085_room_desktop_layout_xml` (layout "room_desktop_layout", 1348x641) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomDesktopLayoutLayoutProps {
    layout?: BoxLayout;
    roomDesktopLayout?: RoomDesktopLayoutLayoutRoomDesktopLayoutProps;
}

export const RoomDesktopLayoutLayout = ({ layout, roomDesktopLayout }: RoomDesktopLayoutLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1348, height: 641, ...layout }}>
            <RoomDesktopLayoutLayoutRoomDesktopLayout {...roomDesktopLayout} />
        </Region>
    );
};

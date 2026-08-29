import { BoxLayout, Region } from '#base/theme';

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

/** Named region `room_desktop_layout` of RoomDesktopLayoutLayout - configured through the parent's `roomDesktopLayout` prop. */
export interface RoomDesktopLayoutLayoutRoomDesktopLayoutProps {
    layout?: BoxLayout;
}

export const RoomDesktopLayoutLayoutRoomDesktopLayout = ({ layout }: RoomDesktopLayoutLayoutRoomDesktopLayoutProps) => {
    return (
        <Region
            name="room_desktop_layout"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="container_0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="background_widgets"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="container_new_chat"
                layout={{ position: 'absolute', left: 0, width: 960, top: 0, height: 300 }}
            />
            <Region
                name="container_2"
                layout={{ position: 'absolute', right: 5, width: 200, bottom: 10, height: 300 }}
            />
            <Region
                name="container_3"
                layout={{ position: 'absolute', right: 0, width: 840, bottom: 0, height: 70 }}
            />
            <Region
                name="container_4"
                layout={{ position: 'absolute', left: -500, width: 170, bottom: 11, height: 260 }}
            />
            <Region
                name="container_5"
                layout={{ position: 'absolute', left: 100, width: 300, top: 0, height: 300 }}
            />
        </Region>
    );
};

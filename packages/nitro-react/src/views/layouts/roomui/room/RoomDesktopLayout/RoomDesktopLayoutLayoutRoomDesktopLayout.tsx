import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Named region `room_desktop_layout` of RoomDesktopLayoutLayout - configured through the parent's `roomDesktopLayout` prop. */
export interface RoomDesktopLayoutLayoutRoomDesktopLayoutProps {
    backgroundWidgets?: ReactNode;
    container0?: ReactNode;
    container2?: ReactNode;
    container3?: ReactNode;
    container4?: ReactNode;
    container5?: ReactNode;
    containerNewChat?: ReactNode;
    layout?: BoxLayout;
}

export const RoomDesktopLayoutLayoutRoomDesktopLayout = ({ backgroundWidgets, container0, container2, container3, container4, container5, containerNewChat, layout }: RoomDesktopLayoutLayoutRoomDesktopLayoutProps) => {
    return (
        <Region
            name="room_desktop_layout"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="container_0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {container0}
            </Region>
            <Region
                name="background_widgets"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {backgroundWidgets}
            </Region>
            <Region
                name="container_new_chat"
                layout={{ position: 'absolute', left: 0, width: 960, top: 0, height: 300 }}
            >
                {containerNewChat}
            </Region>
            <Region
                name="container_2"
                layout={{ position: 'absolute', right: 5, width: 200, bottom: 10, height: 300 }}
            >
                {container2}
            </Region>
            <Region
                name="container_3"
                layout={{ position: 'absolute', right: 0, width: 840, bottom: 0, height: 70 }}
            >
                {container3}
            </Region>
            <Region
                name="container_4"
                layout={{ position: 'absolute', left: -500, width: 170, bottom: 11, height: 260 }}
            >
                {container4}
            </Region>
            <Region
                name="container_5"
                layout={{ position: 'absolute', left: 100, width: 300, top: 0, height: 300 }}
            >
                {container5}
            </Region>
        </Region>
    );
};

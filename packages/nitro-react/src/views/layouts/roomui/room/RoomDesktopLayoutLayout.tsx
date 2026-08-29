import { BoxLayout, Region } from '#base/theme';

/** Generated from `1085_room_desktop_layout_xml` (layout "room_desktop_layout", 1348x641) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomDesktopLayoutLayoutProps {
    layout?: BoxLayout;
    roomDesktopLayout?: RoomDesktopLayoutLayoutRoomDesktopLayoutProps;
}

export const RoomDesktopLayoutLayout = ({ layout, roomDesktopLayout }: RoomDesktopLayoutLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1348, height: 641, ...layout }}>
            <RoomDesktopLayoutLayoutRoomDesktopLayout
                tags={[ 'room_desktop_layout_container' ]}
                {...roomDesktopLayout}
            />
        </Region>
    );
};

/** Named region `container_0` of RoomDesktopLayoutLayout - configured through the parent's `container0` prop. */
export interface RoomDesktopLayoutLayoutContainer0Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainer0 = ({ layout, tags }: RoomDesktopLayoutLayoutContainer0Props) => {
    return (
        <Region
            name="container_0"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `background_widgets` of RoomDesktopLayoutLayout - configured through the parent's `backgroundWidgets` prop. */
export interface RoomDesktopLayoutLayoutBackgroundWidgetsProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutBackgroundWidgets = ({ layout, tags }: RoomDesktopLayoutLayoutBackgroundWidgetsProps) => {
    return (
        <Region
            name="background_widgets"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `container_new_chat` of RoomDesktopLayoutLayout - configured through the parent's `containerNewChat` prop. */
export interface RoomDesktopLayoutLayoutContainerNewChatProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainerNewChat = ({ layout, tags }: RoomDesktopLayoutLayoutContainerNewChatProps) => {
    return (
        <Region
            name="container_new_chat"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 960, top: 0, height: 300, ...layout }}
        />
    );
};

/** Named region `container_2` of RoomDesktopLayoutLayout - configured through the parent's `container2` prop. */
export interface RoomDesktopLayoutLayoutContainer2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainer2 = ({ layout, tags }: RoomDesktopLayoutLayoutContainer2Props) => {
    return (
        <Region
            name="container_2"
            tags={tags}
            layout={{ position: 'absolute', right: 5, width: 200, bottom: 10, height: 300, ...layout }}
        />
    );
};

/** Named region `container_3` of RoomDesktopLayoutLayout - configured through the parent's `container3` prop. */
export interface RoomDesktopLayoutLayoutContainer3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainer3 = ({ layout, tags }: RoomDesktopLayoutLayoutContainer3Props) => {
    return (
        <Region
            name="container_3"
            tags={tags}
            layout={{ position: 'absolute', right: 0, width: 840, bottom: 0, height: 70, ...layout }}
        />
    );
};

/** Named region `container_4` of RoomDesktopLayoutLayout - configured through the parent's `container4` prop. */
export interface RoomDesktopLayoutLayoutContainer4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainer4 = ({ layout, tags }: RoomDesktopLayoutLayoutContainer4Props) => {
    return (
        <Region
            name="container_4"
            tags={tags}
            layout={{ position: 'absolute', left: -500, width: 170, bottom: 11, height: 260, ...layout }}
        />
    );
};

/** Named region `container_5` of RoomDesktopLayoutLayout - configured through the parent's `container5` prop. */
export interface RoomDesktopLayoutLayoutContainer5Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutContainer5 = ({ layout, tags }: RoomDesktopLayoutLayoutContainer5Props) => {
    return (
        <Region
            name="container_5"
            tags={tags}
            layout={{ position: 'absolute', left: 100, width: 300, top: 0, height: 300, ...layout }}
        />
    );
};

/** Named region `room_desktop_layout` of RoomDesktopLayoutLayout - configured through the parent's `roomDesktopLayout` prop. */
export interface RoomDesktopLayoutLayoutRoomDesktopLayoutProps {
    backgroundWidgets?: RoomDesktopLayoutLayoutBackgroundWidgetsProps;
    container0?: RoomDesktopLayoutLayoutContainer0Props;
    container2?: RoomDesktopLayoutLayoutContainer2Props;
    container3?: RoomDesktopLayoutLayoutContainer3Props;
    container4?: RoomDesktopLayoutLayoutContainer4Props;
    container5?: RoomDesktopLayoutLayoutContainer5Props;
    containerNewChat?: RoomDesktopLayoutLayoutContainerNewChatProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const RoomDesktopLayoutLayoutRoomDesktopLayout = ({ backgroundWidgets, container0, container2, container3, container4, container5, containerNewChat, layout, tags }: RoomDesktopLayoutLayoutRoomDesktopLayoutProps) => {
    return (
        <Region
            name="room_desktop_layout"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <RoomDesktopLayoutLayoutContainer0
                tags={[ 'room_view' ]}
                {...container0}
            />
            <RoomDesktopLayoutLayoutBackgroundWidgets {...backgroundWidgets} />
            <RoomDesktopLayoutLayoutContainerNewChat
                tags={[ 'room_new_chat' ]}
                {...containerNewChat}
            />
            <RoomDesktopLayoutLayoutContainer2
                tags={[ 'room_widget_infostand' ]}
                {...container2}
            />
            <RoomDesktopLayoutLayoutContainer3
                tags={[ 'room_widget_toolbar' ]}
                {...container3}
            />
            <RoomDesktopLayoutLayoutContainer4
                tags={[ 'room_widget_me_menu' ]}
                {...container4}
            />
            <RoomDesktopLayoutLayoutContainer5
                tags={[ 'room_widget_doorbell' ]}
                {...container5}
            />
        </Region>
    );
};

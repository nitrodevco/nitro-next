import { BoxLayout, Region } from '#base/theme';

/** Generated from `1085_room_desktop_layout_xml` (layout "room_desktop_layout", 1348x641) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomDesktopLayoutLayoutProps {
    layout?: BoxLayout;
}

export const RoomDesktopLayoutLayout = ({ layout }: RoomDesktopLayoutLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1348, height: 641, ...layout }}>
            <Region
                name="room_desktop_layout"
                tags={[ 'room_desktop_layout_container' ]}
                params={2192}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="container_0"
                    tags={[ 'room_view' ]}
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="background_widgets"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="container_new_chat"
                    tags={[ 'room_new_chat' ]}
                    params={131072}
                    layout={{ position: 'absolute', left: 0, width: 960, top: 0, height: 300 }}
                />
                <Region
                    name="container_2"
                    tags={[ 'room_widget_infostand' ]}
                    params={1442896}
                    layout={{ position: 'absolute', right: 5, width: 200, bottom: 10, height: 300 }}
                />
                <Region
                    name="container_3"
                    tags={[ 'room_widget_toolbar' ]}
                    params={1442896}
                    layout={{ position: 'absolute', right: 0, width: 840, bottom: 0, height: 70 }}
                />
                <Region
                    name="container_4"
                    tags={[ 'room_widget_me_menu' ]}
                    params={1180688}
                    layout={{ position: 'absolute', left: -500, width: 170, bottom: 11, height: 260 }}
                />
                <Region
                    name="container_5"
                    tags={[ 'room_widget_doorbell' ]}
                    params={131088}
                    layout={{ position: 'absolute', left: 100, width: 300, top: 0, height: 300 }}
                />
            </Region>
        </Region>
    );
};

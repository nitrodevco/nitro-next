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
                layout={{ position: 'absolute', left: 0, width: 1348, top: 0, height: 641 }}
            >
                <Region
                    name="container_0"
                    tags={[ 'room_view' ]}
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 1348, top: 0, height: 641 }}
                />
                <Region
                    name="background_widgets"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 1348, top: 0, height: 641 }}
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
                    layout={{ position: 'absolute', left: 1143, width: 200, top: 331, height: 300 }}
                />
                <Region
                    name="container_3"
                    tags={[ 'room_widget_toolbar' ]}
                    params={1442896}
                    layout={{ position: 'absolute', left: 508, width: 840, top: 571, height: 70 }}
                />
                <Region
                    name="container_4"
                    tags={[ 'room_widget_me_menu' ]}
                    params={1180688}
                    layout={{ position: 'absolute', left: -500, width: 170, top: 370, height: 260 }}
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

import { BoxLayout, Region } from '#base/theme';

/** Generated from `967_room_view_container_xml` (layout "room_view_container", 160x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomViewContainerLayoutProps {
    layout?: BoxLayout;
    visibleBackgroundWrapper?: boolean;
}

export const RoomViewContainerLayout = ({ layout, visibleBackgroundWrapper }: RoomViewContainerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 160, height: 100, ...layout }}>
            <Region
                name="room_view_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleBackgroundWrapper ?? false) && (
                    <Region
                        name="background_wrapper"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
                <Region
                    name="room_canvas_wrapper"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="colorizer_wrapper"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};

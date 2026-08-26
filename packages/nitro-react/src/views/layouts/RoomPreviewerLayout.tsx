import { BoxLayout, Region } from '#base/theme';

/** Generated from `2457_room_previewer_xml` (layout "room_previewer", 162x168) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomPreviewerLayoutProps {
    layout?: BoxLayout;
}

export const RoomPreviewerLayout = ({ layout }: RoomPreviewerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 162, height: 168, ...layout }}>
            <Region
                name="room_canvas_container"
                params={2193}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 168 }}
            >
                <Region
                    name="room_canvas"
                    params={2208}
                    layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 168 }}
                />
            </Region>
        </Region>
    );
};

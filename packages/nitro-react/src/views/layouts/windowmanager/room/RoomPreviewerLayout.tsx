import { BoxLayout, Region } from '#base/theme';

/** Generated from `2457_room_previewer_xml` (layout "room_previewer", 162x168) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomPreviewerLayoutProps {
    layout?: BoxLayout;
    onRoomCanvasContainer?: () => void;
}

export const RoomPreviewerLayout = ({ layout, onRoomCanvasContainer }: RoomPreviewerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 162, height: 168, ...layout }}>
            <Region
                name="room_canvas_container"
                backgroundColor="#000000"
                onPointerTap={onRoomCanvasContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="room_canvas"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};

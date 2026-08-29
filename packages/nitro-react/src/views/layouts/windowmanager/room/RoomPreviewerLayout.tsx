import { BoxLayout, Region } from '#base/theme';

/** Generated from `2457_room_previewer_xml` (layout "room_previewer", 162x168) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomPreviewerLayoutProps {
    layout?: BoxLayout;
    roomCanvasContainer?: RoomPreviewerLayoutRoomCanvasContainerProps;
}

export const RoomPreviewerLayout = ({ layout, roomCanvasContainer }: RoomPreviewerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 162, height: 168, ...layout }}>
            <RoomPreviewerLayoutRoomCanvasContainer {...roomCanvasContainer} />
        </Region>
    );
};

/** Named region `room_canvas` of RoomPreviewerLayout - configured through the parent's `roomCanvas` prop. */
export interface RoomPreviewerLayoutRoomCanvasProps {
    layout?: BoxLayout;
}

export const RoomPreviewerLayoutRoomCanvas = ({ layout }: RoomPreviewerLayoutRoomCanvasProps) => {
    return (
        <Region
            name="room_canvas"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `room_canvas_container` of RoomPreviewerLayout - configured through the parent's `roomCanvasContainer` prop. */
export interface RoomPreviewerLayoutRoomCanvasContainerProps {
    layout?: BoxLayout;
    onRoomCanvasContainer?: () => void;
    roomCanvas?: RoomPreviewerLayoutRoomCanvasProps;
}

export const RoomPreviewerLayoutRoomCanvasContainer = ({ layout, onRoomCanvasContainer, roomCanvas }: RoomPreviewerLayoutRoomCanvasContainerProps) => {
    return (
        <Region
            name="room_canvas_container"
            backgroundColor="#000000"
            onPointerTap={onRoomCanvasContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <RoomPreviewerLayoutRoomCanvas {...roomCanvas} />
        </Region>
    );
};

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2858_room_thumbnail_xml` (layout "room_thumbnail", 112x112) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomThumbnailLayoutProps {
    layout?: BoxLayout;
    roomThumbnailContainer?: RoomThumbnailLayoutRoomThumbnailContainerProps;
}

export const RoomThumbnailLayout = ({ layout, roomThumbnailContainer }: RoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 112, height: 112, ...layout }}>
            <RoomThumbnailLayoutRoomThumbnailContainer {...roomThumbnailContainer} />
        </Region>
    );
};

/** Named region `room_thumbnail_container` of RoomThumbnailLayout - configured through the parent's `roomThumbnailContainer` prop. */
export interface RoomThumbnailLayoutRoomThumbnailContainerProps {
    layout?: BoxLayout;
    srcRoomThumbnail?: string;
    tags?: string[];
}

export const RoomThumbnailLayoutRoomThumbnailContainer = ({ layout, srcRoomThumbnail, tags }: RoomThumbnailLayoutRoomThumbnailContainerProps) => {
    return (
        <Region
            name="room_thumbnail_container"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 112, ...layout }}
        >
            <ThemeImage
                name="room_thumbnail"
                src={srcRoomThumbnail ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
            />
        </Region>
    );
};

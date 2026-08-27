import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2858_room_thumbnail_xml` (layout "room_thumbnail", 112x112) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomThumbnailLayoutProps {
    layout?: BoxLayout;
    srcRoomThumbnail?: string;
}

export const RoomThumbnailLayout = ({ layout, srcRoomThumbnail }: RoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 112, height: 112, ...layout }}>
            <Region
                name="room_thumbnail_container"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 112 }}
            >
                <ThemeImage
                    name="room_thumbnail"
                    params={16}
                    src={srcRoomThumbnail ?? layoutImage('newnavigator_default_room.png')}
                    layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                />
            </Region>
        </Region>
    );
};

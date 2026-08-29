import { BoxLayout, Region } from '#base/theme';

import { RocRoomThumbnailLayoutThumbnail, RocRoomThumbnailLayoutThumbnailProps } from './RocRoomThumbnailLayoutThumbnail';

/** Generated from `3048_roc_room_thumbnail_xml` (layout "roc_room_thumbnail", 137x99) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocRoomThumbnailLayoutProps {
    layout?: BoxLayout;
    thumbnail?: RocRoomThumbnailLayoutThumbnailProps;
}

export const RocRoomThumbnailLayout = ({ layout, thumbnail }: RocRoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 137, height: 99, ...layout }}>
            <RocRoomThumbnailLayoutThumbnail {...thumbnail} />
        </Region>
    );
};

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3073_grs_guest_room_thumbnail_xml` (layout "navigator_guest_room_thumbnail", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomThumbnailLayoutProps {
    layout?: BoxLayout;
    thumbnail?: GrsGuestRoomThumbnailLayoutThumbnailProps;
}

export const GrsGuestRoomThumbnailLayout = ({ layout, thumbnail }: GrsGuestRoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <GrsGuestRoomThumbnailLayoutThumbnail {...thumbnail} />
        </Region>
    );
};

/** Named region `picframe` of GrsGuestRoomThumbnailLayout - configured through the parent's `picframe` prop. */
export interface GrsGuestRoomThumbnailLayoutPicframeProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const GrsGuestRoomThumbnailLayoutPicframe = ({ layout, tags }: GrsGuestRoomThumbnailLayoutPicframeProps) => {
    return (
        <Region
            name="picframe"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 64, top: 3, height: 64, ...layout }}
        />
    );
};

/** Named region `thumbnail` of GrsGuestRoomThumbnailLayout - configured through the parent's `thumbnail` prop. */
export interface GrsGuestRoomThumbnailLayoutThumbnailProps {
    layout?: BoxLayout;
    picframe?: GrsGuestRoomThumbnailLayoutPicframeProps;
    srcEnterRoom?: string;
    tags?: string[];
}

export const GrsGuestRoomThumbnailLayoutThumbnail = ({ layout, picframe, srcEnterRoom, tags }: GrsGuestRoomThumbnailLayoutThumbnailProps) => {
    return (
        <Region
            name="thumbnail"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 70, ...layout }}
        >
            <GrsGuestRoomThumbnailLayoutPicframe {...picframe} />
            <ThemeImage
                name="enter_room"
                src={srcEnterRoom}
                layout={{ position: 'absolute', left: 0, width: 64, top: 3, height: 64 }}
            />
        </Region>
    );
};

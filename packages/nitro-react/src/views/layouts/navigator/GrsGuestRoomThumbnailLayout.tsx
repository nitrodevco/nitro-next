import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3073_grs_guest_room_thumbnail_xml` (layout "navigator_guest_room_thumbnail", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomThumbnailLayoutProps {
    layout?: BoxLayout;
    srcEnterRoom?: string;
}

export const GrsGuestRoomThumbnailLayout = ({ layout, srcEnterRoom }: GrsGuestRoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="thumbnail"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 70 }}
            >
                <Region
                    name="picframe"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 64, top: 3, height: 64 }}
                />
                <ThemeImage
                    name="enter_room"
                    params={16}
                    src={srcEnterRoom}
                    layout={{ position: 'absolute', left: 0, width: 64, top: 3, height: 64 }}
                />
            </Region>
        </Region>
    );
};

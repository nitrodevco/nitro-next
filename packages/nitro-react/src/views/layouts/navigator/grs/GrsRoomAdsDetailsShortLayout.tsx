import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3040_grs_room_ads_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsRoomAdsDetailsShortLayoutProps {
    captionAdname?: string;
    layout?: BoxLayout;
    onDetails?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
    tintDoormodeDoorbellSmall?: string;
    tintDoormodeInvisibleSmall?: string;
    tintDoormodePasswordSmall?: string;
}

export const GrsRoomAdsDetailsShortLayout = ({ captionAdname, layout, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall, tintDoormodeDoorbellSmall, tintDoormodeInvisibleSmall, tintDoormodePasswordSmall }: GrsRoomAdsDetailsShortLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <Region
                name="details"
                backgroundColor="#ffffff"
                onPointerTap={onDetails}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="adname"
                    layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionAdname ?? 'PH Room Name: Neque porro quisquam est que'}
                </Region>
                <ThemeImage
                    name="doormode_password_small"
                    src={srcDoormodePasswordSmall}
                    tint={tintDoormodePasswordSmall}
                    layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_doorbell_small"
                    src={srcDoormodeDoorbellSmall}
                    tint={tintDoormodeDoorbellSmall}
                    layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_invisible_small"
                    src={srcDoormodeInvisibleSmall}
                    tint={tintDoormodeInvisibleSmall}
                    layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
                />
            </Region>
        </Region>
    );
};

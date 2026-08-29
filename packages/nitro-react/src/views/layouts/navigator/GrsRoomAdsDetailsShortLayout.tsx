import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3040_grs_room_ads_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsRoomAdsDetailsShortLayoutProps {
    details?: GrsRoomAdsDetailsShortLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsRoomAdsDetailsShortLayout = ({ details, layout }: GrsRoomAdsDetailsShortLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <GrsRoomAdsDetailsShortLayoutDetails {...details} />
        </Region>
    );
};

/** Named region `details` of GrsRoomAdsDetailsShortLayout - configured through the parent's `details` prop. */
export interface GrsRoomAdsDetailsShortLayoutDetailsProps {
    captionAdname?: string;
    layout?: BoxLayout;
    onDetails?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
}

export const GrsRoomAdsDetailsShortLayoutDetails = ({ captionAdname, layout, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall }: GrsRoomAdsDetailsShortLayoutDetailsProps) => {
    return (
        <Region
            name="details"
            params={145}
            backgroundColor="#ffffff"
            onPointerTap={onDetails}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17, ...layout }}
        >
            <Region
                name="adname"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAdname ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <ThemeImage
                name="doormode_password_small"
                params={80}
                src={srcDoormodePasswordSmall}
                layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_doorbell_small"
                params={80}
                src={srcDoormodeDoorbellSmall}
                layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_invisible_small"
                params={80}
                src={srcDoormodeInvisibleSmall}
                layout={{ position: 'absolute', right: 50, width: 13, top: 1, height: 16 }}
            />
        </Region>
    );
};

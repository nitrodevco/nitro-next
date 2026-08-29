import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3030_grs_room_ads_details_phase_one_xml` (layout "grs_room_ads_details_phase_one", 346x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsRoomAdsDetailsPhaseOneLayoutProps {
    details?: GrsRoomAdsDetailsPhaseOneLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsRoomAdsDetailsPhaseOneLayout = ({ details, layout }: GrsRoomAdsDetailsPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 17, ...layout }}>
            <GrsRoomAdsDetailsPhaseOneLayoutDetails {...details} />
        </Region>
    );
};

/** Named region `details` of GrsRoomAdsDetailsPhaseOneLayout - configured through the parent's `details` prop. */
export interface GrsRoomAdsDetailsPhaseOneLayoutDetailsProps {
    captionAdname?: string;
    layout?: BoxLayout;
    onDetails?: () => void;
    srcDoormodeDoorbellSmall?: string;
    srcDoormodeInvisibleSmall?: string;
    srcDoormodePasswordSmall?: string;
}

export const GrsRoomAdsDetailsPhaseOneLayoutDetails = ({ captionAdname, layout, onDetails, srcDoormodeDoorbellSmall, srcDoormodeInvisibleSmall, srcDoormodePasswordSmall }: GrsRoomAdsDetailsPhaseOneLayoutDetailsProps) => {
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
                layout={{ position: 'absolute', left: 6, width: 273, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAdname ?? 'PH Room Name: Neque porro quisquam est que'} />
            </Region>
            <ThemeImage
                name="doormode_password_small"
                params={80}
                src={srcDoormodePasswordSmall}
                layout={{ position: 'absolute', right: 48, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_doorbell_small"
                params={80}
                src={srcDoormodeDoorbellSmall}
                layout={{ position: 'absolute', right: 48, width: 13, top: 1, height: 16 }}
            />
            <ThemeImage
                name="doormode_invisible_small"
                params={80}
                src={srcDoormodeInvisibleSmall}
                layout={{ position: 'absolute', right: 48, width: 13, top: 1, height: 16 }}
            />
        </Region>
    );
};

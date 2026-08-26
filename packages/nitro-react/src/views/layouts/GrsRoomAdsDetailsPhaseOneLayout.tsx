import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3030_grs_room_ads_details_phase_one_xml` (layout "grs_room_ads_details_phase_one", 346x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsRoomAdsDetailsPhaseOneLayoutProps {
    layout?: BoxLayout;
}

export const GrsRoomAdsDetailsPhaseOneLayout = ({ layout }: GrsRoomAdsDetailsPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 17, ...layout }}>
            <Region
                name="details"
                params={145}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 346, top: 0, height: 17 }}
            >
                <Region
                    name="adname"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 273, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="PH Room Name: Neque porro quisquam est que" />
                </Region>
                <ThemeImage
                    name="doormode_password_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 285, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_doorbell_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 285, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_invisible_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 285, width: 13, top: 1, height: 16 }}
                />
            </Region>
        </Region>
    );
};

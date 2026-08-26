import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3040_grs_room_ads_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsRoomAdsDetailsShortLayoutProps {
    layout?: BoxLayout;
}

export const GrsRoomAdsDetailsShortLayout = ({ layout }: GrsRoomAdsDetailsShortLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <Region
                name="details"
                params={145}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 17 }}
            >
                <Region
                    name="adname"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 210, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="PH Room Name: Neque porro quisquam est que" />
                </Region>
                <ThemeImage
                    name="doormode_password_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 208, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_doorbell_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 208, width: 13, top: 1, height: 16 }}
                />
                <ThemeImage
                    name="doormode_invisible_small"
                    params={80}
                    src={undefined}
                    layout={{ position: 'absolute', left: 208, width: 13, top: 1, height: 16 }}
                />
            </Region>
        </Region>
    );
};

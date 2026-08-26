import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1564_targeted_offer_minimized_xml` (layout "targetedoffers_minimized", 192x51) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferMinimizedLayoutProps {
    layout?: BoxLayout;
}

export const TargetedOfferMinimizedLayout = ({ layout }: TargetedOfferMinimizedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 51, ...layout }}>
            <Region
                name="targetedoffers_minimized"
                params={147473}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
            >
                <Border
                    variant="9"
                    tags={[ 'BGCOLOR' ]}
                    params={147472}
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
                >
                    <Region
                        name="itemlist"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 192, top: 6, height: 22, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            name="txt_title"
                            params={8388624}
                            layout={{ width: 138, height: 4, flexShrink: 0, maxWidth: 162, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="txt_time_left"
                            params={16}
                            layout={{ width: 138, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                    </Region>
                    <ThemeImage
                        name="bmp_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 6, width: 40, top: 6, height: 40 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};

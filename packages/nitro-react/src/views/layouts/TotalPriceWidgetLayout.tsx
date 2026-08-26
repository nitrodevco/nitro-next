import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1588_totalPriceWidget_xml` (layout "totalPriceWidget", 180x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TotalPriceWidgetLayoutProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayout = ({ layout }: TotalPriceWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 25, ...layout }}>
            <Border
                variant="103"
                name="totalprice_widget_border"
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 25 }}
            >
                <Region
                    name="header_text"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 14, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="=" />
                </Region>
                <Region
                    name="totalprice_container"
                    params={409616}
                    layout={{ position: 'absolute', left: 49, width: 128, top: 1, height: 24, flexDirection: 'row' }}
                >
                    <Region
                        name="amount_text_left"
                        params={262160}
                        layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="00000" />
                    </Region>
                    <Icon
                        variant="34"
                        name="currency_indicator_bitmap_left"
                        params={16}
                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                    />
                    <Region
                        name="plus"
                        params={16}
                        layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text=" " />
                    </Region>
                    <Region
                        name="amount_text_right"
                        params={262160}
                        layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="00000" />
                    </Region>
                    <Icon
                        variant="34"
                        name="currency_indicator_bitmap_right"
                        params={16}
                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

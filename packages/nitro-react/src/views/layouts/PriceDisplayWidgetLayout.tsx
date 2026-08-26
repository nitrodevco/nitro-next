import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1690_priceDisplayWidget_xml` (layout "priceDisplayWidget", 20x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PriceDisplayWidgetLayoutProps {
    layout?: BoxLayout;
}

export const PriceDisplayWidgetLayout = ({ layout }: PriceDisplayWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 29, ...layout }}>
            <Border
                variant="6"
                params={409600}
                layout={{ position: 'absolute', left: 12, width: 20, top: 9, height: 29, minWidth: 20, minHeight: 28 }}
            >
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 29, flexDirection: 'row' }}
                >
                    <Region
                        params={16}
                        layout={{ width: 3, height: 10, flexShrink: 0, minWidth: 3 }}
                    />
                    <Region
                        name="price_box_new"
                        params={147472}
                        layout={{ width: 9, height: 26, flexShrink: 0 }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 3, height: 10, flexShrink: 0, minWidth: 3 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

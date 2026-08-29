import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `1690_priceDisplayWidget_xml` (layout "priceDisplayWidget", 20x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PriceDisplayWidgetLayoutProps {
    layout?: BoxLayout;
    priceBoxNew?: ReactNode;
}

export const PriceDisplayWidgetLayout = ({ layout, priceBoxNew }: PriceDisplayWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 29, ...layout }}>
            <Border
                variant="6"
                layout={{ position: 'absolute', right: -12, width: 20, top: 9, bottom: -9, minWidth: 20, minHeight: 28 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 5, top: 0, bottom: 0, flexDirection: 'row' }}>
                    <Region layout={{ width: 3, height: 10, flexShrink: 0, minWidth: 3 }} />
                    <Region
                        name="price_box_new"
                        layout={{ width: 9, alignSelf: 'stretch', flexShrink: 0 }}
                    >
                        {priceBoxNew}
                    </Region>
                    <Region layout={{ width: 3, height: 10, flexShrink: 0, minWidth: 3 }} />
                </Region>
            </Border>
        </Region>
    );
};

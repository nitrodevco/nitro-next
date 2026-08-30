import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { TotalPriceWidgetLayoutAmountTextLeftItem } from './TotalPriceWidgetLayoutAmountTextLeftItem';
import { TotalPriceWidgetLayoutAmountTextRightItem } from './TotalPriceWidgetLayoutAmountTextRightItem';
import { TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItem } from './TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItem';
import { TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItem } from './TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItem';
import { TotalPriceWidgetLayoutPlusItem } from './TotalPriceWidgetLayoutPlusItem';

/** Generated from `1588_totalPriceWidget_xml` (layout "totalPriceWidget", 180x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TotalPriceWidgetLayoutProps {
    captionHeaderText?: string;
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayout = ({ captionHeaderText, itemsTotalpriceContainer, layout }: TotalPriceWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 25, ...layout }}>
            <Border
                variant="103"
                name="totalprice_widget_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionHeaderText ?? '='}
                    name="header_text"
                    layout={{ position: 'absolute', left: 10, width: 14, top: 3, bottom: 5 }}
                />
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 3, top: 1, bottom: 0, flexDirection: 'row' }}
                >
                    {itemsTotalpriceContainer ?? (
                        <>
                            <TotalPriceWidgetLayoutAmountTextLeftItem />
                            <TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItem />
                            <TotalPriceWidgetLayoutPlusItem />
                            <TotalPriceWidgetLayoutAmountTextRightItem />
                            <TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};

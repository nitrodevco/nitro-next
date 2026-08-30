import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { GridItemWithPriceMultiLayoutAmountTextLeftItem } from './GridItemWithPriceMultiLayoutAmountTextLeftItem';
import { GridItemWithPriceMultiLayoutAmountTextRightItem } from './GridItemWithPriceMultiLayoutAmountTextRightItem';
import { GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItem } from './GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItem';
import { GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItem } from './GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItem';
import { GridItemWithPriceMultiLayoutPlusItem } from './GridItemWithPriceMultiLayoutPlusItem';
import { GridItemWithPriceMultiLayoutSmallContainer, GridItemWithPriceMultiLayoutSmallContainerProps } from './GridItemWithPriceMultiLayoutSmallContainer';

/** Generated from `1717_gridItem_with_price_multi_xml` (layout "gridItem_with_price_multi", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemWithPriceMultiLayoutProps {
    itemsTotalpriceContainer?: ReactNode;
    itemsTotalpriceContainer2?: ReactNode;
    layout?: BoxLayout;
    smallContainer?: GridItemWithPriceMultiLayoutSmallContainerProps;
    srcBadgeAddOn?: string;
    srcImageWide?: string;
    tintBadgeAddOn?: string;
    tintImageWide?: string;
    visibleBg?: boolean;
}

export const GridItemWithPriceMultiLayout = ({ itemsTotalpriceContainer, itemsTotalpriceContainer2, layout, smallContainer, srcBadgeAddOn, srcImageWide, tintBadgeAddOn, tintImageWide, visibleBg }: GridItemWithPriceMultiLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 53, maxWidth: 73 }}>
                {(visibleBg ?? false) && (
                    <Border
                        variant="3"
                        name="bg"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
                <Border
                    variant="2"
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        tintColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        />
                    </Border>
                </Border>
                <ThemeImage
                    name="wide_container"
                    src={srcImageWide}
                    tint={tintImageWide}
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                />
                <ThemeImage
                    name="badge_add_on"
                    src={srcBadgeAddOn}
                    tint={tintBadgeAddOn}
                    layout={{ position: 'absolute', left: 8, width: 10, top: 2, height: 10 }}
                />
                <GridItemWithPriceMultiLayoutSmallContainer {...smallContainer} />
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 2, top: 36, flexDirection: 'row', gap: 1 }}
                >
                    {itemsTotalpriceContainer ?? (
                        <>
                            <GridItemWithPriceMultiLayoutAmountTextLeftItem />
                            <GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItem />
                        </>
                    )}
                </Region>
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 2, top: 51, flexDirection: 'row', gap: 1 }}
                >
                    {itemsTotalpriceContainer2 ?? (
                        <>
                            <GridItemWithPriceMultiLayoutPlusItem />
                            <GridItemWithPriceMultiLayoutAmountTextRightItem />
                            <GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

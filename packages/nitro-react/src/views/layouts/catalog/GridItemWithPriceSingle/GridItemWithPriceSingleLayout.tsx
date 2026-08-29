import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { GridItemWithPriceSingleLayoutAmountTextRightItem } from './GridItemWithPriceSingleLayoutAmountTextRightItem';
import { GridItemWithPriceSingleLayoutCurrencyIndicatorBitmapRightItem } from './GridItemWithPriceSingleLayoutCurrencyIndicatorBitmapRightItem';
import { GridItemWithPriceSingleLayoutSmallContainer, GridItemWithPriceSingleLayoutSmallContainerProps } from './GridItemWithPriceSingleLayoutSmallContainer';

/** Generated from `1635_gridItem_with_price_single_xml` (layout "gridItem_with_price", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemWithPriceSingleLayoutProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
    smallContainer?: GridItemWithPriceSingleLayoutSmallContainerProps;
    srcBadgeAddOn?: string;
    srcImageWide?: string;
    tintBadgeAddOn?: string;
    tintImageWide?: string;
    visibleBg?: boolean;
}

export const GridItemWithPriceSingleLayout = ({ itemsTotalpriceContainer, layout, smallContainer, srcBadgeAddOn, srcImageWide, tintBadgeAddOn, tintImageWide, visibleBg }: GridItemWithPriceSingleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 53, maxWidth: 73 }}>
                {(visibleBg ?? false) && (
                    <Border
                        variant="3"
                        name="bg"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 62 }}
                    />
                )}
                <Border
                    variant="2"
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 12 }}
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
                <Region
                    name="wide_container"
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                >
                    <ThemeImage
                        name="image_wide"
                        src={srcImageWide}
                        tint={tintImageWide}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 36 }}
                    />
                </Region>
                <ThemeImage
                    name="badge_add_on"
                    src={srcBadgeAddOn}
                    tint={tintBadgeAddOn}
                    layout={{ position: 'absolute', left: 8, width: 10, top: 2, height: 10 }}
                />
                <GridItemWithPriceSingleLayoutSmallContainer {...smallContainer} />
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 2, top: 36, flexDirection: 'row', gap: 1 }}
                >
                    {itemsTotalpriceContainer ?? (
                        <>
                            <GridItemWithPriceSingleLayoutAmountTextRightItem />
                            <GridItemWithPriceSingleLayoutCurrencyIndicatorBitmapRightItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

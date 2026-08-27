import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1717_gridItem_with_price_multi_xml` (layout "gridItem_with_price_multi", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemWithPriceMultiLayoutProps {
    captionBundleCounter?: string;
    captionMultiCounter?: string;
    itemsTotalpriceContainer?: ReactNode;
    itemsTotalpriceContainer2?: ReactNode;
    layout?: BoxLayout;
    onSmallContainer?: () => void;
    srcBadgeAddOn?: string;
    srcImage?: string;
    srcImageWide?: string;
    srcUniqueItemBackgroundBitmap?: string;
    srcUniqueItemSoldOutBitmap?: string;
    visibleBg?: boolean;
}

export const GridItemWithPriceMultiLayout = ({ captionBundleCounter, captionMultiCounter, itemsTotalpriceContainer, itemsTotalpriceContainer2, layout, onSmallContainer, srcBadgeAddOn, srcImage, srcImageWide, srcUniqueItemBackgroundBitmap, srcUniqueItemSoldOutBitmap, visibleBg }: GridItemWithPriceMultiLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74, minWidth: 53, maxWidth: 73 }}
            >
                <Region
                    visible={visibleBg ?? false}
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
                >
                    <Border
                        variant="3"
                        name="bg"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="2"
                    tags={[ 'ITEM_HILIGHT' ]}
                    params={2192}
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        params={2192}
                        tintColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            params={2192}
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        />
                    </Border>
                </Border>
                <Region
                    name="wide_container"
                    params={24}
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                >
                    <ThemeImage
                        name="image_wide"
                        params={16}
                        src={srcImageWide}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 36 }}
                    />
                </Region>
                <ThemeImage
                    name="badge_add_on"
                    params={16}
                    src={srcBadgeAddOn}
                    layout={{ position: 'absolute', left: 8, width: 10, top: 2, height: 10 }}
                />
                <Region
                    name="small_container"
                    params={17}
                    onPointerTap={onSmallContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 36, top: 2, height: 36 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    >
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            params={16}
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    </Region>
                    <ThemeImage
                        name="image"
                        params={16}
                        src={srcImage}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    />
                    <Icon
                        variant="0"
                        name="clubLevelIcon"
                        params={394320}
                        layout={{ position: 'absolute', right: 2, width: 19, bottom: 24, height: 10 }}
                    />
                    <Region
                        name="bundleCounter"
                        params={176}
                        layout={{ position: 'absolute', left: 18, right: 14, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBundleCounter ?? ''}
                            textOptions={{ fill: '#cccc66' }}
                        />
                    </Region>
                    <Border
                        variant="2"
                        name="multiContainer"
                        params={393232}
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', right: 1, width: 17, top: 21, height: 13 }}
                    >
                        <Region
                            name="multiCounter"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMultiCounter ?? ''}
                                textOptions={{ fill: '#cccc66' }}
                            />
                        </Region>
                    </Border>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                    >
                        <ThemeImage
                            name="unique_item_sold_out_bitmap"
                            params={16}
                            src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_tile.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    >
                        <ThemeImage
                            tags={[ 'ITEM_HILIGHT_TOP' ]}
                            params={16}
                            src={layoutImage('inventory_thumb_selected_outline.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="totalprice_container"
                    params={409680}
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
                    params={409680}
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

/** Row template `amount_text_left` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: GridItemWithPriceMultiLayoutAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            params={262160}
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextLeft ?? '00'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_left` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItem = ({ layout }: GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_left"
            params={16}
            layout={{ width: 14, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutPlusItem = ({ captionPlus, layout }: GridItemWithPriceMultiLayoutPlusItemProps) => {
    return (
        <Region
            name="plus"
            params={16}
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlus ?? ' '} />
        </Region>
    );
};

/** Row template `amount_text_right` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: GridItemWithPriceMultiLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            params={262160}
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextRight ?? '00'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_right` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItem = ({ layout }: GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_right"
            params={16}
            layout={{ width: 14, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1717_gridItem_with_price_multi_xml` (layout "gridItem_with_price_multi", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemWithPriceMultiLayoutProps {
    itemsTotalpriceContainer?: ReactNode;
    itemsTotalpriceContainer2?: ReactNode;
    layout?: BoxLayout;
    smallContainer?: GridItemWithPriceMultiLayoutSmallContainerProps;
    srcBadgeAddOn?: string;
    srcImageWide?: string;
    visibleBg?: boolean;
}

export const GridItemWithPriceMultiLayout = ({ itemsTotalpriceContainer, itemsTotalpriceContainer2, layout, smallContainer, srcBadgeAddOn, srcImageWide, visibleBg }: GridItemWithPriceMultiLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74, minWidth: 53, maxWidth: 73 }}>
                {(visibleBg ?? false) && (
                    <Border
                        variant="3"
                        name="bg"
                        layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
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
                <Region
                    name="wide_container"
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                >
                    <ThemeImage
                        name="image_wide"
                        src={srcImageWide}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 36 }}
                    />
                </Region>
                <ThemeImage
                    name="badge_add_on"
                    src={srcBadgeAddOn}
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

/** Named region `small_container` of GridItemWithPriceMultiLayout - configured through the parent's `smallContainer` prop. */
export interface GridItemWithPriceMultiLayoutSmallContainerProps {
    captionBundleCounter?: string;
    captionMultiCounter?: string;
    layout?: BoxLayout;
    onSmallContainer?: () => void;
    srcImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    srcUniqueItemSoldOutBitmap?: string;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
    visibleUniqueItemSoldOutBitmap?: boolean;
}

export const GridItemWithPriceMultiLayoutSmallContainer = ({ captionBundleCounter, captionMultiCounter, layout, onSmallContainer, srcImage, srcUniqueItemBackgroundBitmap, srcUniqueItemSoldOutBitmap, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer, visibleUniqueItemSoldOutBitmap }: GridItemWithPriceMultiLayoutSmallContainerProps) => {
    return (
        <Region
            name="small_container"
            onPointerTap={onSmallContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 8, width: 36, top: 2, height: 36, ...layout }}
        >
            {(visibleUniqueItemBackgroundBitmap ?? false) && (
                <ThemeImage
                    name="unique_item_background_bitmap"
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            )}
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
            {(visibleUniqueItemOverlayContainer ?? false) && (
                <WidgetSlot
                    widgetType="limited_item_overlay_grid"
                    name="unique_item_overlay_container"
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            )}
            <Icon
                variant="0"
                name="clubLevelIcon"
                layout={{ position: 'absolute', right: 2, width: 19, bottom: 24, height: 10 }}
            />
            <Region
                name="bundleCounter"
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
                tintColor="#ff3300"
                layout={{ position: 'absolute', right: 1, width: 17, top: 21, height: 13 }}
            >
                <Region
                    name="multiCounter"
                    layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMultiCounter ?? ''}
                        textOptions={{ fill: '#cccc66' }}
                    />
                </Region>
            </Border>
            {(visibleUniqueItemSoldOutBitmap ?? false) && (
                <ThemeImage
                    name="unique_item_sold_out_bitmap"
                    src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_tile.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                />
            )}
            {/* `static_bitmap` is hidden and has no name to show it by */}
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
            layout={{ width: 14, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

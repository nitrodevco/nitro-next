import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1588_totalPriceWidget_xml` (layout "totalPriceWidget", 180x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TotalPriceWidgetLayoutProps {
    captionHeaderText?: string;
    layout?: BoxLayout;
    totalpriceContainer?: TotalPriceWidgetLayoutTotalpriceContainerProps;
}

export const TotalPriceWidgetLayout = ({ captionHeaderText, layout, totalpriceContainer }: TotalPriceWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 25, ...layout }}>
            <Border
                variant="103"
                name="totalprice_widget_border"
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 25 }}
            >
                <Region
                    name="header_text"
                    layout={{ position: 'absolute', left: 10, width: 14, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionHeaderText ?? '='} />
                </Region>
                <TotalPriceWidgetLayoutTotalpriceContainer {...totalpriceContainer} />
            </Border>
        </Region>
    );
};

/** Row template `amount_text_left` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout, tags }: TotalPriceWidgetLayoutAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            tags={tags}
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextLeft ?? '00000'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_left` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItem = ({ layout, tags }: TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutPlusItem = ({ captionPlus, layout, tags }: TotalPriceWidgetLayoutPlusItemProps) => {
    return (
        <Region
            name="plus"
            tags={tags}
            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlus ?? ' '} />
        </Region>
    );
};

/** Row template `amount_text_right` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutAmountTextRightItem = ({ captionAmountTextRight, layout, tags }: TotalPriceWidgetLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            tags={tags}
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextRight ?? '00000'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_right` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItem = ({ layout, tags }: TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `totalprice_container` of TotalPriceWidgetLayout - configured through the parent's `totalpriceContainer` prop. */
export interface TotalPriceWidgetLayoutTotalpriceContainerProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidgetLayoutTotalpriceContainer = ({ itemsTotalpriceContainer, layout, tags }: TotalPriceWidgetLayoutTotalpriceContainerProps) => {
    return (
        <Region
            name="totalprice_container"
            tags={tags}
            layout={{ position: 'absolute', right: 3, top: 1, flexDirection: 'row', ...layout }}
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
    );
};

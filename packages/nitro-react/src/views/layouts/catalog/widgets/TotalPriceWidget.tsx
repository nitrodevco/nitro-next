import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Row template `total_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetTotalLeftItem = ({ captionText, layout }: TotalPriceWidgetTotalLeftItemProps) => {
    return (
        <Region
            name="total_left"
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="text"
                layout={{ position: 'absolute', left: 0, width: 10, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? '0'}
                    textOptions={{ fill: '#999999' }}
                />
            </Region>
            <Region
                name="strike"
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2 }}
            />
        </Region>
    );
};

/** Row template `amount_text_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetAmountTextLeftItem = ({ captionAmountTextLeft, layout }: TotalPriceWidgetAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextLeft ?? '0'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetCurrencyIndicatorBitmapLeftItem = ({ layout }: TotalPriceWidgetCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetPlusItem = ({ captionPlus, layout }: TotalPriceWidgetPlusItemProps) => {
    return (
        <Region
            name="plus"
            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlus ?? ' '} />
        </Region>
    );
};

/** Row template `total_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetTotalRightItem = ({ captionText, layout }: TotalPriceWidgetTotalRightItemProps) => {
    return (
        <Region
            name="total_right"
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="text"
                layout={{ position: 'absolute', left: 0, width: 10, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? '0'}
                    textOptions={{ fill: '#999999' }}
                />
            </Region>
            <Region
                name="strike"
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2 }}
            />
        </Region>
    );
};

/** Row template `amount_text_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetAmountTextRightItem = ({ captionAmountTextRight, layout }: TotalPriceWidgetAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextRight ?? '0'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetCurrencyIndicatorBitmapRightItem = ({ layout }: TotalPriceWidgetCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `totalprice_container` of TotalPriceWidget - configured through the parent's `totalpriceContainer` prop. */
export interface TotalPriceWidgetTotalpriceContainerProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
}

export const TotalPriceWidgetTotalpriceContainer = ({ itemsTotalpriceContainer, layout }: TotalPriceWidgetTotalpriceContainerProps) => {
    return (
        <Region
            name="totalprice_container"
            layout={{ position: 'absolute', right: 3, top: 1, flexDirection: 'row', ...layout }}
        >
            {itemsTotalpriceContainer ?? (
                <>
                    <TotalPriceWidgetTotalLeftItem />
                    <TotalPriceWidgetAmountTextLeftItem />
                    <TotalPriceWidgetCurrencyIndicatorBitmapLeftItem />
                    <TotalPriceWidgetPlusItem />
                    <TotalPriceWidgetTotalRightItem />
                    <TotalPriceWidgetAmountTextRightItem />
                    <TotalPriceWidgetCurrencyIndicatorBitmapRightItem />
                </>
            )}
        </Region>
    );
};

/** Named region `totalPriceWidget` of TotalPriceWidget - configured through the parent's `totalPriceWidget` prop. */
export interface TotalPriceWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    totalpriceContainer?: TotalPriceWidgetTotalpriceContainerProps;
}

export const TotalPriceWidget = ({ layout, totalpriceContainer }: TotalPriceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="totalPriceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, width: 158, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('catalog.bundlewidget.price')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <TotalPriceWidgetTotalpriceContainer {...totalpriceContainer} />
        </Region>
    );
};

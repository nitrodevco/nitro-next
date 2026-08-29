import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `strike` of TotalPriceWidget - configured through the parent's `strike` prop. */
export interface TotalPriceWidgetStrikeProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetStrike = ({ layout }: TotalPriceWidgetStrikeProps) => {
    return (
        <Region
            name="strike"
            params={16}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: TotalPriceWidgetStrikeProps;
}

export const TotalPriceWidgetTotalLeftItem = ({ captionText, layout, strike }: TotalPriceWidgetTotalLeftItemProps) => {
    return (
        <Region
            name="total_left"
            params={147472}
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 10, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? '0'}
                    textOptions={{ fill: '#999999' }}
                />
            </Region>
            <TotalPriceWidgetStrike {...strike} />
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
            params={16}
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
            params={16}
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
            params={16}
            layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionPlus ?? ' '} />
        </Region>
    );
};

/** Named region `strike` of TotalPriceWidget - configured through the parent's `strike` prop. */
export interface TotalPriceWidgetStrike2Props {
    layout?: BoxLayout;
}

export const TotalPriceWidgetStrike2 = ({ layout }: TotalPriceWidgetStrike2Props) => {
    return (
        <Region
            name="strike"
            params={16}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: TotalPriceWidgetStrike2Props;
}

export const TotalPriceWidgetTotalRightItem = ({ captionText, layout, strike }: TotalPriceWidgetTotalRightItemProps) => {
    return (
        <Region
            name="total_right"
            params={147472}
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 10, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? '0'}
                    textOptions={{ fill: '#999999' }}
                />
            </Region>
            <TotalPriceWidgetStrike2 {...strike} />
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
            params={16}
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
            params={16}
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
            params={409616}
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
export interface TotalPriceWidgetProps {
    layout?: BoxLayout;
    totalpriceContainer?: TotalPriceWidgetTotalpriceContainerProps;
}

export const TotalPriceWidget = ({ layout, totalpriceContainer }: TotalPriceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="totalPriceWidget"
            tags={[ 'EMBEDDED' ]}
            params={17424}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 158, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog.bundlewidget.price')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <TotalPriceWidgetTotalpriceContainer {...totalpriceContainer} />
        </Region>
    );
};

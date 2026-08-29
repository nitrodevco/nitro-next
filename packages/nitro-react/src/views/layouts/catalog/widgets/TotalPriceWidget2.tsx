import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `strike` of TotalPriceWidget2 - configured through the parent's `strike` prop. */
export interface TotalPriceWidget2StrikeProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2Strike = ({ layout, tags }: TotalPriceWidget2StrikeProps) => {
    return (
        <Region
            name="strike"
            tags={tags}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_left` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2TotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: TotalPriceWidget2StrikeProps;
    tags?: string[];
}

export const TotalPriceWidget2TotalLeftItem = ({ captionText, layout, strike, tags }: TotalPriceWidget2TotalLeftItemProps) => {
    return (
        <Region
            name="total_left"
            tags={tags}
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
            <TotalPriceWidget2Strike {...strike} />
        </Region>
    );
};

/** Row template `amount_text_left` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2AmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2AmountTextLeftItem = ({ captionAmountTextLeft, layout, tags }: TotalPriceWidget2AmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            tags={tags}
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextLeft ?? '0'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_left` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2CurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2CurrencyIndicatorBitmapLeftItem = ({ layout, tags }: TotalPriceWidget2CurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2PlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2PlusItem = ({ captionPlus, layout, tags }: TotalPriceWidget2PlusItemProps) => {
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

/** Named region `strike` of TotalPriceWidget2 - configured through the parent's `strike` prop. */
export interface TotalPriceWidget2Strike2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2Strike2 = ({ layout, tags }: TotalPriceWidget2Strike2Props) => {
    return (
        <Region
            name="strike"
            tags={tags}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_right` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2TotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: TotalPriceWidget2Strike2Props;
    tags?: string[];
}

export const TotalPriceWidget2TotalRightItem = ({ captionText, layout, strike, tags }: TotalPriceWidget2TotalRightItemProps) => {
    return (
        <Region
            name="total_right"
            tags={tags}
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
            <TotalPriceWidget2Strike2 {...strike} />
        </Region>
    );
};

/** Row template `amount_text_right` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2AmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2AmountTextRightItem = ({ captionAmountTextRight, layout, tags }: TotalPriceWidget2AmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            tags={tags}
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextRight ?? '0'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_right` of TotalPriceWidget2 - pass real rows through its `items…` slot. */
export interface TotalPriceWidget2CurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2CurrencyIndicatorBitmapRightItem = ({ layout, tags }: TotalPriceWidget2CurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            tags={tags}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `totalprice_container` of TotalPriceWidget2 - configured through the parent's `totalpriceContainer` prop. */
export interface TotalPriceWidget2TotalpriceContainerProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TotalPriceWidget2TotalpriceContainer = ({ itemsTotalpriceContainer, layout, tags }: TotalPriceWidget2TotalpriceContainerProps) => {
    return (
        <Region
            name="totalprice_container"
            tags={tags}
            layout={{ position: 'absolute', right: 3, top: 1, flexDirection: 'row', ...layout }}
        >
            {itemsTotalpriceContainer ?? (
                <>
                    <TotalPriceWidget2TotalLeftItem />
                    <TotalPriceWidget2AmountTextLeftItem />
                    <TotalPriceWidget2CurrencyIndicatorBitmapLeftItem />
                    <TotalPriceWidget2PlusItem />
                    <TotalPriceWidget2TotalRightItem />
                    <TotalPriceWidget2AmountTextRightItem />
                    <TotalPriceWidget2CurrencyIndicatorBitmapRightItem />
                </>
            )}
        </Region>
    );
};

/** Named region `totalPriceWidget` of TotalPriceWidget2 - configured through the parent's `totalPriceWidget` prop. */
export interface TotalPriceWidget2Props {
    layout?: BoxLayout;
    tags?: string[];
    totalpriceContainer?: TotalPriceWidget2TotalpriceContainerProps;
}

export const TotalPriceWidget2 = ({ layout, tags, totalpriceContainer }: TotalPriceWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="totalPriceWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, width: 158, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('catalog.bundlewidget.price')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <TotalPriceWidget2TotalpriceContainer {...totalpriceContainer} />
        </Region>
    );
};

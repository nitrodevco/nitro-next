import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1595_layout_default_xml` (layout "layout_default_ubuntu", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1595LayoutProps {
    container?: LayoutDefault_1595LayoutContainerProps;
    layout?: BoxLayout;
}

export const LayoutDefault_1595Layout = ({ container, layout }: LayoutDefault_1595LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutDefault_1595LayoutContainer {...container} />
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutDefault_1595Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutDefault_1595LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutProductViewWidget = ({ layout }: LayoutDefault_1595LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            tags={[ 'E' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        />
    );
};

/** Named region `itemGridWidget` of LayoutDefault_1595Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutDefault_1595LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutItemGridWidget = ({ layout }: LayoutDefault_1595LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            tags={[ 'E' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 60, ...layout }}
        />
    );
};

/** Named region `colourGridWidget` of LayoutDefault_1595Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutDefault_1595LayoutColourGridWidgetProps {
    layout?: BoxLayout;
    visibleColourGridWidget?: boolean;
}

export const LayoutDefault_1595LayoutColourGridWidget = ({ layout, visibleColourGridWidget }: LayoutDefault_1595LayoutColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            tags={[ 'E' ]}
            params={1040}
            visible={visibleColourGridWidget ?? false}
            layout={{ position: 'absolute', left: 182, width: 176, bottom: 60, height: 155, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutDefault_1595Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutDefault_1595LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutPurchaseWidget = ({ layout }: LayoutDefault_1595LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `activityPointDisplayWidget` of LayoutDefault_1595Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutDefault_1595LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutActivityPointDisplayWidget = ({ layout }: LayoutDefault_1595LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            layout={{ position: 'absolute', left: 182, width: 175, top: 2, height: 25, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutDefault_1595Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutDefault_1595LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutSpecialInfoWidget = ({ layout }: LayoutDefault_1595LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 109, width: 142, top: 20, height: 73, ...layout }}
        />
    );
};

/** Named region `limitedItemWidget` of LayoutDefault_1595Layout - configured through the parent's `limitedItemWidget` prop. */
export interface LayoutDefault_1595LayoutLimitedItemWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutLimitedItemWidget = ({ layout }: LayoutDefault_1595LayoutLimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            layout={{ position: 'absolute', left: 186, width: 174, top: 5, height: 35, ...layout }}
        >
            <WidgetSlot
                widgetType="limited_item_overlay_supply"
                name="unique_item_overlay_container"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            />
        </Region>
    );
};

/** Named region `soldLtdItemsWidget` of LayoutDefault_1595Layout - configured through the parent's `soldLtdItemsWidget` prop. */
export interface LayoutDefault_1595LayoutSoldLtdItemsWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutSoldLtdItemsWidget = ({ layout }: LayoutDefault_1595LayoutSoldLtdItemsWidgetProps) => {
    return (
        <Region
            name="soldLtdItemsWidget"
            params={1024}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 5, height: 30, ...layout }}
        />
    );
};

/** Named region `quantitySelection` of LayoutDefault_1595Layout - configured through the parent's `quantitySelection` prop. */
export interface LayoutDefault_1595LayoutQuantitySelectionProps {
    captionPromoInfo?: string;
    captionQuantityLabel?: string;
    layout?: BoxLayout;
    srcThumbStar?: string;
    visibleDiscountContainer?: boolean;
}

export const LayoutDefault_1595LayoutQuantitySelection = ({ captionPromoInfo, captionQuantityLabel, layout, srcThumbStar, visibleDiscountContainer }: LayoutDefault_1595LayoutQuantitySelectionProps) => {
    const t = useTranslation();
    const [ textValueValue, setTextValueValue ] = useState('');

    return (
        <Region
            name="quantitySelection"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 25, ...layout }}
        >
            <Region
                name="quantityLabel"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 100, top: 3, height: 17, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionQuantityLabel ?? t('catalog.bundlewidget.quantity')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleDiscountContainer ?? false}
                layout={{ position: 'absolute', left: 65, width: 135, top: 0, height: 25 }}
            >
                <Border
                    variant="3"
                    name="discountContainer"
                    params={16}
                    tintColor="#92d27c"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ThemeImage
                        name="thumbStar"
                        src={srcThumbStar ?? layoutImage('catalogue_bundle_star.png')}
                        layout={{ position: 'absolute', left: 108, width: 30, top: -2, height: 30 }}
                    />
                    <Region
                        name="promo.info"
                        params={16}
                        layout={{ position: 'absolute', left: 28, width: 82, top: 5, height: 15, maxWidth: 82, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionPromoInfo ?? t('shop.bonus.items.count')} />
                    </Region>
                </Border>
            </Region>
            <Border
                variant="0"
                name="quantityInput"
                params={16}
                layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
            >
                <TextInput
                    value={textValueValue}
                    onChange={setTextValueValue}
                    layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `spinnerWidget` of LayoutDefault_1595Layout - configured through the parent's `spinnerWidget` prop. */
export interface LayoutDefault_1595LayoutSpinnerWidgetProps {
    captionTextHeader?: string;
    layout?: BoxLayout;
    onButtonLess?: () => void;
    onButtonMore?: () => void;
    quantitySelection?: LayoutDefault_1595LayoutQuantitySelectionProps;
    visibleButtonLess?: boolean;
    visibleButtonMore?: boolean;
}

export const LayoutDefault_1595LayoutSpinnerWidget = ({ captionTextHeader, layout, onButtonLess, onButtonMore, quantitySelection, visibleButtonLess, visibleButtonMore }: LayoutDefault_1595LayoutSpinnerWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="spinnerWidget"
            tags={[ 'EMBEDDED' ]}
            params={17424}
            layout={{ position: 'absolute', left: 0, width: 200, bottom: 30, height: 25, ...layout }}
        >
            <Region
                name="text_header"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 7, width: 100, top: 5, height: 15, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextHeader ?? t('catalog.bundlewidget.spinner.select.amount')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleButtonLess ?? false}
                layout={{ position: 'absolute', left: 139, width: 14, top: 13, height: 14 }}
            >
                <ContainerButton
                    variant="3"
                    name="button_less"
                    params={1}
                    onPointerTap={onButtonLess}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Icon
                        variant="7"
                        name="icon_less"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 13, top: 4, height: 12 }}
                    />
                </ContainerButton>
            </Region>
            <Region
                visible={visibleButtonMore ?? false}
                layout={{ position: 'absolute', left: 139, width: 14, top: -1, height: 15 }}
            >
                <ContainerButton
                    variant="3"
                    name="button_more"
                    params={1}
                    onPointerTap={onButtonMore}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Icon
                        variant="6"
                        name="icon_more"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 11, top: 4, height: 11 }}
                    />
                </ContainerButton>
            </Region>
            <LayoutDefault_1595LayoutQuantitySelection {...quantitySelection} />
        </Region>
    );
};

/** Named region `strike` of LayoutDefault_1595Layout - configured through the parent's `strike` prop. */
export interface LayoutDefault_1595LayoutStrikeProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutStrike = ({ layout }: LayoutDefault_1595LayoutStrikeProps) => {
    return (
        <Region
            name="strike"
            params={16}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_left` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutTotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: LayoutDefault_1595LayoutStrikeProps;
}

export const LayoutDefault_1595LayoutTotalLeftItem = ({ captionText, layout, strike }: LayoutDefault_1595LayoutTotalLeftItemProps) => {
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
            <LayoutDefault_1595LayoutStrike {...strike} />
        </Region>
    );
};

/** Row template `amount_text_left` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: LayoutDefault_1595LayoutAmountTextLeftItemProps) => {
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

/** Row template `currency_indicator_bitmap_left` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutCurrencyIndicatorBitmapLeftItem = ({ layout }: LayoutDefault_1595LayoutCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            params={16}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plus` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutPlusItemProps {
    captionPlus?: string;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutPlusItem = ({ captionPlus, layout }: LayoutDefault_1595LayoutPlusItemProps) => {
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

/** Named region `strike` of LayoutDefault_1595Layout - configured through the parent's `strike` prop. */
export interface LayoutDefault_1595LayoutStrike2Props {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutStrike2 = ({ layout }: LayoutDefault_1595LayoutStrike2Props) => {
    return (
        <Region
            name="strike"
            params={16}
            backgroundColor="#ff0000"
            layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2, ...layout }}
        />
    );
};

/** Row template `total_right` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutTotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: LayoutDefault_1595LayoutStrike2Props;
}

export const LayoutDefault_1595LayoutTotalRightItem = ({ captionText, layout, strike }: LayoutDefault_1595LayoutTotalRightItemProps) => {
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
            <LayoutDefault_1595LayoutStrike2 {...strike} />
        </Region>
    );
};

/** Row template `amount_text_right` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: LayoutDefault_1595LayoutAmountTextRightItemProps) => {
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

/** Row template `currency_indicator_bitmap_right` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutCurrencyIndicatorBitmapRightItem = ({ layout }: LayoutDefault_1595LayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            params={16}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `totalprice_container` of LayoutDefault_1595Layout - configured through the parent's `totalpriceContainer` prop. */
export interface LayoutDefault_1595LayoutTotalpriceContainerProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutTotalpriceContainer = ({ itemsTotalpriceContainer, layout }: LayoutDefault_1595LayoutTotalpriceContainerProps) => {
    return (
        <Region
            name="totalprice_container"
            params={409616}
            layout={{ position: 'absolute', right: 3, top: 1, flexDirection: 'row', ...layout }}
        >
            {itemsTotalpriceContainer ?? (
                <>
                    <LayoutDefault_1595LayoutTotalLeftItem />
                    <LayoutDefault_1595LayoutAmountTextLeftItem />
                    <LayoutDefault_1595LayoutCurrencyIndicatorBitmapLeftItem />
                    <LayoutDefault_1595LayoutPlusItem />
                    <LayoutDefault_1595LayoutTotalRightItem />
                    <LayoutDefault_1595LayoutAmountTextRightItem />
                    <LayoutDefault_1595LayoutCurrencyIndicatorBitmapRightItem />
                </>
            )}
        </Region>
    );
};

/** Named region `totalPriceWidget` of LayoutDefault_1595Layout - configured through the parent's `totalPriceWidget` prop. */
export interface LayoutDefault_1595LayoutTotalPriceWidgetProps {
    layout?: BoxLayout;
    totalpriceContainer?: LayoutDefault_1595LayoutTotalpriceContainerProps;
}

export const LayoutDefault_1595LayoutTotalPriceWidget = ({ layout, totalpriceContainer }: LayoutDefault_1595LayoutTotalPriceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="totalPriceWidget"
            tags={[ 'EMBEDDED' ]}
            params={17424}
            layout={{ position: 'absolute', left: 180, width: 180, bottom: 30, height: 25, ...layout }}
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
            <LayoutDefault_1595LayoutTotalpriceContainer {...totalpriceContainer} />
        </Region>
    );
};

/** Named region `builderWidget` of LayoutDefault_1595Layout - configured through the parent's `builderWidget` prop. */
export interface LayoutDefault_1595LayoutBuilderWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutBuilderWidget = ({ layout }: LayoutDefault_1595LayoutBuilderWidgetProps) => {
    return (
        <Region
            name="builderWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 60, ...layout }}
        />
    );
};

/** Named region `container` of LayoutDefault_1595Layout - configured through the parent's `container` prop. */
export interface LayoutDefault_1595LayoutContainerProps {
    activityPointDisplayWidget?: LayoutDefault_1595LayoutActivityPointDisplayWidgetProps;
    builderWidget?: LayoutDefault_1595LayoutBuilderWidgetProps;
    colourGridWidget?: LayoutDefault_1595LayoutColourGridWidgetProps;
    itemGridWidget?: LayoutDefault_1595LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LayoutDefault_1595LayoutLimitedItemWidgetProps;
    productViewWidget?: LayoutDefault_1595LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutDefault_1595LayoutPurchaseWidgetProps;
    soldLtdItemsWidget?: LayoutDefault_1595LayoutSoldLtdItemsWidgetProps;
    specialInfoWidget?: LayoutDefault_1595LayoutSpecialInfoWidgetProps;
    spinnerWidget?: LayoutDefault_1595LayoutSpinnerWidgetProps;
    totalPriceWidget?: LayoutDefault_1595LayoutTotalPriceWidgetProps;
}

export const LayoutDefault_1595LayoutContainer = ({ activityPointDisplayWidget, builderWidget, colourGridWidget, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, soldLtdItemsWidget, specialInfoWidget, spinnerWidget, totalPriceWidget }: LayoutDefault_1595LayoutContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="container"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 122, top: 243, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog_selectproduct')}
                    textStyle="text-style-u-italic"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <LayoutDefault_1595LayoutProductViewWidget {...productViewWidget} />
            <LayoutDefault_1595LayoutItemGridWidget {...itemGridWidget} />
            <LayoutDefault_1595LayoutColourGridWidget {...colourGridWidget} />
            <LayoutDefault_1595LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutDefault_1595LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
            <LayoutDefault_1595LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutDefault_1595LayoutLimitedItemWidget {...limitedItemWidget} />
            <LayoutDefault_1595LayoutSoldLtdItemsWidget {...soldLtdItemsWidget} />
            <LayoutDefault_1595LayoutSpinnerWidget {...spinnerWidget} />
            <LayoutDefault_1595LayoutTotalPriceWidget {...totalPriceWidget} />
            <LayoutDefault_1595LayoutBuilderWidget {...builderWidget} />
        </Region>
    );
};

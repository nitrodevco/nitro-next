import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1595_layout_default_xml` (layout "layout_default_ubuntu", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1595LayoutProps {
    captionPromoInfo?: string;
    captionQuantityLabel?: string;
    captionTextHeader?: string;
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
    onButtonLess?: () => void;
    onButtonMore?: () => void;
    srcThumbStar?: string;
    visibleButtonLess?: boolean;
    visibleButtonMore?: boolean;
    visibleColourGridWidget?: boolean;
    visibleDiscountContainer?: boolean;
}

export const LayoutDefault_1595Layout = ({ captionPromoInfo, captionQuantityLabel, captionTextHeader, itemsTotalpriceContainer, layout, onButtonLess, onButtonMore, srcThumbStar, visibleButtonLess, visibleButtonMore, visibleColourGridWidget, visibleDiscountContainer }: LayoutDefault_1595LayoutProps) => {
    const t = useTranslation();
    const [ textValueValue, setTextValueValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="container"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
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
                <Region
                    name="productViewWidget"
                    tags={[ 'E' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                />
                <Region
                    name="itemGridWidget"
                    tags={[ 'E' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 155 }}
                />
                <Region
                    name="colourGridWidget"
                    tags={[ 'E' ]}
                    params={1040}
                    visible={visibleColourGridWidget ?? false}
                    layout={{ position: 'absolute', left: 182, width: 176, top: 245, height: 155 }}
                />
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
                <Region
                    name="activityPointDisplayWidget"
                    layout={{ position: 'absolute', left: 182, width: 175, top: 2, height: 25 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 109, width: 142, top: 20, height: 73 }}
                />
                <Region
                    name="limitedItemWidget"
                    layout={{ position: 'absolute', left: 186, width: 174, top: 5, height: 35 }}
                >
                    <WidgetSlot
                        widgetType="limited_item_overlay_supply"
                        name="unique_item_overlay_container"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
                    />
                </Region>
                <Region
                    name="soldLtdItemsWidget"
                    params={1024}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 425, height: 30 }}
                />
                <Region
                    name="spinnerWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={17424}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 405, height: 25 }}
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
                    <Region
                        name="quantitySelection"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 25 }}
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
                </Region>
                <Region
                    name="totalPriceWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={17424}
                    layout={{ position: 'absolute', left: 180, width: 180, top: 405, height: 25 }}
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
                    <Region
                        name="totalprice_container"
                        params={409616}
                        layout={{ position: 'absolute', left: 85, width: 92, top: 1, height: 24, flexDirection: 'row' }}
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
                </Region>
                <Region
                    name="builderWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 400, height: 60 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `total_left` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutTotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutTotalLeftItem = ({ captionText, layout }: LayoutDefault_1595LayoutTotalLeftItemProps) => {
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
            <Region
                name="strike"
                params={16}
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2 }}
            />
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

/** Row template `total_right` of LayoutDefault_1595Layout - pass real rows through its `items…` slot. */
export interface LayoutDefault_1595LayoutTotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const LayoutDefault_1595LayoutTotalRightItem = ({ captionText, layout }: LayoutDefault_1595LayoutTotalRightItemProps) => {
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
            <Region
                name="strike"
                params={16}
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2 }}
            />
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

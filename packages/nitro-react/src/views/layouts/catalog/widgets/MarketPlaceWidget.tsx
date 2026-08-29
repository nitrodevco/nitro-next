import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags, layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `marketPlaceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplace_1621Layout); each passes its own placement through `layout`.
 */
/** Named region `search_selector` of MarketPlaceWidget - configured through the parent's `searchSelector` prop. */
export interface MarketPlaceWidgetSearchSelectorProps {
    layout?: BoxLayout;
    onSearchAdvanced?: () => void;
    onSearchByActivity?: () => void;
    onSearchByValue?: () => void;
}

export const MarketPlaceWidgetSearchSelector = ({ layout, onSearchAdvanced, onSearchByActivity, onSearchByValue }: MarketPlaceWidgetSearchSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="search_selector"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 25, ...layout }}
        >
            <ButtonGroupLeft
                variant="100"
                name="search_by_activity"
                onPointerTap={onSearchByActivity}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 0, right: 253, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
            >
                {t('catalog.marketplace.search_by_activity')}
            </ButtonGroupLeft>
            <ButtonGroupCenter
                variant="100"
                name="search_by_value"
                onPointerTap={onSearchByValue}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 107, right: 147, top: 0, height: 25, minWidth: 106, maxWidth: 106 }}
            >
                {t('catalog.marketplace.search_by_value')}
            </ButtonGroupCenter>
            <ButtonGroupRight
                variant="100"
                name="search_advanced"
                onPointerTap={onSearchAdvanced}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 213, right: 40, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
            >
                {t('catalog.marketplace.search_advanced')}
            </ButtonGroupRight>
        </Region>
    );
};

/** Named region `image_container` of MarketPlaceWidget - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceWidgetImageContainerProps {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const MarketPlaceWidgetImageContainer = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: MarketPlaceWidgetImageContainerProps) => {
    return (
        <Region
            name="image_container"
            layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            >
                <ThemeImage
                    name="unique_item_background_bitmap"
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Region>
            <ThemeImage
                name="item_image"
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_grid"
                name="unique_item_overlay_widget"
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
        </Region>
    );
};

/** Row template `offer_item` of MarketPlaceWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceWidgetOfferItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemUsageState?: string;
    captionOfferCount?: string;
    imageContainer?: MarketPlaceWidgetImageContainerProps;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onMoreButton?: () => void;
}

export const MarketPlaceWidgetOfferItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemUsageState, captionOfferCount, imageContainer, layout, onBuyButton, onMoreButton }: MarketPlaceWidgetOfferItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="offer_item"
            tintColor="#f6f6f3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceWidgetImageContainer {...imageContainer} />
            <Region
                name="item_name"
                layout={{ position: 'absolute', left: 57, width: 74, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                visible={false}
                layout={{ position: 'absolute', left: 57, width: 65, top: 18, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_usage_state"
                visible={false}
                layout={{ position: 'absolute', left: 57, width: 40, top: 18, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemUsageState ?? 'unused'}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_price"
                layout={{ position: 'absolute', left: 57, width: 62, top: 30, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="offer_count"
                layout={{ position: 'absolute', left: 57, width: 62, top: 42, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOfferCount ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Button
                variant="3"
                name="buy_button"
                onPointerTap={onBuyButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 39, top: 6, height: 22 }}
            >
                {t('buy')}
            </Button>
            <Button
                variant="3"
                name="more_button"
                onPointerTap={onMoreButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 197, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.view_more')}
            </Button>
        </Border>
    );
};

/** Named region `offer_list` of MarketPlaceWidget - configured through the parent's `offerList` prop. */
export interface MarketPlaceWidgetOfferListProps {
    itemsOfferList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceWidgetOfferList = ({ itemsOfferList, layout }: MarketPlaceWidgetOfferListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 170, bottom: 13, ...layout }}
        >
            <Region
                name="offer_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsOfferList ?? (
                    <MarketPlaceWidgetOfferItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `marketPlaceWidget` of MarketPlaceWidget - configured through the parent's `marketPlaceWidget` prop. */
export interface MarketPlaceWidgetProps extends CatalogWidgetFlags {
    captionStatusText?: string;
    layout?: BoxLayout;
    offerList?: MarketPlaceWidgetOfferListProps;
    searchSelector?: MarketPlaceWidgetSearchSelectorProps;
}

export const MarketPlaceWidget = ({ captionStatusText, layout, offerList, searchSelector }: MarketPlaceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}>
                <MarketPlaceWidgetSearchSelector {...searchSelector} />
                <Border
                    variant="100"
                    name="search_container"
                    tintColor="#efefef"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 120 }}
                />
                <Region
                    name="status_text"
                    layout={{ position: 'absolute', left: 2, width: 62, top: 155, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusText ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <MarketPlaceWidgetOfferList {...offerList} />
            </Region>
        </Region>
    );
};

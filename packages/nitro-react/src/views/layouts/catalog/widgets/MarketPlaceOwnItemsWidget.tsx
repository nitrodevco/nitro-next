import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `marketPlaceOwnItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplaceOwnItems_1575Layout); each passes its own placement through `layout`.
 */
/** Row template `search_label` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchLabelItemProps {
    captionSearchLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetSearchLabelItem = ({ captionSearchLabel, layout, tags }: MarketPlaceOwnItemsWidgetSearchLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="search_label"
            tags={tags}
            visible={false}
            layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionSearchLabel ?? t('generic.search')} />
        </Region>
    );
};

/** Row template `offer_category_dropmenu` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItemProps {
    layout?: BoxLayout;
    onOfferCategoryDropmenu?: () => void;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem = ({ layout, onOfferCategoryDropmenu, tags }: MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItemProps) => {
    return (
        <Dropmenu
            variant="3"
            name="offer_category_dropmenu"
            tags={tags}
            onPointerTap={onOfferCategoryDropmenu}
            layout={{ width: 90, height: 25, flexShrink: 0, ...layout }}
        >
            OPEN
        </Dropmenu>
    );
};

/** Named region `cancel_search_btn` of MarketPlaceOwnItemsWidget - configured through the parent's `cancelSearchBtn` prop. */
export interface MarketPlaceOwnItemsWidgetCancelSearchBtnProps {
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    tags?: string[];
    visibleCancelSearchBtn?: boolean;
}

export const MarketPlaceOwnItemsWidgetCancelSearchBtn = ({ layout, onCancelSearchBtn, tags, visibleCancelSearchBtn }: MarketPlaceOwnItemsWidgetCancelSearchBtnProps) => {
    return (
        <Region
            name="cancel_search_btn"
            tags={tags}
            visible={visibleCancelSearchBtn ?? false}
            onPointerTap={onCancelSearchBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 137, width: 19, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Row template `search_input_border` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchInputBorderItemProps {
    cancelSearchBtn?: MarketPlaceOwnItemsWidgetCancelSearchBtnProps;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetSearchInputBorderItem = ({ cancelSearchBtn, captionSearchPlaceholder, layout, tags }: MarketPlaceOwnItemsWidgetSearchInputBorderItemProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Border
            variant="105"
            name="search_input_border"
            tags={tags}
            layout={{ width: 160, height: 26, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={searchInputValue}
                onChange={setSearchInputValue}
                maxLength={40}
                layout={{ position: 'absolute', left: 6, right: 3, top: 3, height: 19, minWidth: 151, maxWidth: 151 }}
            />
            <Region
                name="search_placeholder"
                layout={{ position: 'absolute', left: 6, width: 82, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSearchPlaceholder ?? t('catalog.search')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <MarketPlaceOwnItemsWidgetCancelSearchBtn {...cancelSearchBtn} />
        </Border>
    );
};

/** Row template `search_button` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSearchButtonItemProps {
    layout?: BoxLayout;
    onSearchButton?: () => void;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetSearchButtonItem = ({ layout, onSearchButton, tags }: MarketPlaceOwnItemsWidgetSearchButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="search_button"
            tags={tags}
            onPointerTap={onSearchButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 69, height: 25, flexShrink: 0, minWidth: 69, maxWidth: 69, minHeight: 25, maxHeight: 25, ...layout }}
        >
            {t('generic.search')}
        </Button>
    );
};

/** Named region `search_container` of MarketPlaceOwnItemsWidget - configured through the parent's `searchContainer` prop. */
export interface MarketPlaceOwnItemsWidgetSearchContainerProps {
    itemsSearchContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetSearchContainer = ({ itemsSearchContainer, layout, tags }: MarketPlaceOwnItemsWidgetSearchContainerProps) => {
    return (
        <Region
            name="search_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsSearchContainer ?? (
                <>
                    <MarketPlaceOwnItemsWidgetSearchLabelItem />
                    <MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem />
                    <MarketPlaceOwnItemsWidgetSearchInputBorderItem />
                    <MarketPlaceOwnItemsWidgetSearchButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `image_container` of MarketPlaceOwnItemsWidget - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetImageContainerProps {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetImageContainer = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap, tags }: MarketPlaceOwnItemsWidgetImageContainerProps) => {
    return (
        <Region
            name="image_container"
            tags={tags}
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
                tags={[ 'BITMAP' ]}
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

/** Row template `ongoing_item` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetOngoingItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemTime?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetImageContainerProps;
    layout?: BoxLayout;
    onPickButton?: () => void;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetOngoingItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemTime, imageContainer, layout, onPickButton, tags }: MarketPlaceOwnItemsWidgetOngoingItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="ongoing_item"
            tags={tags}
            tintColor="#f6f6f3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetImageContainer {...imageContainer} />
            <Region
                name="item_name"
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_price"
                layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_time"
                layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTime ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Button
                variant="3"
                name="pick_button"
                onPointerTap={onPickButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 189, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.offer.pick')}
            </Button>
        </Border>
    );
};

/** Named region `image_container` of MarketPlaceOwnItemsWidget - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetImageContainer2Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetImageContainer2 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap, tags }: MarketPlaceOwnItemsWidgetImageContainer2Props) => {
    return (
        <Region
            name="image_container"
            tags={tags}
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
                tags={[ 'BITMAP' ]}
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

/** Row template `sold_item` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetSoldItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemSold?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetImageContainer2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetSoldItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemSold, imageContainer, layout, tags }: MarketPlaceOwnItemsWidgetSoldItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="sold_item"
            tags={tags}
            tintColor="#e2f5d8"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetImageContainer2 {...imageContainer} />
            <Region
                name="item_name"
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_price"
                layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_sold"
                layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemSold ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
        </Border>
    );
};

/** Named region `image_container` of MarketPlaceOwnItemsWidget - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetImageContainer3Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetImageContainer3 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap, tags }: MarketPlaceOwnItemsWidgetImageContainer3Props) => {
    return (
        <Region
            name="image_container"
            tags={tags}
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
                tags={[ 'BITMAP' ]}
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

/** Row template `expired_item` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetExpiredItemItemProps {
    captionItemDesc?: string;
    captionItemExpired?: string;
    captionItemName?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetImageContainer3Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetExpiredItemItem = ({ captionItemDesc, captionItemExpired, captionItemName, imageContainer, layout, tags }: MarketPlaceOwnItemsWidgetExpiredItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="expired_item"
            tags={tags}
            tintColor="#f5d5d3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetImageContainer3 {...imageContainer} />
            <Region
                name="item_name"
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_expired"
                layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemExpired ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
        </Border>
    );
};

/** Named region `item_list` of MarketPlaceOwnItemsWidget - configured through the parent's `itemList` prop. */
export interface MarketPlaceOwnItemsWidgetItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MarketPlaceOwnItemsWidgetItemList = ({ itemsItemList, layout, tags }: MarketPlaceOwnItemsWidgetItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 72, bottom: 36, ...layout }}
        >
            <Region
                name="item_list"
                tags={tags}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsItemList ?? (
                    <>
                        <MarketPlaceOwnItemsWidgetOngoingItemItem />
                        <MarketPlaceOwnItemsWidgetSoldItemItem />
                        <MarketPlaceOwnItemsWidgetExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `marketPlaceOwnItemsWidget` of MarketPlaceOwnItemsWidget - configured through the parent's `marketPlaceOwnItemsWidget` prop. */
export interface MarketPlaceOwnItemsWidgetProps {
    captionRedeemInfo?: string;
    captionStatusText?: string;
    itemList?: MarketPlaceOwnItemsWidgetItemListProps;
    layout?: BoxLayout;
    onMarkAsSeenButton?: () => void;
    onRecallAllButton?: () => void;
    searchContainer?: MarketPlaceOwnItemsWidgetSearchContainerProps;
    tags?: string[];
    visibleMarkAsSeenButton?: boolean;
}

export const MarketPlaceOwnItemsWidget = ({ captionRedeemInfo, captionStatusText, itemList, layout, onMarkAsSeenButton, onRecallAllButton, searchContainer, tags, visibleMarkAsSeenButton }: MarketPlaceOwnItemsWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceOwnItemsWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="redeem_info"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 57, minWidth: 340, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRedeemInfo ?? t('catalog.marketplace.own_info')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                />
            </Region>
            <MarketPlaceOwnItemsWidgetSearchContainer {...searchContainer} />
            <Region
                name="status_text"
                layout={{ position: 'absolute', left: 0, width: 62, bottom: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusText ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Button
                variant="3"
                name="recall_all_button"
                tintColor="#e33934"
                onPointerTap={onRecallAllButton}
                textStyle="text-style-il-regular-white"
                layout={{ position: 'absolute', right: 21, width: 64, bottom: 2, height: 24 }}
            >
                {t('shop.marketplace.recall.all.button')}
            </Button>
            <Region
                visible={visibleMarkAsSeenButton ?? false}
                layout={{ position: 'absolute', right: 21, width: 90, bottom: 2, height: 24 }}
            >
                <Button
                    variant="3"
                    name="mark_as_seen_button"
                    onPointerTap={onMarkAsSeenButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('shop.marketplace.mark.as.seen.button')}
                </Button>
            </Region>
            <MarketPlaceOwnItemsWidgetItemList
                tags={[ 'own_items_grid' ]}
                {...itemList}
            />
        </Region>
    );
};

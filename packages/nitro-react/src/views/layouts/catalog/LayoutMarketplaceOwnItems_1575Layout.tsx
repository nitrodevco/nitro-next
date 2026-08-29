import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1575_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1575LayoutProps {
    ctlgMarketplaceOwnItems?: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575Layout = ({ ctlgMarketplaceOwnItems, layout }: LayoutMarketplaceOwnItems_1575LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems {...ctlgMarketplaceOwnItems} />
        </Region>
    );
};

/** Row template `search_label` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutSearchLabelItemProps {
    captionSearchLabel?: string;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutSearchLabelItem = ({ captionSearchLabel, layout }: LayoutMarketplaceOwnItems_1575LayoutSearchLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="search_label"
            params={16}
            visible={false}
            layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionSearchLabel ?? t('generic.search')} />
        </Region>
    );
};

/** Row template `offer_category_dropmenu` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutOfferCategoryDropmenuItemProps {
    layout?: BoxLayout;
    onOfferCategoryDropmenu?: () => void;
}

export const LayoutMarketplaceOwnItems_1575LayoutOfferCategoryDropmenuItem = ({ layout, onOfferCategoryDropmenu }: LayoutMarketplaceOwnItems_1575LayoutOfferCategoryDropmenuItemProps) => {
    return (
        <Dropmenu
            variant="3"
            name="offer_category_dropmenu"
            params={17}
            onPointerTap={onOfferCategoryDropmenu}
            layout={{ width: 90, height: 25, flexShrink: 0, ...layout }}
        >
            OPEN
        </Dropmenu>
    );
};

/** Named region `cancel_search_btn` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `cancelSearchBtn` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutCancelSearchBtnProps {
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const LayoutMarketplaceOwnItems_1575LayoutCancelSearchBtn = ({ layout, onCancelSearchBtn, visibleCancelSearchBtn }: LayoutMarketplaceOwnItems_1575LayoutCancelSearchBtnProps) => {
    return (
        <Region
            name="cancel_search_btn"
            params={17}
            visible={visibleCancelSearchBtn ?? false}
            onPointerTap={onCancelSearchBtn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 137, width: 19, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Row template `search_input_border` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutSearchInputBorderItemProps {
    cancelSearchBtn?: LayoutMarketplaceOwnItems_1575LayoutCancelSearchBtnProps;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutSearchInputBorderItem = ({ cancelSearchBtn, captionSearchPlaceholder, layout }: LayoutMarketplaceOwnItems_1575LayoutSearchInputBorderItemProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Border
            variant="105"
            name="search_input_border"
            params={16}
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
                params={16}
                layout={{ position: 'absolute', left: 6, width: 82, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSearchPlaceholder ?? t('catalog.search')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <LayoutMarketplaceOwnItems_1575LayoutCancelSearchBtn {...cancelSearchBtn} />
        </Border>
    );
};

/** Row template `search_button` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutSearchButtonItemProps {
    layout?: BoxLayout;
    onSearchButton?: () => void;
}

export const LayoutMarketplaceOwnItems_1575LayoutSearchButtonItem = ({ layout, onSearchButton }: LayoutMarketplaceOwnItems_1575LayoutSearchButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="search_button"
            params={393233}
            onPointerTap={onSearchButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 69, height: 25, flexShrink: 0, minWidth: 69, maxWidth: 69, minHeight: 25, maxHeight: 25, ...layout }}
        >
            {t('generic.search')}
        </Button>
    );
};

/** Named region `search_container` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `searchContainer` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutSearchContainerProps {
    itemsSearchContainer?: ReactNode;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutSearchContainer = ({ itemsSearchContainer, layout }: LayoutMarketplaceOwnItems_1575LayoutSearchContainerProps) => {
    return (
        <Region
            name="search_container"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsSearchContainer ?? (
                <>
                    <LayoutMarketplaceOwnItems_1575LayoutSearchLabelItem />
                    <LayoutMarketplaceOwnItems_1575LayoutOfferCategoryDropmenuItem />
                    <LayoutMarketplaceOwnItems_1575LayoutSearchInputBorderItem />
                    <LayoutMarketplaceOwnItems_1575LayoutSearchButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `image_container` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `imageContainer` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutImageContainerProps {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const LayoutMarketplaceOwnItems_1575LayoutImageContainer = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: LayoutMarketplaceOwnItems_1575LayoutImageContainerProps) => {
    return (
        <Region
            name="image_container"
            params={16}
            layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            >
                <ThemeImage
                    name="unique_item_background_bitmap"
                    params={16}
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Region>
            <ThemeImage
                name="item_image"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_grid"
                name="unique_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
        </Region>
    );
};

/** Row template `ongoing_item` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutOngoingItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemTime?: string;
    imageContainer?: LayoutMarketplaceOwnItems_1575LayoutImageContainerProps;
    layout?: BoxLayout;
    onPickButton?: () => void;
}

export const LayoutMarketplaceOwnItems_1575LayoutOngoingItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemTime, imageContainer, layout, onPickButton }: LayoutMarketplaceOwnItems_1575LayoutOngoingItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="ongoing_item"
            params={17}
            tintColor="#f6f6f3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <LayoutMarketplaceOwnItems_1575LayoutImageContainer {...imageContainer} />
            <Region
                name="item_name"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_price"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_time"
                params={16}
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
                params={393233}
                onPointerTap={onPickButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 189, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.offer.pick')}
            </Button>
        </Border>
    );
};

/** Named region `image_container` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `imageContainer` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutImageContainer2Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const LayoutMarketplaceOwnItems_1575LayoutImageContainer2 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: LayoutMarketplaceOwnItems_1575LayoutImageContainer2Props) => {
    return (
        <Region
            name="image_container"
            params={16}
            layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            >
                <ThemeImage
                    name="unique_item_background_bitmap"
                    params={16}
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Region>
            <ThemeImage
                name="item_image"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_grid"
                name="unique_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
        </Region>
    );
};

/** Row template `sold_item` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutSoldItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemSold?: string;
    imageContainer?: LayoutMarketplaceOwnItems_1575LayoutImageContainer2Props;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutSoldItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemSold, imageContainer, layout }: LayoutMarketplaceOwnItems_1575LayoutSoldItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="sold_item"
            params={17}
            tintColor="#e2f5d8"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <LayoutMarketplaceOwnItems_1575LayoutImageContainer2 {...imageContainer} />
            <Region
                name="item_name"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_price"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_sold"
                params={16}
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

/** Named region `image_container` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `imageContainer` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutImageContainer3Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const LayoutMarketplaceOwnItems_1575LayoutImageContainer3 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: LayoutMarketplaceOwnItems_1575LayoutImageContainer3Props) => {
    return (
        <Region
            name="image_container"
            params={16}
            layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            >
                <ThemeImage
                    name="unique_item_background_bitmap"
                    params={16}
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Region>
            <ThemeImage
                name="item_image"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_grid"
                name="unique_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
            />
        </Region>
    );
};

/** Row template `expired_item` of LayoutMarketplaceOwnItems_1575Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplaceOwnItems_1575LayoutExpiredItemItemProps {
    captionItemDesc?: string;
    captionItemExpired?: string;
    captionItemName?: string;
    imageContainer?: LayoutMarketplaceOwnItems_1575LayoutImageContainer3Props;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutExpiredItemItem = ({ captionItemDesc, captionItemExpired, captionItemName, imageContainer, layout }: LayoutMarketplaceOwnItems_1575LayoutExpiredItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="expired_item"
            params={17}
            tintColor="#f5d5d3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <LayoutMarketplaceOwnItems_1575LayoutImageContainer3 {...imageContainer} />
            <Region
                name="item_name"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                params={16}
                layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="item_expired"
                params={16}
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

/** Named region `item_list` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `itemList` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575LayoutItemList = ({ itemsItemList, layout }: LayoutMarketplaceOwnItems_1575LayoutItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 72, bottom: 36, ...layout }}
        >
            <Region
                name="item_list"
                tags={[ 'own_items_grid' ]}
                params={2064}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsItemList ?? (
                    <>
                        <LayoutMarketplaceOwnItems_1575LayoutOngoingItemItem />
                        <LayoutMarketplaceOwnItems_1575LayoutSoldItemItem />
                        <LayoutMarketplaceOwnItems_1575LayoutExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `marketPlaceOwnItemsWidget` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `marketPlaceOwnItemsWidget` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutMarketPlaceOwnItemsWidgetProps {
    captionRedeemInfo?: string;
    captionStatusText?: string;
    itemList?: LayoutMarketplaceOwnItems_1575LayoutItemListProps;
    layout?: BoxLayout;
    onMarkAsSeenButton?: () => void;
    onRecallAllButton?: () => void;
    searchContainer?: LayoutMarketplaceOwnItems_1575LayoutSearchContainerProps;
    visibleMarkAsSeenButton?: boolean;
}

export const LayoutMarketplaceOwnItems_1575LayoutMarketPlaceOwnItemsWidget = ({ captionRedeemInfo, captionStatusText, itemList, layout, onMarkAsSeenButton, onRecallAllButton, searchContainer, visibleMarkAsSeenButton }: LayoutMarketplaceOwnItems_1575LayoutMarketPlaceOwnItemsWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceOwnItemsWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="redeem_info"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 57, minWidth: 340, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRedeemInfo ?? t('catalog.marketplace.own_info')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                />
            </Region>
            <LayoutMarketplaceOwnItems_1575LayoutSearchContainer {...searchContainer} />
            <Region
                name="status_text"
                params={1040}
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
                params={394257}
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
                    params={394257}
                    onPointerTap={onMarkAsSeenButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('shop.marketplace.mark.as.seen.button')}
                </Button>
            </Region>
            <LayoutMarketplaceOwnItems_1575LayoutItemList {...itemList} />
        </Region>
    );
};

/** Named region `ctlg_marketplace_own_items` of LayoutMarketplaceOwnItems_1575Layout - configured through the parent's `ctlgMarketplaceOwnItems` prop. */
export interface LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps {
    layout?: BoxLayout;
    marketPlaceOwnItemsWidget?: LayoutMarketplaceOwnItems_1575LayoutMarketPlaceOwnItemsWidgetProps;
}

export const LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems = ({ layout, marketPlaceOwnItemsWidget }: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps) => {
    return (
        <Region
            name="ctlg_marketplace_own_items"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutMarketplaceOwnItems_1575LayoutMarketPlaceOwnItemsWidget {...marketPlaceOwnItemsWidget} />
        </Region>
    );
};

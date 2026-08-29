import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1704_marketPlaceOwnItemsWidget_xml` (layout "marketPlaceOwnItemsWidget", 340x390) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketPlaceOwnItemsWidgetLayoutProps {
    layout?: BoxLayout;
    marketPlaceContent?: MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps;
}

export const MarketPlaceOwnItemsWidgetLayout = ({ layout, marketPlaceContent }: MarketPlaceOwnItemsWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 390, ...layout }}>
            <MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent {...marketPlaceContent} />
        </Region>
    );
};

/** Named region `image_container` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutImageContainerProps {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const MarketPlaceOwnItemsWidgetLayoutImageContainer = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: MarketPlaceOwnItemsWidgetLayoutImageContainerProps) => {
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

/** Row template `ongoing_item` of MarketPlaceOwnItemsWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetLayoutOngoingItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemTime?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetLayoutImageContainerProps;
    layout?: BoxLayout;
    onPickButton?: () => void;
}

export const MarketPlaceOwnItemsWidgetLayoutOngoingItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemTime, imageContainer, layout, onPickButton }: MarketPlaceOwnItemsWidgetLayoutOngoingItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="ongoing_item"
            params={17}
            tintColor="#e3e3e3"
            layout={{ width: 320, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetLayoutImageContainer {...imageContainer} />
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
                layout={{ position: 'absolute', left: 58, width: 61, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', right: 6, width: 73, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.offer.pick')}
            </Button>
        </Border>
    );
};

/** Named region `image_container` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutImageContainer2Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const MarketPlaceOwnItemsWidgetLayoutImageContainer2 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: MarketPlaceOwnItemsWidgetLayoutImageContainer2Props) => {
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

/** Row template `sold_item` of MarketPlaceOwnItemsWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetLayoutSoldItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemSold?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetLayoutImageContainer2Props;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutSoldItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemSold, imageContainer, layout }: MarketPlaceOwnItemsWidgetLayoutSoldItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="sold_item"
            params={17}
            tintColor="#e3e3e3"
            layout={{ width: 320, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetLayoutImageContainer2 {...imageContainer} />
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
                layout={{ position: 'absolute', left: 58, width: 61, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Named region `image_container` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `imageContainer` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutImageContainer3Props {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const MarketPlaceOwnItemsWidgetLayoutImageContainer3 = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: MarketPlaceOwnItemsWidgetLayoutImageContainer3Props) => {
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

/** Row template `expired_item` of MarketPlaceOwnItemsWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetLayoutExpiredItemItemProps {
    captionItemDesc?: string;
    captionItemExpired?: string;
    captionItemName?: string;
    imageContainer?: MarketPlaceOwnItemsWidgetLayoutImageContainer3Props;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutExpiredItemItem = ({ captionItemDesc, captionItemExpired, captionItemName, imageContainer, layout }: MarketPlaceOwnItemsWidgetLayoutExpiredItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="expired_item"
            params={17}
            tintColor="#e3e3e3"
            layout={{ width: 320, height: 58, flexShrink: 0, ...layout }}
        >
            <MarketPlaceOwnItemsWidgetLayoutImageContainer3 {...imageContainer} />
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
                layout={{ position: 'absolute', left: 58, width: 61, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Named region `item_list` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `itemList` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutItemList = ({ itemsItemList, layout }: MarketPlaceOwnItemsWidgetLayoutItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 340, top: 120, height: 265, ...layout }}
        >
            <Region
                name="item_list"
                tags={[ 'own_items_grid' ]}
                params={16}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsItemList ?? (
                    <>
                        <MarketPlaceOwnItemsWidgetLayoutOngoingItemItem />
                        <MarketPlaceOwnItemsWidgetLayoutSoldItemItem />
                        <MarketPlaceOwnItemsWidgetLayoutExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `market_place_content` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `marketPlaceContent` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps {
    captionRedeemInfo?: string;
    captionStatusText?: string;
    itemList?: MarketPlaceOwnItemsWidgetLayoutItemListProps;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent = ({ captionRedeemInfo, captionStatusText, itemList, layout }: MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="market_place_content"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 390, ...layout }}
        >
            <Region
                name="redeem_info"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRedeemInfo ?? t('lorem.header')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                />
            </Region>
            <Region
                name="status_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 62, top: 96, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusText ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <MarketPlaceOwnItemsWidgetLayoutItemList {...itemList} />
        </Region>
    );
};

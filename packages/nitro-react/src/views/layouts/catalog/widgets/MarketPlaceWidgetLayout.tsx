import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1596_marketPlaceWidget_xml` (layout "marketPlaceWidget", 360x390) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketPlaceWidgetLayoutProps {
    captionStatusText?: string;
    layout?: BoxLayout;
    offerList?: MarketPlaceWidgetLayoutOfferListProps;
    onSearchAdvanced?: () => void;
    onSearchByActivity?: () => void;
    onSearchByValue?: () => void;
}

export const MarketPlaceWidgetLayout = ({ captionStatusText, layout, offerList, onSearchAdvanced, onSearchByActivity, onSearchByValue }: MarketPlaceWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 390, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 390 }}>
                <Region
                    name="search_selector"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 25 }}
                >
                    <ButtonGroupLeft
                        variant="100"
                        name="search_by_activity"
                        onPointerTap={onSearchByActivity}
                        layout={{ position: 'absolute', left: 0, right: 233, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_by_activity')}
                    </ButtonGroupLeft>
                    <ButtonGroupCenter
                        variant="100"
                        name="search_by_value"
                        onPointerTap={onSearchByValue}
                        layout={{ position: 'absolute', left: 107, right: 127, top: 0, height: 25, minWidth: 106, maxWidth: 106 }}
                    >
                        {t('catalog.marketplace.search_by_value')}
                    </ButtonGroupCenter>
                    <ButtonGroupRight
                        variant="100"
                        name="search_advanced"
                        onPointerTap={onSearchAdvanced}
                        layout={{ position: 'absolute', left: 213, right: 20, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_advanced')}
                    </ButtonGroupRight>
                </Region>
                <Border
                    variant="100"
                    name="search_container"
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
                <MarketPlaceWidgetLayoutOfferList {...offerList} />
            </Region>
        </Region>
    );
};

/** Row template `offer_item` of MarketPlaceWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceWidgetLayoutOfferItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionOfferCount?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onMoreButton?: () => void;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MarketPlaceWidgetLayoutOfferItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionOfferCount, layout, onBuyButton, onMoreButton, srcItemImage, srcUniqueItemBackgroundBitmap, visibleRarityItemOverlayWidget, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayWidget }: MarketPlaceWidgetLayoutOfferItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="offer_item"
            tintColor="#e3e3e3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <Region
                name="image_container"
                layout={{ position: 'absolute', left: 9, width: 40, top: 9, height: 40 }}
            >
                {(visibleUniqueItemBackgroundBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_background_bitmap"
                        src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                />
                {(visibleUniqueItemOverlayWidget ?? false) && (
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_widget"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
                {(visibleRarityItemOverlayWidget ?? false) && (
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_widget"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                )}
            </Region>
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
                layout={{ position: 'absolute', left: 57, width: 61, top: 18, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
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
                layout={{ position: 'absolute', right: 6, width: 39, top: 6, height: 22 }}
            >
                {t('buy')}
            </Button>
            <Button
                variant="3"
                name="more_button"
                onPointerTap={onMoreButton}
                layout={{ position: 'absolute', right: 6, width: 197, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.view_more')}
            </Button>
        </Border>
    );
};

/** Named region `offer_list` of MarketPlaceWidgetLayout - configured through the parent's `offerList` prop. */
export interface MarketPlaceWidgetLayoutOfferListProps {
    itemsOfferList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceWidgetLayoutOfferList = ({ itemsOfferList, layout }: MarketPlaceWidgetLayoutOfferListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 170, height: 220, ...layout }}
        >
            <Region
                name="offer_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsOfferList ?? (
                    <MarketPlaceWidgetLayoutOfferItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};

import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1621_layout_marketplace_xml` (layout "ctlg_marketplace", 360x608) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplace_1621LayoutProps {
    ctlgMarketplace?: LayoutMarketplace_1621LayoutCtlgMarketplaceProps;
    layout?: BoxLayout;
}

export const LayoutMarketplace_1621Layout = ({ ctlgMarketplace, layout }: LayoutMarketplace_1621LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 608, ...layout }}>
            <LayoutMarketplace_1621LayoutCtlgMarketplace {...ctlgMarketplace} />
        </Region>
    );
};

/** Named region `search_selector` of LayoutMarketplace_1621Layout - configured through the parent's `searchSelector` prop. */
export interface LayoutMarketplace_1621LayoutSearchSelectorProps {
    layout?: BoxLayout;
    onSearchAdvanced?: () => void;
    onSearchByActivity?: () => void;
    onSearchByValue?: () => void;
}

export const LayoutMarketplace_1621LayoutSearchSelector = ({ layout, onSearchAdvanced, onSearchByActivity, onSearchByValue }: LayoutMarketplace_1621LayoutSearchSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="search_selector"
            params={17}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 25, ...layout }}
        >
            <ButtonGroupLeft
                variant="100"
                name="search_by_activity"
                params={131217}
                onPointerTap={onSearchByActivity}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 0, right: 253, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
            >
                {t('catalog.marketplace.search_by_activity')}
            </ButtonGroupLeft>
            <ButtonGroupCenter
                variant="100"
                name="search_by_value"
                params={131217}
                onPointerTap={onSearchByValue}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 107, right: 147, top: 0, height: 25, minWidth: 106, maxWidth: 106 }}
            >
                {t('catalog.marketplace.search_by_value')}
            </ButtonGroupCenter>
            <ButtonGroupRight
                variant="100"
                name="search_advanced"
                params={131217}
                onPointerTap={onSearchAdvanced}
                textStyle="text-style-il-button"
                layout={{ position: 'absolute', left: 213, right: 40, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
            >
                {t('catalog.marketplace.search_advanced')}
            </ButtonGroupRight>
        </Region>
    );
};

/** Named region `image_container` of LayoutMarketplace_1621Layout - configured through the parent's `imageContainer` prop. */
export interface LayoutMarketplace_1621LayoutImageContainerProps {
    layout?: BoxLayout;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const LayoutMarketplace_1621LayoutImageContainer = ({ layout, srcItemImage, srcUniqueItemBackgroundBitmap }: LayoutMarketplace_1621LayoutImageContainerProps) => {
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

/** Row template `offer_item` of LayoutMarketplace_1621Layout - pass real rows through its `items…` slot. */
export interface LayoutMarketplace_1621LayoutOfferItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemUsageState?: string;
    captionOfferCount?: string;
    imageContainer?: LayoutMarketplace_1621LayoutImageContainerProps;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onMoreButton?: () => void;
}

export const LayoutMarketplace_1621LayoutOfferItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemUsageState, captionOfferCount, imageContainer, layout, onBuyButton, onMoreButton }: LayoutMarketplace_1621LayoutOfferItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="offer_item"
            params={17}
            tintColor="#f6f6f3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            <LayoutMarketplace_1621LayoutImageContainer {...imageContainer} />
            <Region
                name="item_name"
                params={16}
                layout={{ position: 'absolute', left: 57, width: 74, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_desc"
                params={16}
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
                params={16}
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
                params={16}
                layout={{ position: 'absolute', left: 57, width: 62, top: 30, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="offer_count"
                params={16}
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
                params={393233}
                onPointerTap={onBuyButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 39, top: 6, height: 22 }}
            >
                {t('buy')}
            </Button>
            <Button
                variant="3"
                name="more_button"
                params={393233}
                onPointerTap={onMoreButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 6, width: 197, top: 31, height: 22 }}
            >
                {t('catalog.marketplace.view_more')}
            </Button>
        </Border>
    );
};

/** Named region `offer_list` of LayoutMarketplace_1621Layout - configured through the parent's `offerList` prop. */
export interface LayoutMarketplace_1621LayoutOfferListProps {
    itemsOfferList?: ReactNode;
    layout?: BoxLayout;
}

export const LayoutMarketplace_1621LayoutOfferList = ({ itemsOfferList, layout }: LayoutMarketplace_1621LayoutOfferListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 170, bottom: 13, ...layout }}
        >
            <Region
                name="offer_list"
                params={2064}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsOfferList ?? (
                    <LayoutMarketplace_1621LayoutOfferItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `marketPlaceWidget` of LayoutMarketplace_1621Layout - configured through the parent's `marketPlaceWidget` prop. */
export interface LayoutMarketplace_1621LayoutMarketPlaceWidgetProps {
    captionStatusText?: string;
    layout?: BoxLayout;
    offerList?: LayoutMarketplace_1621LayoutOfferListProps;
    searchSelector?: LayoutMarketplace_1621LayoutSearchSelectorProps;
}

export const LayoutMarketplace_1621LayoutMarketPlaceWidget = ({ captionStatusText, layout, offerList, searchSelector }: LayoutMarketplace_1621LayoutMarketPlaceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <LayoutMarketplace_1621LayoutSearchSelector {...searchSelector} />
                <Border
                    variant="100"
                    name="search_container"
                    params={16}
                    tintColor="#efefef"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 120 }}
                />
                <Region
                    name="status_text"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 62, top: 155, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusText ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <LayoutMarketplace_1621LayoutOfferList {...offerList} />
            </Region>
        </Region>
    );
};

/** Named region `ctlg_marketplace` of LayoutMarketplace_1621Layout - configured through the parent's `ctlgMarketplace` prop. */
export interface LayoutMarketplace_1621LayoutCtlgMarketplaceProps {
    layout?: BoxLayout;
    marketPlaceWidget?: LayoutMarketplace_1621LayoutMarketPlaceWidgetProps;
}

export const LayoutMarketplace_1621LayoutCtlgMarketplace = ({ layout, marketPlaceWidget }: LayoutMarketplace_1621LayoutCtlgMarketplaceProps) => {
    return (
        <Region
            name="ctlg_marketplace"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutMarketplace_1621LayoutMarketPlaceWidget {...marketPlaceWidget} />
        </Region>
    );
};

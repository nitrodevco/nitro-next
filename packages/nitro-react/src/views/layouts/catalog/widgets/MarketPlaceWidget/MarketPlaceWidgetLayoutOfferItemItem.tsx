import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `offer_item` of MarketPlaceWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceWidgetLayoutOfferItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionOfferCount?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onMoreButton?: () => void;
    rarityItemOverlayWidget?: ReactNode;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tintItemImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleBuyButton?: boolean;
    visibleImageContainer?: boolean;
    visibleItemDesc?: boolean;
    visibleItemImage?: boolean;
    visibleItemName?: boolean;
    visibleItemPrice?: boolean;
    visibleMoreButton?: boolean;
    visibleOfferCount?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MarketPlaceWidgetLayoutOfferItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionOfferCount, layout, onBuyButton, onMoreButton, rarityItemOverlayWidget, srcItemImage, srcUniqueItemBackgroundBitmap, tintItemImage, uniqueItemOverlayWidget, visibleBuyButton, visibleImageContainer, visibleItemDesc, visibleItemImage, visibleItemName, visibleItemPrice, visibleMoreButton, visibleOfferCount, visibleRarityItemOverlayWidget, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayWidget }: MarketPlaceWidgetLayoutOfferItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="offer_item"
            tintColor="#e3e3e3"
            layout={{ width: 340, height: 58, flexShrink: 0, ...layout }}
        >
            {(visibleImageContainer ?? true) && (
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
                    {(visibleItemImage ?? true) && (
                        <ThemeImage
                            name="item_image"
                            src={srcItemImage}
                            tint={tintItemImage}
                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                        />
                    )}
                    {(visibleUniqueItemOverlayWidget ?? false) && (
                        <WidgetSlot
                            widgetType="limited_item_overlay_grid"
                            name="unique_item_overlay_widget"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {uniqueItemOverlayWidget}
                        </WidgetSlot>
                    )}
                    {(visibleRarityItemOverlayWidget ?? false) && (
                        <WidgetSlot
                            widgetType="rarity_item_overlay_grid"
                            name="rarity_item_overlay_widget"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {rarityItemOverlayWidget}
                        </WidgetSlot>
                    )}
                </Region>
            )}
            {(visibleItemName ?? true) && (
                <Region
                    name="item_name"
                    layout={{ position: 'absolute', left: 57, width: 74, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemName ?? t('lorem.title')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleItemDesc ?? true) && (
                <Region
                    name="item_desc"
                    layout={{ position: 'absolute', left: 57, width: 61, top: 18, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemDesc ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleItemPrice ?? true) && (
                <Region
                    name="item_price"
                    layout={{ position: 'absolute', left: 57, width: 62, top: 30, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemPrice ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleOfferCount ?? true) && (
                <Region
                    name="offer_count"
                    layout={{ position: 'absolute', left: 57, width: 62, top: 42, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOfferCount ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleBuyButton ?? true) && (
                <Button
                    variant="3"
                    name="buy_button"
                    onPointerTap={onBuyButton}
                    layout={{ position: 'absolute', right: 6, width: 39, top: 6, height: 22 }}
                >
                    {t('buy')}
                </Button>
            )}
            {(visibleMoreButton ?? true) && (
                <Button
                    variant="3"
                    name="more_button"
                    onPointerTap={onMoreButton}
                    layout={{ position: 'absolute', right: 6, width: 197, top: 31, height: 22 }}
                >
                    {t('catalog.marketplace.view_more')}
                </Button>
            )}
        </Border>
    );
};

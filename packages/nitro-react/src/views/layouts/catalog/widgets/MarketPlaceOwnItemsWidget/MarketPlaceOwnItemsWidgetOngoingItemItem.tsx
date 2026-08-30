import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `ongoing_item` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetOngoingItemItemProps {
    captionItemDesc?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionItemTime?: string;
    layout?: BoxLayout;
    onPickButton?: () => void;
    rarityItemOverlayWidget?: ReactNode;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tintItemImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleImageContainer?: boolean;
    visibleItemDesc?: boolean;
    visibleItemImage?: boolean;
    visibleItemName?: boolean;
    visibleItemPrice?: boolean;
    visibleItemTime?: boolean;
    visiblePickButton?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MarketPlaceOwnItemsWidgetOngoingItemItem = ({ captionItemDesc, captionItemName, captionItemPrice, captionItemTime, layout, onPickButton, rarityItemOverlayWidget, srcItemImage, srcUniqueItemBackgroundBitmap, tintItemImage, uniqueItemOverlayWidget, visibleImageContainer, visibleItemDesc, visibleItemImage, visibleItemName, visibleItemPrice, visibleItemTime, visiblePickButton, visibleRarityItemOverlayWidget, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayWidget }: MarketPlaceOwnItemsWidgetOngoingItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="ongoing_item"
            tintColor="#f6f6f3"
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
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    name="item_name"
                    layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17 }}
                />
            )}
            {(visibleItemDesc ?? true) && (
                <ThemeText
                    text={captionItemDesc ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    name="item_desc"
                    layout={{ position: 'absolute', left: 58, width: 65, top: 17, height: 15 }}
                />
            )}
            {(visibleItemPrice ?? true) && (
                <ThemeText
                    text={captionItemPrice ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    name="item_price"
                    layout={{ position: 'absolute', left: 58, width: 62, top: 29, height: 15 }}
                />
            )}
            {(visibleItemTime ?? true) && (
                <ThemeText
                    text={captionItemTime ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    name="item_time"
                    layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15 }}
                />
            )}
            {(visiblePickButton ?? true) && (
                <Button
                    variant="3"
                    name="pick_button"
                    onPointerTap={onPickButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 6, width: 189, top: 31, height: 22 }}
                >
                    {t('catalog.marketplace.offer.pick')}
                </Button>
            )}
        </Border>
    );
};

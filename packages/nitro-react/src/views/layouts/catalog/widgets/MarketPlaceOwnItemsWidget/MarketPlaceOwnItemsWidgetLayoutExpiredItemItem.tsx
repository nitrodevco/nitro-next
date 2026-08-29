import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `expired_item` of MarketPlaceOwnItemsWidgetLayout - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetLayoutExpiredItemItemProps {
    captionItemDesc?: string;
    captionItemExpired?: string;
    captionItemName?: string;
    layout?: BoxLayout;
    rarityItemOverlayWidget?: ReactNode;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tintItemImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleImageContainer?: boolean;
    visibleItemDesc?: boolean;
    visibleItemExpired?: boolean;
    visibleItemImage?: boolean;
    visibleItemName?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MarketPlaceOwnItemsWidgetLayoutExpiredItemItem = ({ captionItemDesc, captionItemExpired, captionItemName, layout, rarityItemOverlayWidget, srcItemImage, srcUniqueItemBackgroundBitmap, tintItemImage, uniqueItemOverlayWidget, visibleImageContainer, visibleItemDesc, visibleItemExpired, visibleItemImage, visibleItemName, visibleRarityItemOverlayWidget, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayWidget }: MarketPlaceOwnItemsWidgetLayoutExpiredItemItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="100"
            name="expired_item"
            tintColor="#e3e3e3"
            layout={{ width: 320, height: 58, flexShrink: 0, ...layout }}
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
                    layout={{ position: 'absolute', left: 58, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    layout={{ position: 'absolute', left: 58, width: 61, top: 17, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemDesc ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
            {(visibleItemExpired ?? true) && (
                <Region
                    name="item_expired"
                    layout={{ position: 'absolute', left: 58, width: 62, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemExpired ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
            )}
        </Border>
    );
};

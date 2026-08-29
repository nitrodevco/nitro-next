import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FurniViewLayoutUniqueItemBackgroundContainer, FurniViewLayoutUniqueItemBackgroundContainerProps } from './FurniViewLayoutUniqueItemBackgroundContainer';

/** Row template `image_container` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutImageContainerItemProps {
    layout?: BoxLayout;
    rarityItemOverlayWidget?: ReactNode;
    srcImage?: string;
    tintImage?: string;
    uniqueItemBackgroundContainer?: FurniViewLayoutUniqueItemBackgroundContainerProps;
    uniqueItemPlaqueWidget?: ReactNode;
    visibleImage?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemBackgroundContainer?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
    visibleUniqueItemPlaqueWidget?: boolean;
}

export const FurniViewLayoutImageContainerItem = ({ layout, rarityItemOverlayWidget, srcImage, tintImage, uniqueItemBackgroundContainer, uniqueItemPlaqueWidget, visibleImage, visibleRarityItemOverlayContainer, visibleRarityItemOverlayWidget, visibleUniqueItemBackgroundContainer, visibleUniqueItemOverlayContainer, visibleUniqueItemPlaqueWidget }: FurniViewLayoutImageContainerItemProps) => {
    return (
        <Region
            name="image_container"
            layout={{ width: 170, height: 130, flexShrink: 0, minHeight: 45, ...layout }}
        >
            {(visibleUniqueItemBackgroundContainer ?? false) && (
                <FurniViewLayoutUniqueItemBackgroundContainer {...uniqueItemBackgroundContainer} />
            )}
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage}
                    tint={tintImage}
                    layout={{ position: 'absolute', left: 5, width: 140, top: 5, minHeight: 45 }}
                />
            )}
            {(visibleUniqueItemOverlayContainer ?? false) && (
                <Region
                    name="unique_item_overlay_container"
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, bottom: 0, minHeight: 45 }}
                >
                    <ThemeImage
                        src={layoutImage('unique_item_large_glass_shine.png')}
                        layout={{ position: 'absolute', left: 0, width: 170, top: 5, bottom: 5 }}
                    />
                    {(visibleUniqueItemPlaqueWidget ?? true) && (
                        <WidgetSlot
                            widgetType="limited_item_overlay_preview"
                            name="unique_item_plaque_widget"
                            layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
                        >
                            {uniqueItemPlaqueWidget}
                        </WidgetSlot>
                    )}
                </Region>
            )}
            {(visibleRarityItemOverlayContainer ?? false) && (
                <Region
                    name="rarity_item_overlay_container"
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, bottom: 0 }}
                >
                    {(visibleRarityItemOverlayWidget ?? true) && (
                        <WidgetSlot
                            widgetType="rarity_item_overlay_preview"
                            name="rarity_item_overlay_widget"
                            layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
                        >
                            {rarityItemOverlayWidget}
                        </WidgetSlot>
                    )}
                </Region>
            )}
        </Region>
    );
};

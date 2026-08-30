import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1420_inventory_thumb_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbLayoutProps {
    badge?: ReactNode;
    captionNumber?: string;
    chestOverlayContainer?: ReactNode;
    layout?: BoxLayout;
    rarityItemOverlayContainer?: ReactNode;
    srcBitmap?: string;
    srcChestBackgroundBitmap?: string;
    srcOutline?: string;
    srcRecyclableContainer?: string;
    srcRentState?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tintBitmap?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleBadge?: boolean;
    visibleChestBackgroundBitmap?: boolean;
    visibleChestOverlayContainer?: boolean;
    visibleNumberContainer?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleRecyclableContainer?: boolean;
    visibleRentState?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const InventoryThumbLayout = ({ badge, captionNumber, chestOverlayContainer, layout, rarityItemOverlayContainer, srcBitmap, srcChestBackgroundBitmap, srcOutline, srcRecyclableContainer, srcRentState, srcUniqueItemBackgroundBitmap, tintBitmap, uniqueItemOverlayContainer, visibleBadge, visibleChestBackgroundBitmap, visibleChestOverlayContainer, visibleNumberContainer, visibleRarityItemOverlayContainer, visibleRecyclableContainer, visibleRentState, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: InventoryThumbLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="5"
                    tintColor="#cacaca"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                >
                    {(visibleUniqueItemBackgroundBitmap ?? false) && (
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    )}
                    {(visibleChestBackgroundBitmap ?? false) && (
                        <ThemeImage
                            name="chest_background_bitmap"
                            src={srcChestBackgroundBitmap ?? layoutImage('chest_overlay_brown_background.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    )}
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap}
                        tint={tintBitmap}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                    />
                    {(visibleBadge ?? false) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            {badge}
                        </WidgetSlot>
                    )}
                    {(visibleRecyclableContainer ?? false) && (
                        <ThemeImage
                            name="recyclable_container"
                            src={srcRecyclableContainer ?? layoutImage('inventory_thumb_icon_recycle.png')}
                            layout={{ position: 'absolute', left: 2, width: 16, top: 3, height: 16 }}
                        />
                    )}
                    {(visibleUniqueItemOverlayContainer ?? false) && (
                        <WidgetSlot
                            widgetType="limited_item_overlay_grid"
                            name="unique_item_overlay_container"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {uniqueItemOverlayContainer}
                        </WidgetSlot>
                    )}
                    {(visibleChestOverlayContainer ?? false) && (
                        <WidgetSlot
                            widgetType="chest_overlay_grid"
                            name="chest_overlay_container"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {chestOverlayContainer}
                        </WidgetSlot>
                    )}
                    {(visibleRarityItemOverlayContainer ?? false) && (
                        <WidgetSlot
                            widgetType="rarity_item_overlay_grid"
                            name="rarity_item_overlay_container"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {rarityItemOverlayContainer}
                        </WidgetSlot>
                    )}
                    {(visibleNumberContainer ?? false) && (
                        <Region
                            name="number_container"
                            backgroundColor="#2f6982"
                            layout={{ position: 'absolute', left: 33, right: 1, top: 2, height: 15 }}
                        >
                            <ThemeText
                                text={captionNumber ?? ''}
                                textOptions={{ fill: '#2f6982' }}
                                name="number"
                                layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4 }}
                            />
                        </Region>
                    )}
                    {(visibleRentState ?? false) && (
                        <ThemeImage
                            name="rent_state"
                            src={srcRentState ?? layoutImage('inventory_thumb_rent_started.png')}
                            layout={{ position: 'absolute', left: 4, width: 10, top: 4, height: 10 }}
                        />
                    )}
                </Border>
                <ThemeImage
                    name="outline"
                    src={srcOutline ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            </Region>
        </Region>
    );
};

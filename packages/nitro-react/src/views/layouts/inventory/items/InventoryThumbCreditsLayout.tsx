import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1455_inventory_thumb_credits_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbCreditsLayoutProps {
    badge?: ReactNode;
    captionNumber?: string;
    layout?: BoxLayout;
    rarityItemOverlayContainer?: ReactNode;
    srcBitmap?: string;
    srcOutline?: string;
    srcRecyclableContainer?: string;
    srcRentState?: string;
    srcUniqueItemBackgroundBitmap?: string;
    tintBitmap?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleBadge?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleRecyclableContainer?: boolean;
    visibleRentState?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const InventoryThumbCreditsLayout = ({ badge, captionNumber, layout, rarityItemOverlayContainer, srcBitmap, srcOutline, srcRecyclableContainer, srcRentState, srcUniqueItemBackgroundBitmap, tintBitmap, uniqueItemOverlayContainer, visibleBadge, visibleRarityItemOverlayContainer, visibleRecyclableContainer, visibleRentState, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: InventoryThumbCreditsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}>
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
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap}
                        tint={tintBitmap}
                        layout={{ position: 'absolute', left: 1, width: 38, top: 18, height: 35, minWidth: 40, maxWidth: 38 }}
                    />
                    {(visibleBadge ?? false) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
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
                    {(visibleRarityItemOverlayContainer ?? false) && (
                        <WidgetSlot
                            widgetType="rarity_item_overlay_grid"
                            name="rarity_item_overlay_container"
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        >
                            {rarityItemOverlayContainer}
                        </WidgetSlot>
                    )}
                    <Region
                        name="number_container"
                        layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 20 }}
                    >
                        <Region
                            name="number"
                            layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 17, maxWidth: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionNumber ?? '66'}
                                textStyle="text-style-u-headline-small"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
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

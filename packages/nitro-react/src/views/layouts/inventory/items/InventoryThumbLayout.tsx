import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1420_inventory_thumb_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbLayoutProps {
    captionNumber?: string;
    layout?: BoxLayout;
    srcBitmap?: string;
    srcChestBackgroundBitmap?: string;
    srcOutline?: string;
    srcRecyclableContainer?: string;
    srcRentState?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleNumberContainer?: boolean;
}

export const InventoryThumbLayout = ({ captionNumber, layout, srcBitmap, srcChestBackgroundBitmap, srcOutline, srcRecyclableContainer, srcRentState, srcUniqueItemBackgroundBitmap, visibleNumberContainer }: InventoryThumbLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
            >
                <Border
                    variant="5"
                    tags={[ 'BG_COLOR' ]}
                    params={16}
                    tintColor="#cacaca"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
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
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    >
                        <ThemeImage
                            name="chest_background_bitmap"
                            params={16}
                            src={srcChestBackgroundBitmap ?? layoutImage('chest_overlay_brown_background.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    </Region>
                    <ThemeImage
                        name="bitmap"
                        tags={[ 'BITMAP' ]}
                        params={16}
                        src={srcBitmap}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                    />
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge"
                        params={16}
                        visible={false}
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 16, top: 3, height: 16 }}
                    >
                        <ThemeImage
                            name="recyclable_container"
                            params={16}
                            src={srcRecyclableContainer ?? layoutImage('inventory_thumb_icon_recycle.png')}
                            layout={{ position: 'absolute', left: 2, width: 16, top: 3, height: 16 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="chest_overlay_grid"
                        name="chest_overlay_container"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_container"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <Region
                        name="number_container"
                        tags={[ 'COUNT' ]}
                        params={393360}
                        visible={visibleNumberContainer ?? false}
                        backgroundColor="#2f6982"
                        layout={{ position: 'absolute', left: 33, width: 6, top: 2, height: 15 }}
                    >
                        <Region
                            name="number"
                            tags={[ 'NUMBER', 'COUNT' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNumber ?? ''}
                                textOptions={{ fill: '#2f6982' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 4, width: 10, top: 4, height: 10 }}
                    >
                        <ThemeImage
                            name="rent_state"
                            params={16}
                            src={srcRentState ?? layoutImage('inventory_thumb_rent_started.png')}
                            layout={{ position: 'absolute', left: 4, width: 10, top: 4, height: 10 }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="outline"
                    params={16}
                    src={srcOutline ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            </Region>
        </Region>
    );
};

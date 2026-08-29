import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1455_inventory_thumb_credits_xml` (layout "thumbnail", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryThumbCreditsLayoutProps {
    layout?: BoxLayout;
    numberContainer?: InventoryThumbCreditsLayoutNumberContainerProps;
    srcBitmap?: string;
    srcOutline?: string;
    srcRecyclableContainer?: string;
    srcRentState?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const InventoryThumbCreditsLayout = ({ layout, numberContainer, srcBitmap, srcOutline, srcRecyclableContainer, srcRentState, srcUniqueItemBackgroundBitmap }: InventoryThumbCreditsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}>
                <Border
                    variant="5"
                    tags={[ 'BG_COLOR' ]}
                    tintColor="#cacaca"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    >
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    </Region>
                    <ThemeImage
                        name="bitmap"
                        tags={[ 'BITMAP' ]}
                        src={srcBitmap}
                        layout={{ position: 'absolute', left: 1, width: 38, top: 18, height: 35, minWidth: 40, maxWidth: 38 }}
                    />
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge"
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
                            src={srcRecyclableContainer ?? layoutImage('inventory_thumb_icon_recycle.png')}
                            layout={{ position: 'absolute', left: 2, width: 16, top: 3, height: 16 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_container"
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <InventoryThumbCreditsLayoutNumberContainer
                        tags={[ 'COUNT' ]}
                        {...numberContainer}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 4, width: 10, top: 4, height: 10 }}
                    >
                        <ThemeImage
                            name="rent_state"
                            src={srcRentState ?? layoutImage('inventory_thumb_rent_started.png')}
                            layout={{ position: 'absolute', left: 4, width: 10, top: 4, height: 10 }}
                        />
                    </Region>
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

/** Named region `number_container` of InventoryThumbCreditsLayout - configured through the parent's `numberContainer` prop. */
export interface InventoryThumbCreditsLayoutNumberContainerProps {
    captionNumber?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryThumbCreditsLayoutNumberContainer = ({ captionNumber, layout, tags }: InventoryThumbCreditsLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 20, ...layout }}
        >
            <Region
                name="number"
                tags={[ 'NUMBER', 'COUNT' ]}
                layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 17, maxWidth: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNumber ?? '66'}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

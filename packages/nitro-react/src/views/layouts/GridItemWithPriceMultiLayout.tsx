import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1717_gridItem_with_price_multi_xml` (layout "gridItem_with_price_multi", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemWithPriceMultiLayoutProps {
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayout = ({ layout }: GridItemWithPriceMultiLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74, minWidth: 53, maxWidth: 73 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
                >
                    <Border
                        variant="3"
                        name="bg"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="2"
                    tags={[ 'ITEM_HILIGHT' ]}
                    params={2192}
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        params={2192}
                        tintColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
                    >
                        <Border
                            variant="3"
                            params={2192}
                            layout={{ position: 'absolute', left: 2, width: 49, top: 2, height: 70 }}
                        />
                    </Border>
                </Border>
                <Region
                    name="wide_container"
                    params={24}
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                >
                    <ThemeImage
                        name="image_wide"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 36 }}
                    />
                </Region>
                <ThemeImage
                    name="badge_add_on"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 10, top: 2, height: 10 }}
                />
                <Region
                    name="small_container"
                    params={17}
                    layout={{ position: 'absolute', left: 8, width: 36, top: 2, height: 36 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    >
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            params={16}
                            src={layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    </Region>
                    <ThemeImage
                        name="image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    />
                    <Icon
                        variant="0"
                        name="clubLevelIcon"
                        params={394320}
                        layout={{ position: 'absolute', left: 15, width: 19, top: 2, height: 10 }}
                    />
                    <Region
                        name="bundleCounter"
                        params={176}
                        layout={{ position: 'absolute', left: 18, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    />
                    <Border
                        variant="2"
                        name="multiContainer"
                        params={393232}
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', left: 18, width: 17, top: 21, height: 13 }}
                    >
                        <Region
                            name="multiCounter"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                    </Border>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                    >
                        <ThemeImage
                            name="unique_item_sold_out_bitmap"
                            params={16}
                            src={layoutImage('unique_item_sold_out_tile.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    >
                        <ThemeImage
                            tags={[ 'ITEM_HILIGHT_TOP' ]}
                            params={16}
                            src={layoutImage('inventory_thumb_selected_outline.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="totalprice_container"
                    params={409680}
                    layout={{ position: 'absolute', left: 19, width: 32, top: 36, height: 19, flexDirection: 'row', gap: 1 }}
                >
                    <Region
                        name="amount_text_left"
                        params={262160}
                        layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="00" />
                    </Region>
                    <Icon
                        variant="35"
                        name="currency_indicator_bitmap_left"
                        params={16}
                        layout={{ width: 14, height: 15, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    name="totalprice_container"
                    params={409680}
                    layout={{ position: 'absolute', left: 8, width: 43, top: 51, height: 19, flexDirection: 'row', gap: 1 }}
                >
                    <Region
                        name="plus"
                        params={16}
                        layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text=" " />
                    </Region>
                    <Region
                        name="amount_text_right"
                        params={262160}
                        layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="00" />
                    </Region>
                    <Icon
                        variant="35"
                        name="currency_indicator_bitmap_right"
                        params={16}
                        layout={{ width: 14, height: 15, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1546_mint_grid_item_xml` (layout "mintGridItem", 53x74) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MintGridItemLayoutProps {
    captionBundleCounter?: string;
    captionMultiCounter?: string;
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
    srcBadgeAddOn?: string;
    srcImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    srcUniqueItemSoldOutBitmap?: string;
    visibleBg?: boolean;
}

export const MintGridItemLayout = ({ captionBundleCounter, captionMultiCounter, itemsTotalpriceContainer, layout, srcBadgeAddOn, srcImage, srcUniqueItemBackgroundBitmap, srcUniqueItemSoldOutBitmap, visibleBg }: MintGridItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 53, height: 74, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 74 }}
            >
                <Region
                    visible={visibleBg ?? false}
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 62 }}
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
                    params={16}
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 62 }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        params={16}
                        tintColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 62 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            layout={{ position: 'absolute', left: 2, width: 49, top: 2, height: 58 }}
                        />
                    </Border>
                </Border>
                <Region
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
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    </Region>
                    <ThemeImage
                        name="image"
                        params={16}
                        src={srcImage}
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
                        layout={{ position: 'absolute', right: 2, width: 19, bottom: 24, height: 10 }}
                    />
                    <Region
                        name="bundleCounter"
                        params={176}
                        layout={{ position: 'absolute', left: 18, right: 14, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBundleCounter ?? ''}
                            textOptions={{ fill: '#cccc66' }}
                        />
                    </Region>
                    <Border
                        variant="2"
                        name="multiContainer"
                        params={393232}
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', right: 1, width: 17, top: 21, height: 13 }}
                    >
                        <Region
                            name="multiCounter"
                            params={16}
                            layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMultiCounter ?? ''}
                                textOptions={{ fill: '#cccc66' }}
                            />
                        </Region>
                    </Border>
                    <ThemeImage
                        name="badge_add_on"
                        params={16}
                        src={srcBadgeAddOn}
                        layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 10 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                    >
                        <ThemeImage
                            name="unique_item_sold_out_bitmap"
                            params={16}
                            src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_tile.png')}
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
                    params={409616}
                    layout={{ position: 'absolute', right: 2, top: 36, flexDirection: 'row', gap: 1 }}
                >
                    {itemsTotalpriceContainer ?? (
                        <>
                            <MintGridItemLayoutAmountTextRightItem />
                            <MintGridItemLayoutCurrencyIndicatorBitmapRightItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `amount_text_right` of MintGridItemLayout - pass real rows through its `items…` slot. */
export interface MintGridItemLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const MintGridItemLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: MintGridItemLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            params={262160}
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionAmountTextRight ?? '00000'} />
        </Region>
    );
};

/** Row template `currency_indicator_bitmap_right` of MintGridItemLayout - pass real rows through its `items…` slot. */
export interface MintGridItemLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const MintGridItemLayoutCurrencyIndicatorBitmapRightItem = ({ layout }: MintGridItemLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_right"
            params={147481}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

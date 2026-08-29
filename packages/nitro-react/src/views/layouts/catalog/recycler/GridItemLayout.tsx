import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1718_gridItem_xml` (layout "gridItem", 36x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GridItemLayoutProps {
    captionBundleCounter?: string;
    captionMultiCounter?: string;
    layout?: BoxLayout;
    srcBadgeAddOn?: string;
    srcImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    srcUniqueItemSoldOutBitmap?: string;
    tintBadgeAddOn?: string;
    tintImage?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleBg?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
    visibleUniqueItemSoldOutBitmap?: boolean;
}

export const GridItemLayout = ({ captionBundleCounter, captionMultiCounter, layout, srcBadgeAddOn, srcImage, srcUniqueItemBackgroundBitmap, srcUniqueItemSoldOutBitmap, tintBadgeAddOn, tintImage, uniqueItemOverlayContainer, visibleBg, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer, visibleUniqueItemSoldOutBitmap }: GridItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 36, height: 36, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                {(visibleBg ?? false) && (
                    <Border
                        variant="3"
                        name="bg"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
                <Border
                    variant="2"
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        tintColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            layout={{ position: 'absolute', left: 2, width: 32, top: 2, height: 32 }}
                        />
                    </Border>
                </Border>
                {(visibleUniqueItemBackgroundBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_background_bitmap"
                        src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                    />
                )}
                <ThemeImage
                    name="image"
                    src={srcImage}
                    tint={tintImage}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                {(visibleUniqueItemOverlayContainer ?? false) && (
                    <WidgetSlot
                        widgetType="limited_item_overlay_grid"
                        name="unique_item_overlay_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {uniqueItemOverlayContainer}
                    </WidgetSlot>
                )}
                <Icon
                    variant="0"
                    name="clubLevelIcon"
                    layout={{ position: 'absolute', right: 2, width: 19, bottom: 24, height: 10 }}
                />
                <Region
                    name="bundleCounter"
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
                    tintColor="#ff3300"
                    layout={{ position: 'absolute', right: 1, width: 17, top: 21, height: 13 }}
                >
                    <Region
                        name="multiCounter"
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
                    src={srcBadgeAddOn}
                    tint={tintBadgeAddOn}
                    layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 10 }}
                />
                {(visibleUniqueItemSoldOutBitmap ?? false) && (
                    <ThemeImage
                        name="unique_item_sold_out_bitmap"
                        src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_tile.png')}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                    />
                )}
                {/* `static_bitmap` is hidden and has no name to show it by */}
            </Region>
        </Region>
    );
};

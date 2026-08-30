import { ReactNode } from 'react';

import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `small_container` of GridItemWithPriceMultiLayout - configured through the parent's `smallContainer` prop. */
export interface GridItemWithPriceMultiLayoutSmallContainerProps {
    captionBundleCounter?: string;
    captionMultiCounter?: string;
    layout?: BoxLayout;
    onSmallContainer?: () => void;
    srcImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
    srcUniqueItemSoldOutBitmap?: string;
    tintImage?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
    visibleUniqueItemSoldOutBitmap?: boolean;
}

export const GridItemWithPriceMultiLayoutSmallContainer = ({ captionBundleCounter, captionMultiCounter, layout, onSmallContainer, srcImage, srcUniqueItemBackgroundBitmap, srcUniqueItemSoldOutBitmap, tintImage, uniqueItemOverlayContainer, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer, visibleUniqueItemSoldOutBitmap }: GridItemWithPriceMultiLayoutSmallContainerProps) => {
    return (
        <Region
            name="small_container"
            onPointerTap={onSmallContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 8, width: 36, top: 2, height: 36, ...layout }}
        >
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
            <ThemeText
                text={captionBundleCounter ?? ''}
                textOptions={{ fill: '#cccc66' }}
                name="bundleCounter"
                layout={{ position: 'absolute', left: 18, right: 14, top: 18, height: 4 }}
            />
            <Border
                variant="2"
                name="multiContainer"
                tintColor="#ff3300"
                layout={{ position: 'absolute', right: 1, width: 17, top: 21, height: 13 }}
            >
                <ThemeText
                    text={captionMultiCounter ?? ''}
                    textOptions={{ fill: '#cccc66' }}
                    name="multiCounter"
                    layout={{ position: 'absolute', left: 3, width: 4, top: 0, height: 4 }}
                />
            </Border>
            {(visibleUniqueItemSoldOutBitmap ?? false) && (
                <ThemeImage
                    name="unique_item_sold_out_bitmap"
                    src={srcUniqueItemSoldOutBitmap ?? layoutImage('unique_item_sold_out_tile.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                />
            )}
            {/* `static_bitmap` is hidden and has no name to show it by */}
        </Region>
    );
};

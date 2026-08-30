import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1377_item_popup_xml` (layout "item_popup", 203x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ItemPopupLayoutProps {
    captionItemNameText?: string;
    layout?: BoxLayout;
    nftImage?: ReactNode;
    srcArrowPointer?: string;
    srcItemImage?: string;
    srcNftOverlayIcon?: string;
    tintArrowPointer?: string;
    tintItemImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleNftOverlayIcon?: boolean;
}

export const ItemPopupLayout = ({ captionItemNameText, layout, nftImage, srcArrowPointer, srcItemImage, srcNftOverlayIcon, tintArrowPointer, tintItemImage, uniqueItemOverlayWidget, visibleNftOverlayIcon }: ItemPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 203, height: 90, ...layout }}>
            <Border
                variant="0"
                name="item_popup_content"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 203, maxWidth: 203, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    tint={tintItemImage}
                    layout={{ position: 'absolute', left: 8, width: 190, top: 22, height: 55 }}
                />
                <ThemeText
                    text={captionItemNameText ?? 'PH Item name'}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                    name="item_name_text"
                    layout={{ position: 'absolute', left: 5, right: 8, top: 5, height: 19 }}
                />
                <ThemeImage
                    name="arrow_pointer"
                    src={srcArrowPointer}
                    tint={tintArrowPointer}
                    layout={{ position: 'absolute', right: 5, width: 18, top: 6, height: 24 }}
                />
                {(visibleNftOverlayIcon ?? false) && (
                    <ThemeImage
                        name="nft_overlay_icon"
                        src={srcNftOverlayIcon ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                        layout={{ position: 'absolute', left: 17, width: 20, top: 171, height: 20 }}
                    />
                )}
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_item_overlay_widget"
                    layout={{ position: 'absolute', right: 4, width: 40, alignSelf: 'center', marginTop: -2, marginBottom: 2, height: 40 }}
                >
                    {uniqueItemOverlayWidget}
                </WidgetSlot>
                <WidgetSlot
                    widgetType="product_image"
                    name="nft_image"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 170, top: 29, height: 146 }}
                >
                    {nftImage}
                </WidgetSlot>
            </Border>
        </Region>
    );
};

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1377_item_popup_xml` (layout "item_popup", 203x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ItemPopupLayoutProps {
    captionItemNameText?: string;
    layout?: BoxLayout;
    srcArrowPointer?: string;
    srcItemImage?: string;
    srcNftOverlayIcon?: string;
}

export const ItemPopupLayout = ({ captionItemNameText, layout, srcArrowPointer, srcItemImage, srcNftOverlayIcon }: ItemPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 203, height: 90, ...layout }}>
            <Border
                variant="0"
                name="item_popup_content"
                layout={{ position: 'absolute', left: 0, width: 203, top: 0, height: 90, minWidth: 203, maxWidth: 203 }}
            >
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    layout={{ position: 'absolute', left: 8, width: 190, top: 22, height: 55 }}
                />
                <Region
                    name="item_name_text"
                    layout={{ position: 'absolute', left: 5, width: 190, top: 5, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionItemNameText ?? 'PH Item name'}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="arrow_pointer"
                    src={srcArrowPointer}
                    layout={{ position: 'absolute', left: 180, width: 18, top: 6, height: 24 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 17, width: 20, top: 171, height: 20 }}
                >
                    <ThemeImage
                        name="nft_overlay_icon"
                        src={srcNftOverlayIcon ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                        layout={{ position: 'absolute', left: 17, width: 20, top: 171, height: 20 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_item_overlay_widget"
                    layout={{ position: 'absolute', left: 159, width: 40, top: 23, height: 40 }}
                />
                <WidgetSlot
                    widgetType="product_image"
                    name="nft_image"
                    layout={{ position: 'absolute', left: 16, width: 170, top: 29, height: 146 }}
                />
            </Border>
        </Region>
    );
};

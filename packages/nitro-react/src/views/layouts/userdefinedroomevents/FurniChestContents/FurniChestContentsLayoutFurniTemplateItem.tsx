import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `furni_template` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutFurniTemplateItemProps {
    captionFurniQuantity?: string;
    furniIcon?: ReactNode;
    layout?: BoxLayout;
    onFurniTemplate?: () => void;
    rarityItemOverlayContainer?: ReactNode;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleBorder?: boolean;
    visibleFurniIcon?: boolean;
    visibleFurniQuantity?: boolean;
    visibleNumberContainer?: boolean;
    visibleNumberContainerInnerBorder?: boolean;
    visibleOutlineFocus?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const FurniChestContentsLayoutFurniTemplateItem = ({ captionFurniQuantity, furniIcon, layout, onFurniTemplate, rarityItemOverlayContainer, srcOutlineFocus, srcUniqueItemBackgroundBitmap, uniqueItemOverlayContainer, visibleBorder, visibleFurniIcon, visibleFurniQuantity, visibleNumberContainer, visibleNumberContainerInnerBorder, visibleOutlineFocus, visibleRarityItemOverlayContainer, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: FurniChestContentsLayoutFurniTemplateItemProps) => {
    return (
        <Region
            name="furni_template"
            onPointerTap={onFurniTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Border
                    variant="5"
                    name="border"
                    tintColor="#cbcbcb"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                >
                    {(visibleUniqueItemBackgroundBitmap ?? false) && (
                        <ThemeImage
                            name="unique_item_background_bitmap"
                            src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                            layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                        />
                    )}
                    {(visibleFurniIcon ?? true) && (
                        <WidgetSlot
                            widgetType="product_icon"
                            name="furni_icon"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            {furniIcon}
                        </WidgetSlot>
                    )}
                    {(visibleNumberContainer ?? false) && (
                        <Region
                            name="number_container"
                            backgroundColor="#2f6982"
                            layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16 }}
                        >
                            {(visibleNumberContainerInnerBorder ?? true) && (
                                <Region
                                    name="number_container_inner_border"
                                    backgroundColor="#ffffff"
                                    layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14 }}
                                >
                                    {(visibleFurniQuantity ?? true) && (
                                        <Region
                                            name="furni_quantity"
                                            layout={{ position: 'absolute', left: 1, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={captionFurniQuantity ?? '0'}
                                                textStyle="text-style-regular"
                                                textOptions={{ fill: '#2f6982' }}
                                            />
                                        </Region>
                                    )}
                                </Region>
                            )}
                        </Region>
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
                </Border>
            )}
            {(visibleOutlineFocus ?? true) && (
                <ThemeImage
                    name="outline_focus"
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            )}
        </Region>
    );
};

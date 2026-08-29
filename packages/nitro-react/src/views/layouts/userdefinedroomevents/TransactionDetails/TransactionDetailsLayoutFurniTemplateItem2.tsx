import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `furni_template` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTemplateItem2Props {
    captionFurniQuantity?: string;
    captionIncompleteText?: string;
    furniIcon?: ReactNode;
    layout?: BoxLayout;
    onFurniTemplate?: () => void;
    rarityItemOverlayContainer?: ReactNode;
    srcCoinsIcon?: string;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    uniqueItemOverlayContainer?: ReactNode;
    visibleBorder?: boolean;
    visibleCoinsIcon?: boolean;
    visibleFurniIcon?: boolean;
    visibleFurniQuantity?: boolean;
    visibleIncompleteText?: boolean;
    visibleNumberContainer?: boolean;
    visibleNumberContainerInnerBorder?: boolean;
    visibleOutlineFocus?: boolean;
    visibleRarityItemOverlayContainer?: boolean;
    visibleUniqueItemBackgroundBitmap?: boolean;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const TransactionDetailsLayoutFurniTemplateItem2 = ({ captionFurniQuantity, captionIncompleteText, furniIcon, layout, onFurniTemplate, rarityItemOverlayContainer, srcCoinsIcon, srcOutlineFocus, srcUniqueItemBackgroundBitmap, uniqueItemOverlayContainer, visibleBorder, visibleCoinsIcon, visibleFurniIcon, visibleFurniQuantity, visibleIncompleteText, visibleNumberContainer, visibleNumberContainerInnerBorder, visibleOutlineFocus, visibleRarityItemOverlayContainer, visibleUniqueItemBackgroundBitmap, visibleUniqueItemOverlayContainer }: TransactionDetailsLayoutFurniTemplateItem2Props) => {
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
                    {(visibleCoinsIcon ?? false) && (
                        <ThemeImage
                            name="coins_icon"
                            src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                            layout={{ position: 'absolute', left: 7, width: 25, top: 11, height: 18 }}
                        />
                    )}
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
                    {(visibleIncompleteText ?? false) && (
                        <Region
                            name="incomplete_text"
                            layout={{ position: 'absolute', left: 3, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionIncompleteText ?? ' 5'}
                                textOptions={{ fill: '#666666', align: 'center' }}
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visibleOutlineFocus ?? false) && (
                <ThemeImage
                    name="outline_focus"
                    src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            )}
        </Region>
    );
};

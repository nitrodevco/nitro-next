import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `element_entry_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutElementEntryTemplateItemProps {
    captionQuantityAmount?: string;
    elementIconWidget?: ReactNode;
    layout?: BoxLayout;
    onCloseRegion?: () => void;
    onElementEntryTemplate?: () => void;
    srcCoinsIcon?: string;
    visibleCloseRegion?: boolean;
    visibleCoinsIcon?: boolean;
    visibleElementIconWidget?: boolean;
    visibleIconBorder?: boolean;
    visibleQuantityAmount?: boolean;
    visibleQuantityBorder?: boolean;
}

export const WiredStyleUbuntuLayoutElementEntryTemplateItem = ({ captionQuantityAmount, elementIconWidget, layout, onCloseRegion, onElementEntryTemplate, srcCoinsIcon, visibleCloseRegion, visibleCoinsIcon, visibleElementIconWidget, visibleIconBorder, visibleQuantityAmount, visibleQuantityBorder }: WiredStyleUbuntuLayoutElementEntryTemplateItemProps) => {
    return (
        <Region
            name="element_entry_template"
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onElementEntryTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            {(visibleIconBorder ?? true) && (
                <Border
                    variant="4"
                    name="icon_border"
                    tintColor="#eeeeee"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {(visibleElementIconWidget ?? true) && (
                        <WidgetSlot
                            widgetType="product_icon"
                            name="element_icon_widget"
                            layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                        >
                            {elementIconWidget}
                        </WidgetSlot>
                    )}
                    {(visibleCoinsIcon ?? false) && (
                        <ThemeImage
                            name="coins_icon"
                            src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                            layout={{ position: 'absolute', left: 8, width: 25, top: 12, height: 18 }}
                        />
                    )}
                    {(visibleQuantityBorder ?? true) && (
                        <Border
                            variant="4"
                            name="quantity_border"
                            tintColor="#cccccc"
                            blend={0.8}
                            layout={{ position: 'absolute', right: 3, width: 16, bottom: 2, height: 13 }}
                        >
                            {(visibleQuantityAmount ?? true) && (
                                <ThemeText
                                    text={captionQuantityAmount ?? '2'}
                                    textOptions={{ fill: '#222222' }}
                                    name="quantity_amount"
                                    layout={{ position: 'absolute', left: 3, top: -1, height: 15 }}
                                />
                            )}
                        </Border>
                    )}
                    {(visibleCloseRegion ?? true) && (
                        <Region
                            name="close_region"
                            dynamicStyle="brightness_and_shadow_under"
                            onPointerTap={onCloseRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', right: 0, width: 15, top: 0, height: 15 }}
                        >
                            <Border
                                variant="12"
                                tintColor="#dddddd"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <ThemeImage
                                    src={layoutImage('common_close_x.png')}
                                    tint="#777777"
                                    layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                                />
                            </Border>
                        </Region>
                    )}
                </Border>
            )}
        </Region>
    );
};

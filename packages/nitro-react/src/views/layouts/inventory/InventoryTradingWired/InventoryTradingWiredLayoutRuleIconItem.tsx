import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `rule_icon` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleIconItemProps {
    furniIcon?: ReactNode;
    layout?: BoxLayout;
    srcCoinIcon?: string;
    visibleCoinIcon?: boolean;
    visibleFurniIcon?: boolean;
}

export const InventoryTradingWiredLayoutRuleIconItem = ({ furniIcon, layout, srcCoinIcon, visibleCoinIcon, visibleFurniIcon }: InventoryTradingWiredLayoutRuleIconItemProps) => {
    return (
        <Region
            name="rule_icon"
            layout={{ width: 36, height: 36, flexShrink: 0, minWidth: 32, maxWidth: 36, ...layout }}
        >
            {(visibleFurniIcon ?? true) && (
                <WidgetSlot
                    widgetType="product_icon"
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                >
                    {furniIcon}
                </WidgetSlot>
            )}
            {(visibleCoinIcon ?? true) && (
                <ThemeImage
                    name="coin_icon"
                    src={srcCoinIcon ?? layoutImage('pursearea_credits_icon2.png')}
                    layout={{ position: 'absolute', left: 0, width: 32, top: 2, height: 36 }}
                />
            )}
        </Region>
    );
};

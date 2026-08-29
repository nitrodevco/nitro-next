import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `bubble_title_spacing` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutBubbleTitleSpacingItemProps {
    bubbleTitleSpacing?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutBubbleTitleSpacingItem = ({ bubbleTitleSpacing, layout }: InventoryTradingWiredLayoutBubbleTitleSpacingItemProps) => {
    return (
        <Region
            name="bubble_title_spacing"
            layout={{ width: 0, height: 1, flexShrink: 0, ...layout }}
        >
            {bubbleTitleSpacing}
        </Region>
    );
};

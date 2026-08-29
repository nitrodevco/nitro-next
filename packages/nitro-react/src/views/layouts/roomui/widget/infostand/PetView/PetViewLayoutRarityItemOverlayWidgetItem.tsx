import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `rarity_item_overlay_widget` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutRarityItemOverlayWidgetItemProps {
    layout?: BoxLayout;
    rarityItemOverlayWidget?: ReactNode;
}

export const PetViewLayoutRarityItemOverlayWidgetItem = ({ layout, rarityItemOverlayWidget }: PetViewLayoutRarityItemOverlayWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="rarity_item_overlay_preview"
            name="rarity_item_overlay_widget"
            layout={{ width: 40, height: 28, flexShrink: 0, ...layout }}
        >
            {rarityItemOverlayWidget}
        </WidgetSlot>
    );
};

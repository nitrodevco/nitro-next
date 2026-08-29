import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `growth_status_widget` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutGrowthStatusWidgetItemProps {
    growthStatusWidget?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutGrowthStatusWidgetItem = ({ growthStatusWidget, layout }: PetViewLayoutGrowthStatusWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="countdown"
            name="growth_status_widget"
            options={{ 'countdown:seconds': '12054' }}
            layout={{ width: 99, height: 37, flexShrink: 0, ...layout }}
        >
            {growthStatusWidget}
        </WidgetSlot>
    );
};

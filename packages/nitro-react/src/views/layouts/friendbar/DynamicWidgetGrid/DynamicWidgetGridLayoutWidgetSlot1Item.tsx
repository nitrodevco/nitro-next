import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `widget_slot_1` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot1ItemProps {
    layout?: BoxLayout;
    widgetSlot1?: ReactNode;
}

export const DynamicWidgetGridLayoutWidgetSlot1Item = ({ layout, widgetSlot1 }: DynamicWidgetGridLayoutWidgetSlot1ItemProps) => {
    return (
        <Region
            name="widget_slot_1"
            layout={{ width: 800, height: 75, flexShrink: 0, ...layout }}
        >
            {widgetSlot1}
        </Region>
    );
};

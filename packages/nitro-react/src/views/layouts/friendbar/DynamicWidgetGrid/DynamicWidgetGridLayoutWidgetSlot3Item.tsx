import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `widget_slot_3` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot3ItemProps {
    layout?: BoxLayout;
    widgetSlot3?: ReactNode;
}

export const DynamicWidgetGridLayoutWidgetSlot3Item = ({ layout, widgetSlot3 }: DynamicWidgetGridLayoutWidgetSlot3ItemProps) => {
    return (
        <Region
            name="widget_slot_3"
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        >
            {widgetSlot3}
        </Region>
    );
};

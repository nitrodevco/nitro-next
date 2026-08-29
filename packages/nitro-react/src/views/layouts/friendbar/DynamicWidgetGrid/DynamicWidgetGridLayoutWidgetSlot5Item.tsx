import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `widget_slot_5` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5ItemProps {
    layout?: BoxLayout;
    widgetSlot5?: ReactNode;
}

export const DynamicWidgetGridLayoutWidgetSlot5Item = ({ layout, widgetSlot5 }: DynamicWidgetGridLayoutWidgetSlot5ItemProps) => {
    return (
        <Region
            name="widget_slot_5"
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        >
            {widgetSlot5}
        </Region>
    );
};

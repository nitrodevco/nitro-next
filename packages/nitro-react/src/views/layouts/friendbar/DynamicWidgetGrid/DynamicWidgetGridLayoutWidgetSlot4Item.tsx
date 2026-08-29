import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `widget_slot_4` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4ItemProps {
    layout?: BoxLayout;
    widgetSlot4?: ReactNode;
}

export const DynamicWidgetGridLayoutWidgetSlot4Item = ({ layout, widgetSlot4 }: DynamicWidgetGridLayoutWidgetSlot4ItemProps) => {
    return (
        <Region
            name="widget_slot_4"
            layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, ...layout }}
        >
            {widgetSlot4}
        </Region>
    );
};

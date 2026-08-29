import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `widget_slot_2` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot2ItemProps {
    layout?: BoxLayout;
    widgetSlot2?: ReactNode;
}

export const DynamicWidgetGridLayoutWidgetSlot2Item = ({ layout, widgetSlot2 }: DynamicWidgetGridLayoutWidgetSlot2ItemProps) => {
    return (
        <Region
            name="widget_slot_2"
            layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, ...layout }}
        >
            {widgetSlot2}
        </Region>
    );
};

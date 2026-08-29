import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlot4Item } from './DynamicWidgetGridLayoutWidgetSlot4Item';

/** Row template `widget_slot_4_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4RootItemProps {
    itemsWidgetSlot4Root?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot4RootItem = ({ itemsWidgetSlot4Root, layout }: DynamicWidgetGridLayoutWidgetSlot4RootItemProps) => {
    return (
        <Region
            name="widget_slot_4_root"
            layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsWidgetSlot4Root ?? (
                <DynamicWidgetGridLayoutWidgetSlot4Item />
            )}
        </Region>
    );
};

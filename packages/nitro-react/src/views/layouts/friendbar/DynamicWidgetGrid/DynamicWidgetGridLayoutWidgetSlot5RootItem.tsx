import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlot5Item } from './DynamicWidgetGridLayoutWidgetSlot5Item';

/** Row template `widget_slot_5_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5RootItemProps {
    itemsWidgetSlot5Root?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot5RootItem = ({ itemsWidgetSlot5Root, layout }: DynamicWidgetGridLayoutWidgetSlot5RootItemProps) => {
    return (
        <Region
            name="widget_slot_5_root"
            layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsWidgetSlot5Root ?? (
                <DynamicWidgetGridLayoutWidgetSlot5Item />
            )}
        </Region>
    );
};

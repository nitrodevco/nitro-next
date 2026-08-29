import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlot2Item } from './DynamicWidgetGridLayoutWidgetSlot2Item';
import { DynamicWidgetGridLayoutWidgetSlot4RootItem } from './DynamicWidgetGridLayoutWidgetSlot4RootItem';

/** Row template `widget_slots_center_left` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlotsCenterLeftItemProps {
    itemsWidgetSlotsCenterLeft?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem = ({ itemsWidgetSlotsCenterLeft, layout }: DynamicWidgetGridLayoutWidgetSlotsCenterLeftItemProps) => {
    return (
        <Region
            name="widget_slots_center_left"
            layout={{ flexShrink: 0, maxWidth: 500, flexDirection: 'column', gap: 50, ...layout }}
        >
            {itemsWidgetSlotsCenterLeft ?? (
                <>
                    <DynamicWidgetGridLayoutWidgetSlot2Item />
                    <DynamicWidgetGridLayoutWidgetSlot4RootItem />
                </>
            )}
        </Region>
    );
};

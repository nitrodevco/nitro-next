import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlot3Item } from './DynamicWidgetGridLayoutWidgetSlot3Item';
import { DynamicWidgetGridLayoutWidgetSlot5RootItem } from './DynamicWidgetGridLayoutWidgetSlot5RootItem';

/** Row template `widget_slots_right` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlotsRightItemProps {
    itemsWidgetSlotsCenterRight?: ReactNode;
    layout?: BoxLayout;
    visibleWidgetSlotsCenterRight?: boolean;
}

export const DynamicWidgetGridLayoutWidgetSlotsRightItem = ({ itemsWidgetSlotsCenterRight, layout, visibleWidgetSlotsCenterRight }: DynamicWidgetGridLayoutWidgetSlotsRightItemProps) => {
    return (
        <Region
            name="widget_slots_right"
            layout={{ width: 250, height: 52, flexShrink: 0, maxWidth: 250, ...layout }}
        >
            {(visibleWidgetSlotsCenterRight ?? true) && (
                <Region
                    name="widget_slots_center_right"
                    layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 50 }}
                >
                    {itemsWidgetSlotsCenterRight ?? (
                        <>
                            <DynamicWidgetGridLayoutWidgetSlot3Item />
                            <DynamicWidgetGridLayoutWidgetSlot5RootItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};

import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem } from './DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem';
import { DynamicWidgetGridLayoutWidgetSlotsRightItem } from './DynamicWidgetGridLayoutWidgetSlotsRightItem';

/** Named region `widget_slots_center_scrollable` of DynamicWidgetGridLayout - configured through the parent's `widgetSlotsCenterScrollable` prop. */
export interface DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps {
    itemsWidgetSlotsCenterScrollable?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterScrollable = ({ itemsWidgetSlotsCenterScrollable, layout }: DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps) => {
    return (
        <Region
            name="widget_slots_center_scrollable"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, bottom: 0, flexDirection: 'row', gap: 50, ...layout }}
        >
            {itemsWidgetSlotsCenterScrollable ?? (
                <>
                    <DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem />
                    <DynamicWidgetGridLayoutWidgetSlotsRightItem />
                </>
            )}
        </Region>
    );
};

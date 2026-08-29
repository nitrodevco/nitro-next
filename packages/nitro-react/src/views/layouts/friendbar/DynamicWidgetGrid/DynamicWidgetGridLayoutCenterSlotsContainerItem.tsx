import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetSlotsCenterScrollable, DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps } from './DynamicWidgetGridLayoutWidgetSlotsCenterScrollable';

/** Row template `center_slots_container` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutCenterSlotsContainerItemProps {
    layout?: BoxLayout;
    visibleWidgetSlotsCenterScrollable?: boolean;
    widgetSlotsCenterScrollable?: DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps;
}

export const DynamicWidgetGridLayoutCenterSlotsContainerItem = ({ layout, visibleWidgetSlotsCenterScrollable, widgetSlotsCenterScrollable }: DynamicWidgetGridLayoutCenterSlotsContainerItemProps) => {
    return (
        <Region
            name="center_slots_container"
            layout={{ width: 800, height: 682, flexShrink: 0, ...layout }}
        >
            {(visibleWidgetSlotsCenterScrollable ?? true) && (
                <DynamicWidgetGridLayoutWidgetSlotsCenterScrollable {...widgetSlotsCenterScrollable} />
            )}
        </Region>
    );
};

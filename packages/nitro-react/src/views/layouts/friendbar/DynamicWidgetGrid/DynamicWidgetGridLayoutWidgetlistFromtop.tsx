import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutCenterSlotsContainerItem } from './DynamicWidgetGridLayoutCenterSlotsContainerItem';
import { DynamicWidgetGridLayoutWidgetSlot1Item } from './DynamicWidgetGridLayoutWidgetSlot1Item';

/** Named region `widgetlist_fromtop` of DynamicWidgetGridLayout - configured through the parent's `widgetlistFromtop` prop. */
export interface DynamicWidgetGridLayoutWidgetlistFromtopProps {
    itemsWidgetlistFromtop?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetlistFromtop = ({ itemsWidgetlistFromtop, layout }: DynamicWidgetGridLayoutWidgetlistFromtopProps) => {
    return (
        <Region
            name="widgetlist_fromtop"
            layout={{ position: 'absolute', right: 0, width: 925, top: 4, bottom: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsWidgetlistFromtop ?? (
                <>
                    <DynamicWidgetGridLayoutWidgetSlot1Item />
                    <DynamicWidgetGridLayoutCenterSlotsContainerItem />
                </>
            )}
        </Region>
    );
};

import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `42_dynamic_widget_grid_xml` (layout "dynamic_widget_grid", 1011x771) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DynamicWidgetGridLayoutProps {
    itemsWidgetlistFromtop?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayout = ({ itemsWidgetlistFromtop, layout }: DynamicWidgetGridLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1011, height: 771, ...layout }}>
            <Region
                name="dynamic_widget_grid_container"
                params={147472}
                layout={{ position: 'absolute', left: 170, width: 1011, top: 0, height: 771 }}
            >
                <Region
                    name="widgetlist_fromtop"
                    params={16}
                    layout={{ position: 'absolute', left: 86, width: 925, top: 4, height: 767, flexDirection: 'column', gap: 10 }}
                >
                    {itemsWidgetlistFromtop ?? (
                        <>
                            <DynamicWidgetGridLayoutWidgetSlot1Item />
                            <DynamicWidgetGridLayoutCenterSlotsContainerItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `widget_slot_1` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot1ItemProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot1Item = ({ layout }: DynamicWidgetGridLayoutWidgetSlot1ItemProps) => {
    return (
        <Region
            name="widget_slot_1"
            params={147472}
            layout={{ width: 800, height: 75, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_2` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot2ItemProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot2Item = ({ layout }: DynamicWidgetGridLayoutWidgetSlot2ItemProps) => {
    return (
        <Region
            name="widget_slot_2"
            params={147472}
            layout={{ width: 500, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_4` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4ItemProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot4Item = ({ layout }: DynamicWidgetGridLayoutWidgetSlot4ItemProps) => {
    return (
        <Region
            name="widget_slot_4"
            params={147472}
            layout={{ width: 500, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_4_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4RootItemProps {
    itemsWidgetSlot4Root?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot4RootItem = ({ itemsWidgetSlot4Root, layout }: DynamicWidgetGridLayoutWidgetSlot4RootItemProps) => {
    return (
        <Region
            name="widget_slot_4_root"
            params={16}
            layout={{ width: 500, height: 1, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsWidgetSlot4Root ?? (
                <DynamicWidgetGridLayoutWidgetSlot4Item />
            )}
        </Region>
    );
};

/** Row template `widget_slots_center_left` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlotsCenterLeftItemProps {
    itemsWidgetSlotsCenterLeft?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem = ({ itemsWidgetSlotsCenterLeft, layout }: DynamicWidgetGridLayoutWidgetSlotsCenterLeftItemProps) => {
    return (
        <Region
            name="widget_slots_center_left"
            params={147472}
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

/** Row template `widget_slot_3` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot3ItemProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot3Item = ({ layout }: DynamicWidgetGridLayoutWidgetSlot3ItemProps) => {
    return (
        <Region
            name="widget_slot_3"
            params={147472}
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_5` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5ItemProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot5Item = ({ layout }: DynamicWidgetGridLayoutWidgetSlot5ItemProps) => {
    return (
        <Region
            name="widget_slot_5"
            params={147472}
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_5_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5RootItemProps {
    itemsWidgetSlot5Root?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlot5RootItem = ({ itemsWidgetSlot5Root, layout }: DynamicWidgetGridLayoutWidgetSlot5RootItemProps) => {
    return (
        <Region
            name="widget_slot_5_root"
            params={16}
            layout={{ width: 250, height: 1, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsWidgetSlot5Root ?? (
                <DynamicWidgetGridLayoutWidgetSlot5Item />
            )}
        </Region>
    );
};

/** Row template `widget_slots_right` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlotsRightItemProps {
    itemsWidgetSlotsCenterRight?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutWidgetSlotsRightItem = ({ itemsWidgetSlotsCenterRight, layout }: DynamicWidgetGridLayoutWidgetSlotsRightItemProps) => {
    return (
        <Region
            name="widget_slots_right"
            params={147472}
            layout={{ width: 250, height: 52, flexShrink: 0, maxWidth: 250, ...layout }}
        >
            <Region
                name="widget_slots_center_right"
                params={4341776}
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 50 }}
            >
                {itemsWidgetSlotsCenterRight ?? (
                    <>
                        <DynamicWidgetGridLayoutWidgetSlot3Item />
                        <DynamicWidgetGridLayoutWidgetSlot5RootItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `center_slots_container` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutCenterSlotsContainerItemProps {
    itemsWidgetSlotsCenterScrollable?: ReactNode;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayoutCenterSlotsContainerItem = ({ itemsWidgetSlotsCenterScrollable, layout }: DynamicWidgetGridLayoutCenterSlotsContainerItemProps) => {
    return (
        <Region
            name="center_slots_container"
            params={147472}
            layout={{ width: 800, height: 682, flexShrink: 0, ...layout }}
        >
            <Region
                name="widget_slots_center_scrollable"
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 800, top: 1, height: 681, flexDirection: 'row', gap: 50 }}
            >
                {itemsWidgetSlotsCenterScrollable ?? (
                    <>
                        <DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem />
                        <DynamicWidgetGridLayoutWidgetSlotsRightItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

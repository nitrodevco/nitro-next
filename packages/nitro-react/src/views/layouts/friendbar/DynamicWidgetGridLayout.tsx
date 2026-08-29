import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `42_dynamic_widget_grid_xml` (layout "dynamic_widget_grid", 1011x771) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DynamicWidgetGridLayoutProps {
    dynamicWidgetGridContainer?: DynamicWidgetGridLayoutDynamicWidgetGridContainerProps;
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayout = ({ dynamicWidgetGridContainer, layout }: DynamicWidgetGridLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1011, height: 771, ...layout }}>
            <DynamicWidgetGridLayoutDynamicWidgetGridContainer {...dynamicWidgetGridContainer} />
        </Region>
    );
};

/** Row template `widget_slot_1` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot1ItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot1Item = ({ layout, tags }: DynamicWidgetGridLayoutWidgetSlot1ItemProps) => {
    return (
        <Region
            name="widget_slot_1"
            tags={tags}
            layout={{ width: 800, height: 75, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_2` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot2ItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot2Item = ({ layout, tags }: DynamicWidgetGridLayoutWidgetSlot2ItemProps) => {
    return (
        <Region
            name="widget_slot_2"
            tags={tags}
            layout={{ width: 500, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_4` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4ItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot4Item = ({ layout, tags }: DynamicWidgetGridLayoutWidgetSlot4ItemProps) => {
    return (
        <Region
            name="widget_slot_4"
            tags={tags}
            layout={{ width: 500, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_4_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot4RootItemProps {
    itemsWidgetSlot4Root?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot4RootItem = ({ itemsWidgetSlot4Root, layout, tags }: DynamicWidgetGridLayoutWidgetSlot4RootItemProps) => {
    return (
        <Region
            name="widget_slot_4_root"
            tags={tags}
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
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterLeftItem = ({ itemsWidgetSlotsCenterLeft, layout, tags }: DynamicWidgetGridLayoutWidgetSlotsCenterLeftItemProps) => {
    return (
        <Region
            name="widget_slots_center_left"
            tags={tags}
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
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot3Item = ({ layout, tags }: DynamicWidgetGridLayoutWidgetSlot3ItemProps) => {
    return (
        <Region
            name="widget_slot_3"
            tags={tags}
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_5` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5ItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot5Item = ({ layout, tags }: DynamicWidgetGridLayoutWidgetSlot5ItemProps) => {
    return (
        <Region
            name="widget_slot_5"
            tags={tags}
            layout={{ width: 250, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `widget_slot_5_root` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlot5RootItemProps {
    itemsWidgetSlot5Root?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlot5RootItem = ({ itemsWidgetSlot5Root, layout, tags }: DynamicWidgetGridLayoutWidgetSlot5RootItemProps) => {
    return (
        <Region
            name="widget_slot_5_root"
            tags={tags}
            layout={{ width: 250, height: 1, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsWidgetSlot5Root ?? (
                <DynamicWidgetGridLayoutWidgetSlot5Item />
            )}
        </Region>
    );
};

/** Named region `widget_slots_center_right` of DynamicWidgetGridLayout - configured through the parent's `widgetSlotsCenterRight` prop. */
export interface DynamicWidgetGridLayoutWidgetSlotsCenterRightProps {
    itemsWidgetSlotsCenterRight?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterRight = ({ itemsWidgetSlotsCenterRight, layout, tags }: DynamicWidgetGridLayoutWidgetSlotsCenterRightProps) => {
    return (
        <Region
            name="widget_slots_center_right"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 50, ...layout }}
        >
            {itemsWidgetSlotsCenterRight ?? (
                <>
                    <DynamicWidgetGridLayoutWidgetSlot3Item />
                    <DynamicWidgetGridLayoutWidgetSlot5RootItem />
                </>
            )}
        </Region>
    );
};

/** Row template `widget_slots_right` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutWidgetSlotsRightItemProps {
    layout?: BoxLayout;
    tags?: string[];
    widgetSlotsCenterRight?: DynamicWidgetGridLayoutWidgetSlotsCenterRightProps;
}

export const DynamicWidgetGridLayoutWidgetSlotsRightItem = ({ layout, tags, widgetSlotsCenterRight }: DynamicWidgetGridLayoutWidgetSlotsRightItemProps) => {
    return (
        <Region
            name="widget_slots_right"
            tags={tags}
            layout={{ width: 250, height: 52, flexShrink: 0, maxWidth: 250, ...layout }}
        >
            <DynamicWidgetGridLayoutWidgetSlotsCenterRight {...widgetSlotsCenterRight} />
        </Region>
    );
};

/** Named region `widget_slots_center_scrollable` of DynamicWidgetGridLayout - configured through the parent's `widgetSlotsCenterScrollable` prop. */
export interface DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps {
    itemsWidgetSlotsCenterScrollable?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetSlotsCenterScrollable = ({ itemsWidgetSlotsCenterScrollable, layout, tags }: DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps) => {
    return (
        <Region
            name="widget_slots_center_scrollable"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 800, top: 1, height: 681, flexDirection: 'row', gap: 50, ...layout }}
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

/** Row template `center_slots_container` of DynamicWidgetGridLayout - pass real rows through its `items…` slot. */
export interface DynamicWidgetGridLayoutCenterSlotsContainerItemProps {
    layout?: BoxLayout;
    tags?: string[];
    widgetSlotsCenterScrollable?: DynamicWidgetGridLayoutWidgetSlotsCenterScrollableProps;
}

export const DynamicWidgetGridLayoutCenterSlotsContainerItem = ({ layout, tags, widgetSlotsCenterScrollable }: DynamicWidgetGridLayoutCenterSlotsContainerItemProps) => {
    return (
        <Region
            name="center_slots_container"
            tags={tags}
            layout={{ width: 800, height: 682, flexShrink: 0, ...layout }}
        >
            <DynamicWidgetGridLayoutWidgetSlotsCenterScrollable {...widgetSlotsCenterScrollable} />
        </Region>
    );
};

/** Named region `widgetlist_fromtop` of DynamicWidgetGridLayout - configured through the parent's `widgetlistFromtop` prop. */
export interface DynamicWidgetGridLayoutWidgetlistFromtopProps {
    itemsWidgetlistFromtop?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const DynamicWidgetGridLayoutWidgetlistFromtop = ({ itemsWidgetlistFromtop, layout, tags }: DynamicWidgetGridLayoutWidgetlistFromtopProps) => {
    return (
        <Region
            name="widgetlist_fromtop"
            tags={tags}
            layout={{ position: 'absolute', left: 86, width: 925, top: 4, height: 767, flexDirection: 'column', gap: 10, ...layout }}
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

/** Named region `dynamic_widget_grid_container` of DynamicWidgetGridLayout - configured through the parent's `dynamicWidgetGridContainer` prop. */
export interface DynamicWidgetGridLayoutDynamicWidgetGridContainerProps {
    layout?: BoxLayout;
    tags?: string[];
    widgetlistFromtop?: DynamicWidgetGridLayoutWidgetlistFromtopProps;
}

export const DynamicWidgetGridLayoutDynamicWidgetGridContainer = ({ layout, tags, widgetlistFromtop }: DynamicWidgetGridLayoutDynamicWidgetGridContainerProps) => {
    return (
        <Region
            name="dynamic_widget_grid_container"
            tags={tags}
            layout={{ position: 'absolute', left: 170, width: 1011, top: 0, height: 771, ...layout }}
        >
            <DynamicWidgetGridLayoutWidgetlistFromtop {...widgetlistFromtop} />
        </Region>
    );
};

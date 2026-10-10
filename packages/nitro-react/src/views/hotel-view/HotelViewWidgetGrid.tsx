/**
 * `DynamicLayoutManager`: `dynamic_widget_grid`, built in the reception's
 * `placeholder_dynamic_widget_slots` place - the five widget slots. Slot 1 runs across the top;
 * under it, a left column (slots 2 and 4, the left pane's width) and a right one (slots 3 and 5, the
 * right pane's), laid out by the layout's item lists. Each slot's widget is added to its
 * `widget_slot_<n>` (`WidgetContainer.refresh`), which takes the widget's size; every time the window
 * resizes or a slot changes size, `applyVerticalSize` lays them out again:
 *
 * - an empty slot 1 takes no height, an empty slot 2-5 one pixel (`clearEmptySlotsForSpace`);
 * - slots 2 and 3 are made as tall as each other (unless `landing.view.dynamic.slot.5.ignore`),
 *   and so are 4 and 5, so the two columns' rows line up (`alignTopWidgetRow` / `alignBottomWidgetRow`);
 * - the gaps start at their largest - 80 under slot 1, 50 between the rows, 60 between the columns
 *   (`resetToMaximumSpacing`) - and then give way to the room there is: the list is the window's
 *   height less 55 (never under 360, never over the layout's 767) and its width less 247 (never over
 *   925). Under slot 1 the gap is always 10 afterwards; between the rows it shrinks by however far
 *   the content overflows, down to 10 (`setVerticalSpacing`); between the columns it shrinks by
 *   however much narrower the list is, down to 10 (`setHorizontalSpacing`);
 * - the column container is cut to the taller column (`contractCenterContainer`). The list's
 *   `resize_on_item_update` passes that change on to its own height, and the list clips what it
 *   holds, so in a short window the bottom row is cut off at the list's end, as in Flash.
 *
 * A slot is occupied when its widget has a container - here, when the type is one the port draws
 * (`PORTED_LANDING_VIEW_WIDGETS`); a slot naming any other type stays empty, where Flash would have
 * shown that widget. `enableSeparator` puts a `dynamic_widget_grid_separator` over slot 4 or 5 when
 * the hotel turns it on (`landing.view.dynamic.slot.4/5.separator`), titled with its `.title` key.
 *
 * The widgets are the port's own views, drawn into their slots; each reports its size, which the
 * slot is given as `resize_to_accommodate_children` would give it.
 */
import { useCallback, useState } from 'react';

import { hotelViewColorableBindings, hotelViewCommonSettings, hotelViewPaneWidths, hotelViewProperty, hotelViewSlotWidget, PORTED_LANDING_VIEW_WIDGETS, useConfigData } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { findTemplateChild, Template, TemplateItem, TemplateWindows } from '#base/theme';

import { HotelViewMeasuredSlot, HotelViewSlotSize } from './HotelViewMeasuredSlot';
import { HotelViewSlotWidget } from './HotelViewSlotWidget';
import { hotelViewTemplate } from './hotelViewTemplate';

/** `widgetlist_fromtop`'s size in the layout: `topItemListInitialWidth` / `Height`. */
const LIST_WIDTH = 925;
const LIST_HEIGHT = 767;
/** `ABSOLUTE_MINIMUM_HEIGHT`. */
const LIST_MIN_HEIGHT = 360;
/** The reception layout's own size, which `resizeDynamicLayout` subtracts the desktop's from. */
const LAYOUT_WIDTH = 1172;
const LAYOUT_HEIGHT = 822;

/** `DynamicLayoutManager`'s spacings: the least and the most, top list, row and column gaps. */
const TOP_SPACING_MIN = 10;
const TOP_SPACING_MAX = 80;
const ROW_SPACING_MIN = 10;
const ROW_SPACING_MAX = 50;
const COLUMN_SPACING_MIN = 10;
const COLUMN_SPACING_MAX = 60;

const SLOTS = [ 1, 2, 3, 4, 5 ] as const;

export interface HotelViewWidgetGrid {
    /** `dynamic_widget_grid`, to go where the reception's placeholder is. */
    item: TemplateItem;
    /** `DynamicLayoutManager`'s sizing, once the reception is built and sized to the desktop. */
    arrange: (windows: TemplateWindows) => void;
}

export const useHotelViewWidgetGrid = (templates: Readonly<Record<string, Template>> | undefined): HotelViewWidgetGrid | undefined => {
    const config = useConfigData();
    const { width, height } = useViewportSize();
    const [ sizes, setSizes ] = useState<Record<number, HotelViewSlotSize>>({});
    // Stable, so a slot reports its size when it changes rather than on every render of the grid.
    const onSize = useCallback((slot: number, size: HotelViewSlotSize) => setSizes(previous => (((previous[slot]?.width === size.width) && (previous[slot]?.height === size.height)) ? previous : { ...previous, [slot]: size })), []);
    const grid = hotelViewTemplate(templates, 'dynamic_widget_grid');
    const separatorTemplate = hotelViewTemplate(templates, 'dynamic_widget_grid_separator');

    if (!grid || !separatorTemplate) return undefined;

    const settings = hotelViewCommonSettings(config);
    const panes = hotelViewPaneWidths(config);
    const configString = (key: string) => hotelViewProperty(config, key);
    const configBoolean = (key: string) => configString(key) === 'true';
    const widgetType = (slot: number) => hotelViewSlotWidget(config, slot);
    const occupied = (slot: number) => PORTED_LANDING_VIEW_WIDGETS.has(widgetType(slot));
    const ignoreBottomRight = configBoolean('landing.view.dynamic.slot.5.ignore');
    const separator = (slot: number) => (configBoolean(`landing.view.dynamic.slot.${slot}.separator`) ? configString(`landing.view.dynamic.slot.${slot}.title`) : undefined);

    // `resizeDynamicLayout`'s sizes for `resizeTo`: the list's, less what the desktop is smaller than the layout.
    const listWidth = LIST_WIDTH - (LAYOUT_WIDTH - width);
    const listHeight = LIST_HEIGHT - (LAYOUT_HEIGHT - height);

    const slotBinding = (slot: number) => ({
        children: occupied(slot) && (
            <HotelViewMeasuredSlot
                slot={slot}
                onSize={onSize}
            >
                <HotelViewSlotWidget
                    type={widgetType(slot)}
                    slot={slot}
                    code={null}
                    settings={settings}
                />
            </HotelViewMeasuredSlot>
        ),
    });

    /** `enableSeparator`: the separator cloned in at the top of the slot's root list, its title the key. */
    const separatedRoot = (slot: 4 | 5, title: string | undefined) => {
        const slotElement = findTemplateChild(grid.elements, `widget_slot_${slot}`);

        if (!title || !slotElement) return { [`widget_slot_${slot}`]: slotBinding(slot) };

        return {
            [`widget_slot_${slot}_root`]: {
                items: [
                    { key: 'separator', from: separatorTemplate, bindings: hotelViewColorableBindings(settings, [ 'separator_title' ], { separator_title: { caption: `\${${title}}` } }) },
                    { key: `widget_slot_${slot}`, from: slotElement, bindings: { '': slotBinding(slot) } },
                ],
            },
        };
    };

    const item: TemplateItem = {
        key: 'dynamic_widget_grid',
        from: grid,
        bindings: {
            widget_slot_1: slotBinding(1),
            widget_slot_2: slotBinding(2),
            widget_slot_3: slotBinding(3),
            ...separatedRoot(4, separator(4)),
            ...separatedRoot(5, separator(5)),
        },
    };

    const arrange = ({ find }: TemplateWindows) => {
        const list = find('widgetlist_fromtop');
        const center = find('center_slots_container');
        const columns = find('widget_slots_center_scrollable');
        const left = find('widget_slots_center_left');
        const rightPane = find('widget_slots_right');
        const right = find('widget_slots_center_right');
        const slotWindow = (slot: number) => find(`widget_slot_${slot}`);

        if (!list || !center || !columns || !left || !rightPane || !right) return;

        // The constructor: each column the width of its pane.
        left.setWidth(panes.left);
        left.maxWidth = panes.left;
        find('widget_slot_4_root')?.setWidth(panes.left);
        right.setWidth(panes.right);
        rightPane.setWidth(panes.right);
        rightPane.maxWidth = panes.right;
        find('widget_slot_5_root')?.setWidth(panes.right);
        columns.arrangeListItems();

        // `WidgetContainer.refresh`: each widget added to its slot, which takes the widget's size.
        for (const slot of SLOTS) {
            const size = sizes[slot];
            const window = slotWindow(slot);

            if (occupied(slot) && size && window) window.setRectangle(window.x, window.y, size.width, size.height);
        }

        // `resizeTo`.
        list.setHeight(Math.max(LIST_MIN_HEIGHT, Math.min(listHeight, LIST_HEIGHT)));
        list.setWidth(Math.min(listWidth, LIST_WIDTH));

        // `applyVerticalSize`: `clearEmptySlotsForSpace`.
        for (const slot of SLOTS) {
            if (!occupied(slot)) slotWindow(slot)?.setHeight((slot === 1) ? 0 : 1);
        }

        // `alignTopWidgetRow` / `alignBottomWidgetRow`: the row's slots as tall as each other, an occupied one its pane's width.
        const alignRow = (first: number, second: number, alignHeights: boolean) => {
            const a = slotWindow(first);
            const b = slotWindow(second);

            if (!a || !b || (!occupied(first) && !occupied(second))) return;

            if (alignHeights) {
                const rowHeight = Math.max(a.height, b.height);

                a.setHeight(rowHeight);
                b.setHeight(rowHeight);
            }

            if (occupied(first)) a.setWidth(panes.left);
            if (occupied(second)) b.setWidth(panes.right);
        };

        alignRow(2, 3, !ignoreBottomRight);
        alignRow(4, 5, true);

        // `resetToMaximumSpacing`.
        columns.setSpacing(COLUMN_SPACING_MAX);
        left.setSpacing(ROW_SPACING_MAX);
        right.setSpacing(ROW_SPACING_MAX);
        list.setSpacing(TOP_SPACING_MAX);

        // `setVerticalSpacing(topItemListContentHeight - list height)`: the gap under slot 1 at its
        // least, and the rows' gap shrinking by however far the content overflows.
        const top = slotWindow(1);
        const contentHeight = (top?.height ?? 0) + TOP_SPACING_MAX + center.height;
        const overflow = (contentHeight - list.height) + ROW_SPACING_MIN + TOP_SPACING_MIN;
        const rowSpacing = (overflow <= 0) ? ROW_SPACING_MAX : (overflow < (ROW_SPACING_MAX - ROW_SPACING_MIN)) ? (ROW_SPACING_MAX - overflow) : ROW_SPACING_MIN;

        list.setSpacing(TOP_SPACING_MIN);
        left.setSpacing(rowSpacing);
        right.setSpacing(rowSpacing);

        // `contractCenterContainer`.
        const columnsHeight = Math.max(left.height, right.height);

        columns.setHeight(columnsHeight);
        center.setHeight(columnsHeight);

        // `setHorizontalSpacing`: the columns' gap shrinking by however much narrower the list is.
        const narrowedBy = LIST_WIDTH - list.width;

        columns.setSpacing((narrowedBy > (COLUMN_SPACING_MAX - COLUMN_SPACING_MIN)) ? COLUMN_SPACING_MIN : Math.min(COLUMN_SPACING_MAX, COLUMN_SPACING_MAX - narrowedBy));
    };

    return { item, arrange };
};

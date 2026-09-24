import { ReactNode } from 'react';

import { CatalogPage, CatalogWidgetId } from '#base/context/catalog';
import { Region, RegionProps } from '#base/theme';

import { CATALOG_WIDGET_VIEWS } from './CatalogPageRegistry';

interface CatalogWidgetSlotProps {
    page: CatalogPage;
    /** The container's `name` in the layout - the widget it hosts. */
    name: CatalogWidgetId;
    /** The container's `tags` (`EMBEDDED`, `FIXED`, `NO_GIFT_OPTION`, ...), which the widget reads. */
    tags?: readonly string[];
    /** The container's rect and anchoring in the layout. */
    layout: RegionProps['layout'];
    /** The container's `visible` (a layout can hide one until its page shows it - `default_3x3_color_grouping`'s colour grid). */
    visible?: boolean;
    /** The widget containers nested in this one - handed to the widget, which draws them (`CatalogWidgetProps.children`). */
    children?: ReactNode;
}

const NO_TAGS: readonly string[] = [];

/**
 * A widget container of a page layout - the element `CatalogPage.createWidget` finds by name and
 * gives a widget. The slot draws the container at its layout rect and mounts the widget the
 * registry has for the name inside it; with none (a widget the port has not got yet) it stays an
 * empty container, which is what Flash shows for a widget whose `init()` fails.
 *
 * The container is no mouse target of its own (`params="16"`, no `input_event_processor`), so it is
 * `pointerTransparent`: a laid-out box is still a hit target, and the slots a layout lists after the
 * purchase widget and over it - `default_3x3`'s `soldLtdItemsWidget` and `builderWidget` cover the
 * whole of it - took every press on the buy and gift buttons, drawn or not.
 */
export const CatalogWidgetSlot = ({ page, name, tags = NO_TAGS, layout, visible = true, children }: CatalogWidgetSlotProps) => {
    const Widget = CATALOG_WIDGET_VIEWS[name];

    return (
        <Region
            name={name}
            visible={visible}
            layout={layout}
            pointerTransparent
        >
            {Widget && (
                <Widget
                    page={page}
                    tags={tags}
                >
                    {children}
                </Widget>
            )}
        </Region>
    );
};

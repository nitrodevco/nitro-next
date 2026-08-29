import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutWidgetlistFromtop, DynamicWidgetGridLayoutWidgetlistFromtopProps } from './DynamicWidgetGridLayoutWidgetlistFromtop';

/** Named region `dynamic_widget_grid_container` of DynamicWidgetGridLayout - configured through the parent's `dynamicWidgetGridContainer` prop. */
export interface DynamicWidgetGridLayoutDynamicWidgetGridContainerProps {
    layout?: BoxLayout;
    widgetlistFromtop?: DynamicWidgetGridLayoutWidgetlistFromtopProps;
}

export const DynamicWidgetGridLayoutDynamicWidgetGridContainer = ({ layout, widgetlistFromtop }: DynamicWidgetGridLayoutDynamicWidgetGridContainerProps) => {
    return (
        <Region
            name="dynamic_widget_grid_container"
            layout={{ position: 'absolute', left: 170, width: 1011, top: 0, bottom: 0, ...layout }}
        >
            <DynamicWidgetGridLayoutWidgetlistFromtop {...widgetlistFromtop} />
        </Region>
    );
};

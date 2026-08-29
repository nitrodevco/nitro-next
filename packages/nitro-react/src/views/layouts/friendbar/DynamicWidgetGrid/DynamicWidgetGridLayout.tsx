import { BoxLayout, Region } from '#base/theme';

import { DynamicWidgetGridLayoutDynamicWidgetGridContainer, DynamicWidgetGridLayoutDynamicWidgetGridContainerProps } from './DynamicWidgetGridLayoutDynamicWidgetGridContainer';

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

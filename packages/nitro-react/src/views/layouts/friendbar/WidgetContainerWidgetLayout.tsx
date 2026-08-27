import { BoxLayout, Region } from '#base/theme';

/** Generated from `47_widget_container_widget_xml` (layout "widget_container_widget", 250x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WidgetContainerWidgetLayoutProps {
    layout?: BoxLayout;
}

export const WidgetContainerWidgetLayout = ({ layout }: WidgetContainerWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 30, ...layout }}>
            <Region
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 30 }}
            />
        </Region>
    );
};

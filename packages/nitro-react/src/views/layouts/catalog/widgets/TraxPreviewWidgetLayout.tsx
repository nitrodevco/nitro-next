import { BoxLayout, Region } from '#base/theme';
import { TraxPreviewWidget, TraxPreviewWidgetProps } from '#base/views/layouts/catalog/widgets/TraxPreviewWidget';

/** Generated from `1678_traxPreviewWidget_xml` (layout "traxPreviewWidget", 150x47) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TraxPreviewWidgetLayoutProps {
    layout?: BoxLayout;
    traxPreviewWidget?: TraxPreviewWidgetProps;
}

export const TraxPreviewWidgetLayout = ({ layout, traxPreviewWidget }: TraxPreviewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 150, height: 47, ...layout }}>
            <TraxPreviewWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...traxPreviewWidget}
            />
        </Region>
    );
};

import { BoxLayout, Region } from '#base/theme';
import { SingleViewWidget, SingleViewWidgetProps } from '#base/views/layouts/catalog/widgets/SingleViewWidget';

/** Generated from `1598_singleViewWidget_xml` (layout "singleViewWidget", 158x207) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SingleViewWidgetLayoutProps {
    layout?: BoxLayout;
    singleViewWidget?: SingleViewWidgetProps;
}

export const SingleViewWidgetLayout = ({ layout, singleViewWidget }: SingleViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 158, height: 207, ...layout }}>
            <SingleViewWidget
                layout={{ position: 'absolute', left: 174, width: 158, top: 154, height: 207 }}
                {...singleViewWidget}
            />
        </Region>
    );
};

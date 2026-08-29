import { BoxLayout, Region } from '#base/theme';
import { AddOnBadgeViewWidget3, AddOnBadgeViewWidget3Props } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget3';

/** Generated from `1664_addOnBadgeViewWidget_xml` (layout "addOnBadgeViewWidget", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddOnBadgeViewWidgetLayoutProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidget3Props;
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidgetLayout = ({ addOnBadgeViewWidget, layout }: AddOnBadgeViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <AddOnBadgeViewWidget3
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                {...addOnBadgeViewWidget}
            />
        </Region>
    );
};

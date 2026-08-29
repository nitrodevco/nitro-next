import { BoxLayout, Region } from '#base/theme';
import { AddOnBadgeViewWidget2, AddOnBadgeViewWidget2Props } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget2';

/** Generated from `1664_addOnBadgeViewWidget_xml` (layout "addOnBadgeViewWidget", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddOnBadgeViewWidgetLayoutProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidget2Props;
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidgetLayout = ({ addOnBadgeViewWidget, layout }: AddOnBadgeViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <AddOnBadgeViewWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...addOnBadgeViewWidget}
            />
        </Region>
    );
};

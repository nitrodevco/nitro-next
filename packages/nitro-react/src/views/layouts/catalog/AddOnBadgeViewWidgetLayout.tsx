import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1664_addOnBadgeViewWidget_xml` (layout "addOnBadgeViewWidget", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddOnBadgeViewWidgetLayoutProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetLayoutAddOnBadgeViewWidgetProps;
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidgetLayout = ({ addOnBadgeViewWidget, layout }: AddOnBadgeViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <AddOnBadgeViewWidgetLayoutAddOnBadgeViewWidget {...addOnBadgeViewWidget} />
        </Region>
    );
};

/** Named region `addOnBadgeViewWidget` of AddOnBadgeViewWidgetLayout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface AddOnBadgeViewWidgetLayoutAddOnBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidgetLayoutAddOnBadgeViewWidget = ({ layout }: AddOnBadgeViewWidgetLayoutAddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="badge"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            />
        </Region>
    );
};

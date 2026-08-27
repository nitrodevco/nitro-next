import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1664_addOnBadgeViewWidget_xml` (layout "addOnBadgeViewWidget", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddOnBadgeViewWidgetLayoutProps {
    layout?: BoxLayout;
}

export const AddOnBadgeViewWidgetLayout = ({ layout }: AddOnBadgeViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="addOnBadgeViewWidget"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
            </Region>
        </Region>
    );
};

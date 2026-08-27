import { Border, BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1533_badgeGridItem_xml` (layout "badgeGridItem", 44x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeGridItemLayoutProps {
    layout?: BoxLayout;
}

export const BadgeGridItemLayout = ({ layout }: BadgeGridItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 44, height: 44, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 44 }}
            >
                <Border
                    variant="2"
                    name="bg"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 44 }}
                >
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badgeWidget"
                        params={16}
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 2, width: 40, top: 2, height: 40 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};

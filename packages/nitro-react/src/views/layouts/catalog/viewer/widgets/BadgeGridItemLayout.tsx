import { ReactNode } from 'react';

import { Border, BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1533_badgeGridItem_xml` (layout "badgeGridItem", 44x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeGridItemLayoutProps {
    badgeWidget?: ReactNode;
    layout?: BoxLayout;
}

export const BadgeGridItemLayout = ({ badgeWidget, layout }: BadgeGridItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 44, height: 44, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="2"
                    name="bg"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badgeWidget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        {badgeWidget}
                    </WidgetSlot>
                </Border>
            </Region>
        </Region>
    );
};

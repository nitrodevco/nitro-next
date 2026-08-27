import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1696_guildBadgeViewWidget_xml` (layout "guildBadgeViewWidget", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildBadgeViewWidgetLayoutProps {
    layout?: BoxLayout;
}

export const GuildBadgeViewWidgetLayout = ({ layout }: GuildBadgeViewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <WidgetSlot
                widgetType="badge_image"
                name="badge"
                options={{ 'badge_image:type': 'group' }}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            />
        </Region>
    );
};

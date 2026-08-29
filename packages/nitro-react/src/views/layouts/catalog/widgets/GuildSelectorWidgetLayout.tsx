import { BoxLayout, Region } from '#base/theme';
import { GuildSelectorWidget2, GuildSelectorWidget2Props } from '#base/views/layouts/catalog/widgets/GuildSelectorWidget2';

/** Generated from `1594_guildSelectorWidget_xml` (layout "guildSelectorWidget", 170x85) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetLayoutProps {
    guildSelectorWidget?: GuildSelectorWidget2Props;
    layout?: BoxLayout;
}

export const GuildSelectorWidgetLayout = ({ guildSelectorWidget, layout }: GuildSelectorWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 170, height: 85, ...layout }}>
            <GuildSelectorWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...guildSelectorWidget}
            />
        </Region>
    );
};

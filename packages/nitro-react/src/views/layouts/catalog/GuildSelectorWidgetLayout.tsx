import { BoxLayout, Region } from '#base/theme';
import { GuildSelectorWidget3, GuildSelectorWidget3Props } from '#base/views/layouts/catalog/widgets/GuildSelectorWidget3';

/** Generated from `1594_guildSelectorWidget_xml` (layout "guildSelectorWidget", 170x85) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetLayoutProps {
    guildSelectorWidget?: GuildSelectorWidget3Props;
    layout?: BoxLayout;
}

export const GuildSelectorWidgetLayout = ({ guildSelectorWidget, layout }: GuildSelectorWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 170, height: 85, ...layout }}>
            <GuildSelectorWidget3
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 85 }}
                {...guildSelectorWidget}
            />
        </Region>
    );
};

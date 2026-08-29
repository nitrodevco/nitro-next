import { BoxLayout, Region } from '#base/theme';
import { GuildSelectorWidgetLayout, GuildSelectorWidgetLayoutProps } from '#base/views/layouts/catalog/GuildSelectorWidgetLayout';

/**
 * Catalog widget `guildSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildCustomFurni_1680Layout); each passes its own placement through `layout`.
 */
export type GuildSelectorWidgetProps = Omit<GuildSelectorWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const GuildSelectorWidget = ({ layout, ...widget }: GuildSelectorWidgetProps) => {
    return (
        <Region
            name="guildSelectorWidget"
            params={1040}
            layout={{ position: 'absolute', ...layout }}
        >
            <GuildSelectorWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

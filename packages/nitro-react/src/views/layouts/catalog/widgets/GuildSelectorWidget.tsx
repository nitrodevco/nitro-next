import { BoxLayout, Region } from '#base/theme';
import { GuildSelectorWidgetLayout, GuildSelectorWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/GuildSelectorWidgetLayout';

/**
 * Catalog widget `guildSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 2 pages
 * (LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout); each passes its own placement through `layout`.
 */
export type GuildSelectorWidgetProps = Omit<GuildSelectorWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const GuildSelectorWidget = ({ layout, tags, ...widget }: GuildSelectorWidgetProps) => {
    return (
        <Region
            name="guildSelectorWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <GuildSelectorWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

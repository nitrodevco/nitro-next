import { BoxLayout, Region } from '#base/theme';
import { GuildBadgeViewWidgetLayout, GuildBadgeViewWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/GuildBadgeViewWidgetLayout';

/**
 * Catalog widget `guildBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 3 pages
 * (LayoutGuildCustomFurni_1586Layout, LayoutGuildCustomFurni_1680Layout, LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
export type GuildBadgeViewWidgetProps = Omit<GuildBadgeViewWidgetLayoutProps, 'layout' | 'tags'> & { layout?: BoxLayout; tags?: string[] };

export const GuildBadgeViewWidget = ({ layout, tags, ...widget }: GuildBadgeViewWidgetProps) => {
    return (
        <Region
            name="guildBadgeViewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <GuildBadgeViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

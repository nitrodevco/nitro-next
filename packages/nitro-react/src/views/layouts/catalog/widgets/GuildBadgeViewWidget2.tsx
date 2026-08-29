import { BoxLayout, Region } from '#base/theme';
import { GuildBadgeViewWidgetLayout, GuildBadgeViewWidgetLayoutProps } from '#base/views/layouts/catalog/GuildBadgeViewWidgetLayout';

/**
 * Catalog widget `guildBadgeViewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
export type GuildBadgeViewWidget2Props = Omit<GuildBadgeViewWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const GuildBadgeViewWidget2 = ({ layout, ...widget }: GuildBadgeViewWidget2Props) => {
    return (
        <Region
            name="guildBadgeViewWidget"
            params={1024}
            layout={{ position: 'absolute', ...layout }}
        >
            <GuildBadgeViewWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};

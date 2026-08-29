import { BoxLayout, Region } from '#base/theme';

/**
 * Catalog widget `guildForumSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
/** Named region `guildForumSelectorWidget` of GuildForumSelectorWidget - configured through the parent's `guildForumSelectorWidget` prop. */
export interface GuildForumSelectorWidgetProps {
    layout?: BoxLayout;
}

export const GuildForumSelectorWidget = ({ layout }: GuildForumSelectorWidgetProps) => {
    return (
        <Region
            name="guildForumSelectorWidget"
            params={1040}
            layout={{ position: 'absolute', ...layout }}
        />
    );
};

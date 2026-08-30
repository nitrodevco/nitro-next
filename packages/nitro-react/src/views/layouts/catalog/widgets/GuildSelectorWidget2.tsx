import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Droplist, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `guildSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (GuildSelectorWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `guildSelectorWidget` of GuildSelectorWidget2 - configured through the parent's `guildSelectorWidget` prop. */
export interface GuildSelectorWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
    onFindGroupsButton?: () => void;
}

export const GuildSelectorWidget2 = ({ layout, onFindGroupsButton }: GuildSelectorWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="guildSelectorWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Droplist
                variant="3"
                name="guild_selector"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
            />
            <Border
                variant="2"
                name="members_only"
                tintColor="#5ea1ab"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('catalog.guild_selector.members_only')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 147 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 7, width: 147, top: 7, height: 46 }}
                />
                <Button
                    variant="3"
                    name="find_groups_button"
                    onPointerTap={onFindGroupsButton}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 210, bottom: 5, height: 25 }}
                >
                    {t('catalog.guild_selector.find_groups')}
                </Button>
            </Border>
        </Region>
    );
};

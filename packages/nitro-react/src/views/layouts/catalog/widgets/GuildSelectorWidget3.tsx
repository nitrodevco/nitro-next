import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Droplist, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `guildSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (GuildSelectorWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `guildSelectorWidget` of GuildSelectorWidget3 - configured through the parent's `guildSelectorWidget` prop. */
export interface GuildSelectorWidget3Props {
    layout?: BoxLayout;
    onFindGroupsButton?: () => void;
}

export const GuildSelectorWidget3 = ({ layout, onFindGroupsButton }: GuildSelectorWidget3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="guildSelectorWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <Droplist
                variant="3"
                name="guild_selector"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 26 }}
            />
            <Border
                variant="2"
                name="members_only"
                params={16}
                tintColor="#5ea1ab"
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 85, justifyContent: 'center' }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 147, top: 7, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.guild_selector.members_only')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 147 }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="find_groups_button"
                    params={917521}
                    onPointerTap={onFindGroupsButton}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 210, top: 55, height: 25 }}
                >
                    {t('catalog.guild_selector.find_groups')}
                </Button>
            </Border>
        </Region>
    );
};

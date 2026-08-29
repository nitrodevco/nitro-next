import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Droplist, Region, ThemeText } from '#base/theme';

/** Generated from `1594_guildSelectorWidget_xml` (layout "guildSelectorWidget", 170x85) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetLayoutProps {
    guildSelectorWidget?: GuildSelectorWidgetLayoutGuildSelectorWidgetProps;
    layout?: BoxLayout;
}

export const GuildSelectorWidgetLayout = ({ guildSelectorWidget, layout }: GuildSelectorWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 170, height: 85, ...layout }}>
            <GuildSelectorWidgetLayoutGuildSelectorWidget {...guildSelectorWidget} />
        </Region>
    );
};

/** Named region `guildSelectorWidget` of GuildSelectorWidgetLayout - configured through the parent's `guildSelectorWidget` prop. */
export interface GuildSelectorWidgetLayoutGuildSelectorWidgetProps {
    layout?: BoxLayout;
    onFindGroupsButton?: () => void;
}

export const GuildSelectorWidgetLayoutGuildSelectorWidget = ({ layout, onFindGroupsButton }: GuildSelectorWidgetLayoutGuildSelectorWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guildSelectorWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 85, ...layout }}
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

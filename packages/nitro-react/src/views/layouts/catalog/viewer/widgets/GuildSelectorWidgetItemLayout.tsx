import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1699_guild_selector_widget_item_xml` (layout "guild_selector_widget_item", 133x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetItemLayoutProps {
    guildItem?: GuildSelectorWidgetItemLayoutGuildItemProps;
    layout?: BoxLayout;
}

export const GuildSelectorWidgetItemLayout = ({ guildItem, layout }: GuildSelectorWidgetItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 133, height: 22, ...layout }}>
            <GuildSelectorWidgetItemLayoutGuildItem {...guildItem} />
        </Region>
    );
};

/** Named region `guild_item` of GuildSelectorWidgetItemLayout - configured through the parent's `guildItem` prop. */
export interface GuildSelectorWidgetItemLayoutGuildItemProps {
    captionGuildName?: string;
    layout?: BoxLayout;
    srcGuildColors?: string;
}

export const GuildSelectorWidgetItemLayoutGuildItem = ({ captionGuildName, layout, srcGuildColors }: GuildSelectorWidgetItemLayoutGuildItemProps) => {
    return (
        <Region
            name="guild_item"
            layout={{ position: 'absolute', left: 0, width: 133, top: 0, height: 22, ...layout }}
        >
            <Region
                name="guild_name"
                layout={{ position: 'absolute', left: 0, width: 72, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionGuildName ?? 'lorem ipsum'} />
            </Region>
            <ThemeImage
                name="guild_colors"
                src={srcGuildColors}
                layout={{ position: 'absolute', left: 112, width: 21, top: 4, height: 14 }}
            />
        </Region>
    );
};

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1699_guild_selector_widget_item_xml` (layout "guild_selector_widget_item", 133x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetItemLayoutProps {
    captionGuildName?: string;
    layout?: BoxLayout;
    srcGuildColors?: string;
}

export const GuildSelectorWidgetItemLayout = ({ captionGuildName, layout, srcGuildColors }: GuildSelectorWidgetItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 133, height: 22, ...layout }}>
            <Region
                name="guild_item"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 133, top: 0, height: 22 }}
            >
                <Region
                    name="guild_name"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 72, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionGuildName ?? 'lorem ipsum'} />
                </Region>
                <ThemeImage
                    name="guild_colors"
                    params={16}
                    src={srcGuildColors}
                    layout={{ position: 'absolute', left: 112, width: 21, top: 4, height: 14 }}
                />
            </Region>
        </Region>
    );
};

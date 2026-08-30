import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1699_guild_selector_widget_item_xml` (layout "guild_selector_widget_item", 133x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildSelectorWidgetItemLayoutProps {
    captionGuildName?: string;
    layout?: BoxLayout;
    srcGuildColors?: string;
    tintGuildColors?: string;
}

export const GuildSelectorWidgetItemLayout = ({ captionGuildName, layout, srcGuildColors, tintGuildColors }: GuildSelectorWidgetItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 133, height: 22, ...layout }}>
            <Region
                name="guild_item"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionGuildName ?? 'lorem ipsum'}
                    name="guild_name"
                    layout={{ position: 'absolute', left: 0, width: 72, top: 4, bottom: 1 }}
                />
                <ThemeImage
                    name="guild_colors"
                    src={srcGuildColors}
                    tint={tintGuildColors}
                    layout={{ position: 'absolute', right: 0, width: 21, top: 4, height: 14 }}
                />
            </Region>
        </Region>
    );
};

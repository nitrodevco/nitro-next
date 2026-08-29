import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `3005_guild_info_xml` (layout "iro_tag", 230x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildInfoLayoutProps {
    guildInfo?: GuildInfoLayoutGuildInfoProps;
    layout?: BoxLayout;
}

export const GuildInfoLayout = ({ guildInfo, layout }: GuildInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 230, height: 49, ...layout }}>
            <GuildInfoLayoutGuildInfo {...guildInfo} />
        </Region>
    );
};

/** Named region `guild_info` of GuildInfoLayout - configured through the parent's `guildInfo` prop. */
export interface GuildInfoLayoutGuildInfoProps {
    captionGuildBaseTxt?: string;
    layout?: BoxLayout;
    onGuildInfo?: () => void;
}

export const GuildInfoLayoutGuildInfo = ({ captionGuildBaseTxt, layout, onGuildInfo }: GuildInfoLayoutGuildInfoProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_info"
            onPointerTap={onGuildInfo}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 49, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="guild_badge"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 0, width: 39, top: 5, height: 39 }}
            />
            <Region
                name="guild_base_txt"
                layout={{ position: 'absolute', left: 45, width: 170, top: 1, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGuildBaseTxt ?? t('navigator.guildbase')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        </Region>
    );
};

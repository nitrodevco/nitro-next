import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `guild_badge` of BadgeEditorLayout - configured through the parent's `guildBadge` prop. */
export interface BadgeEditorLayoutGuildBadgeProps {
    captionGuildBadge?: string;
    layout?: BoxLayout;
    srcLayer0?: string;
    srcLayer1?: string;
    srcLayer2?: string;
    srcLayer3?: string;
    srcLayer4?: string;
    tintLayer0?: string;
    tintLayer1?: string;
    tintLayer2?: string;
    tintLayer3?: string;
    tintLayer4?: string;
}

export const BadgeEditorLayoutGuildBadge = ({ captionGuildBadge, layout, srcLayer0, srcLayer1, srcLayer2, srcLayer3, srcLayer4, tintLayer0, tintLayer1, tintLayer2, tintLayer3, tintLayer4 }: BadgeEditorLayoutGuildBadgeProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_badge"
            layout={{ position: 'absolute', left: 0, width: 128, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionGuildBadge ?? t('group.edit.badge.badge')}
                textStyle="text-style-u-bold"
                name="guild_badge"
                layout={{ position: 'absolute', left: 25, width: 71, top: 8, height: 17 }}
            />
            <Border
                variant="0"
                name="border"
                layout={{ position: 'absolute', left: 17, width: 94, top: 29, height: 94 }}
            >
                <Border
                    variant="3"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                />
                <ThemeImage
                    name="layer_0"
                    src={srcLayer0}
                    tint={tintLayer0}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_1"
                    src={srcLayer1}
                    tint={tintLayer1}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_2"
                    src={srcLayer2}
                    tint={tintLayer2}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_3"
                    src={srcLayer3}
                    tint={tintLayer3}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_4"
                    src={srcLayer4}
                    tint={tintLayer4}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
            </Border>
        </Region>
    );
};

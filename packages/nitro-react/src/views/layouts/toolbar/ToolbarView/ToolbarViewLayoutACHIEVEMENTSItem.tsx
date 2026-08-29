import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `ACHIEVEMENTS` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutACHIEVEMENTSItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onACHIEVEMENTS?: () => void;
    srcIconsToolbarAchievements?: string;
    visibleBgAchievements?: boolean;
    visibleIconsToolbarAchievements?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutACHIEVEMENTSItem = ({ captionText, layout, onACHIEVEMENTS, srcIconsToolbarAchievements, visibleBgAchievements, visibleIconsToolbarAchievements, visibleText }: ToolbarViewLayoutACHIEVEMENTSItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ACHIEVEMENTS"
            onPointerTap={onACHIEVEMENTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleBgAchievements ?? true) && (
                <Border
                    variant="2"
                    name="bg_achievements"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    {(visibleIconsToolbarAchievements ?? true) && (
                        <ThemeImage
                            name="icons_toolbar_achievements"
                            src={srcIconsToolbarAchievements ?? layoutImage('icons_toolbar_achievements_normal.png')}
                            layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                        />
                    )}
                </Border>
            )}
            {(visibleText ?? true) && (
                <Region
                    name="text"
                    layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.achievements')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            )}
        </Region>
    );
};

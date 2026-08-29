import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_achievements` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonAchievementsItemProps {
    captionTextSettings?: string;
    layout?: BoxLayout;
    onButtonAchievements?: () => void;
    visibleTextSettings?: boolean;
}

export const RoomToolsToolbarLayoutButtonAchievementsItem = ({ captionTextSettings, layout, onButtonAchievements, visibleTextSettings }: RoomToolsToolbarLayoutButtonAchievementsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_achievements"
            tooltip={t('room.settings.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonAchievements}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
            <ThemeImage
                src={layoutImage('roomtools_achievements.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            {(visibleTextSettings ?? true) && (
                <Region
                    name="text_settings"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextSettings ?? t('room.achievements.button.text')}
                        textOptions={{ fill: '#cccccc' }}
                    />
                </Region>
            )}
        </Region>
    );
};

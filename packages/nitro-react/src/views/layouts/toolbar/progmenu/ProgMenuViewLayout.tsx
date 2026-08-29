import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1239_prog_menu_view_xml` (layout "prog_menu_view", 362x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProgMenuViewLayoutProps {
    captionFieldText?: string;
    captionFieldText2?: string;
    captionFieldText3?: string;
    captionFieldText4?: string;
    captionFieldText5?: string;
    layout?: BoxLayout;
    onAchievements?: () => void;
    onDailytasks?: () => void;
    onIntroduction?: () => void;
    onLeaderboards?: () => void;
    onQuests?: () => void;
    srcAchievementsIconColor?: string;
    srcAchievementsIconGrey?: string;
    srcDailytasksIconColor?: string;
    srcDailytasksIconGrey?: string;
    srcIntroductionIconColor?: string;
    srcIntroductionIconGrey?: string;
    srcLeaderboardsIconColor?: string;
    srcLeaderboardsIconGrey?: string;
    srcQuestsIconColor?: string;
    srcQuestsIconGrey?: string;
}

export const ProgMenuViewLayout = ({ captionFieldText, captionFieldText2, captionFieldText3, captionFieldText4, captionFieldText5, layout, onAchievements, onDailytasks, onIntroduction, onLeaderboards, onQuests, srcAchievementsIconColor, srcAchievementsIconGrey, srcDailytasksIconColor, srcDailytasksIconGrey, srcIntroductionIconColor, srcIntroductionIconGrey, srcLeaderboardsIconColor, srcLeaderboardsIconGrey, srcQuestsIconColor, srcQuestsIconGrey }: ProgMenuViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 53, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}>
                    <Region layout={{ position: 'absolute', left: 3, width: 359, top: 3, height: 50 }}>
                        <Region
                            name="dailytasks"
                            onPointerTap={onDailytasks}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 12, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="dailytasks_icon_color"
                                src={srcDailytasksIconColor ?? layoutImage('prog_menu_daily_tasks.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText ?? t('widget.progmenu.dailytasks')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="dailytasks_icon_grey"
                                src={srcDailytasksIconGrey ?? layoutImage('prog_menu_daily_tasks.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="quests"
                            onPointerTap={onQuests}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 80, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="quests_icon_color"
                                src={srcQuestsIconColor ?? layoutImage('prog_menu_quests.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText2 ?? t('widget.progmenu.quests')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="quests_icon_grey"
                                src={srcQuestsIconGrey ?? layoutImage('prog_menu_quests.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="achievements"
                            onPointerTap={onAchievements}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 148, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="achievements_icon_color"
                                src={srcAchievementsIconColor ?? layoutImage('me_menu_me_achv.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText3 ?? t('widget.progmenu.achievements')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="achievements_icon_grey"
                                src={srcAchievementsIconGrey ?? layoutImage('me_menu_me_achv.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="leaderboards"
                            onPointerTap={onLeaderboards}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 216, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="leaderboards_icon_color"
                                src={srcLeaderboardsIconColor ?? layoutImage('prog_menu_leaderboards.png')}
                                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText4 ?? t('widget.progmenu.leaderboards')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="leaderboards_icon_grey"
                                src={srcLeaderboardsIconGrey ?? layoutImage('prog_menu_leaderboards.png')}
                                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
                            />
                        </Region>
                        <Region
                            name="introduction"
                            onPointerTap={onIntroduction}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 284, width: 60, top: 2, height: 48, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                name="introduction_icon_color"
                                src={srcIntroductionIconColor ?? layoutImage('prog_menu_introduction.png')}
                                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
                            />
                            <Region
                                name="field_text"
                                layout={{ position: 'absolute', width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionFieldText5 ?? t('widget.progmenu.introduction')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="introduction_icon_grey"
                                src={srcIntroductionIconGrey ?? layoutImage('prog_menu_introduction.png')}
                                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
                            />
                        </Region>
                        <Region
                            name="spacer"
                            layout={{ position: 'absolute', left: 352, width: 7, top: 2, height: 30 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

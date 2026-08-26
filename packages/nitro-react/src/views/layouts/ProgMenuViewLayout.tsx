import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1239_prog_menu_view_xml` (layout "prog_menu_view", 362x53) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProgMenuViewLayoutProps {
    layout?: BoxLayout;
}

export const ProgMenuViewLayout = ({ layout }: ProgMenuViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 53, ...layout }}>
            <Border
                variant="6"
                name="buttons"
                params={147457}
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}
            >
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 53 }}
                >
                    <Region
                        params={147472}
                        layout={{ position: 'absolute', left: 3, width: 359, top: 3, height: 50 }}
                    >
                        <Region
                            name="dailytasks"
                            params={17}
                            layout={{ position: 'absolute', left: 12, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="dailytasks_icon_color"
                                params={16}
                                src={layoutImage('prog_menu_daily_tasks.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: 0, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('widget.progmenu.dailytasks')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="dailytasks_icon_grey"
                                params={16}
                                src={layoutImage('prog_menu_daily_tasks.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="quests"
                            params={17}
                            layout={{ position: 'absolute', left: 80, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="quests_icon_color"
                                params={16}
                                src={layoutImage('prog_menu_quests.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: 0, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('widget.progmenu.quests')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="quests_icon_grey"
                                params={16}
                                src={layoutImage('prog_menu_quests.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="achievements"
                            params={17}
                            layout={{ position: 'absolute', left: 148, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="achievements_icon_color"
                                params={16}
                                src={layoutImage('me_menu_me_achv.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: 0, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('widget.progmenu.achievements')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="achievements_icon_grey"
                                params={16}
                                src={layoutImage('me_menu_me_achv.png')}
                                layout={{ position: 'absolute', left: 14, width: 32, top: 0, height: 30 }}
                            />
                        </Region>
                        <Region
                            name="leaderboards"
                            params={17}
                            layout={{ position: 'absolute', left: 216, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="leaderboards_icon_color"
                                params={16}
                                src={layoutImage('prog_menu_leaderboards.png')}
                                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: 0, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('widget.progmenu.leaderboards')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="leaderboards_icon_grey"
                                params={16}
                                src={layoutImage('prog_menu_leaderboards.png')}
                                layout={{ position: 'absolute', left: 17, width: 25, top: 4, height: 25 }}
                            />
                        </Region>
                        <Region
                            name="introduction"
                            params={17}
                            layout={{ position: 'absolute', left: 284, width: 60, top: 2, height: 48 }}
                        >
                            <ThemeImage
                                name="introduction_icon_color"
                                params={16}
                                src={layoutImage('prog_menu_introduction.png')}
                                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
                            />
                            <Region
                                name="field_text"
                                params={786640}
                                layout={{ position: 'absolute', left: 0, width: 60, top: 32, height: 14, maxWidth: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('widget.progmenu.introduction')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="introduction_icon_grey"
                                params={16}
                                src={layoutImage('prog_menu_introduction.png')}
                                layout={{ position: 'absolute', left: 14, width: 33, top: 0, height: 32 }}
                            />
                        </Region>
                        <Region
                            name="spacer"
                            params={16}
                            layout={{ position: 'absolute', left: 352, width: 7, top: 2, height: 30 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

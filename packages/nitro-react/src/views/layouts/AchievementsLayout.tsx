import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `130_Achievements_xml` (layout "Achievements", 389x297) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AchievementsLayout = ({ layout, onClose }: AchievementsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="quest_main_window"
            name="quest_main_window"
            tags={[ 'FIT:achievements' ]}
            params={32769}
            caption={t('inventory.achievements')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 389, height: 297, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="categories_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 19, width: 371, top: 0, height: 10 }}
                />
                <Region
                    name="categories_footer_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 389, top: 0, height: 37 }}
                >
                    <Region
                        name="achievement_score_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 5, width: 379, top: 23, height: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('achievements.categories.score')}
                            textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 379, align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="achievements_header_cont"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 389, top: 0, height: 75 }}
                >
                    <Region
                        params={2192}
                        backgroundColor="#8899a2"
                        layout={{ position: 'absolute', left: 1, width: 387, top: 0, height: 75 }}
                    />
                    <Region
                        params={16}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 387, top: 74, height: 1 }}
                    />
                    <ThemeImage
                        name="category_pic_bitmap"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 297, width: 84, top: 3, height: 72 }}
                    />
                    <Region
                        name="category_name_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 78, width: 286, top: 13, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Category Name Placeholder"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 286 }}
                        />
                    </Region>
                    <Region
                        name="category_progress_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 78, width: 245, top: 40, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('achievements.details.categoryprogress')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 245 }}
                        />
                    </Region>
                    <Region
                        name="back_button"
                        params={147473}
                        layout={{ position: 'absolute', left: 14, width: 33, top: 21, height: 34 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_back.png')}
                            layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="achievements_list"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 367, top: 0, height: 100, minWidth: 367, maxHeight: 245 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 367, top: 0, height: 10, maxHeight: 245 }}
                    >
                        <Region
                            name="achievements_scrollarea"
                            params={16}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Region
                                name="achievements_cont"
                                params={16}
                                layout={{ width: 367, height: 10, flexShrink: 0 }}
                            />
                        </Region>
                    </ScrollArea>
                </Region>
                <Border
                    variant="0"
                    name="achievement_cont"
                    params={144}
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 15, width: 360, top: 0, height: 129 }}
                >
                    <Region
                        name="achievement_name_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 114, width: 238, top: 18, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Achievement Name Placeholder"
                            textOptions={{ wordWrap: true, wordWrapWidth: 238 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="badge_image"
                        name="achievement_pic_bitmap"
                        params={16}
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                        layout={{ position: 'absolute', left: 10, width: 85, top: 12, height: 85 }}
                    />
                    <Region
                        name="achievement_desc_txt"
                        params={129}
                        layout={{ position: 'absolute', left: 114, width: 238, top: 34, height: 47, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Achievement Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g"
                            textOptions={{ wordWrap: true, wordWrapWidth: 238 }}
                        />
                    </Region>
                    <Region
                        name="reward_caption_txt"
                        params={1040}
                        layout={{ position: 'absolute', left: 113, width: 162, top: 74, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('achievements.details.reward')} />
                    </Region>
                    <Region
                        name="reward_amount_txt"
                        params={1040}
                        layout={{ position: 'absolute', left: 164, width: 23, top: 74, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="200" />
                    </Region>
                    <Icon
                        variant="0"
                        name="currency_icon"
                        params={1040}
                        layout={{ position: 'absolute', left: 183, width: 23, top: 70, height: 26 }}
                    />
                    <Region
                        name="level_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 4, width: 95, top: 97, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('achievements.details.level')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

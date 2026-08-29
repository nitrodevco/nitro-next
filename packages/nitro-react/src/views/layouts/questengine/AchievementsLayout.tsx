import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `130_Achievements_xml` (layout "Achievements", 389x297) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsLayoutProps {
    achievementsHeaderCont?: AchievementsLayoutAchievementsHeaderContProps;
    captionAchievementDescTxt?: string;
    captionAchievementNameTxt?: string;
    captionAchievementScoreTxt?: string;
    captionLevelTxt?: string;
    captionRewardAmountTxt?: string;
    captionRewardCaptionTxt?: string;
    itemsAchievementsScrollarea?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AchievementsLayout = ({ achievementsHeaderCont, captionAchievementDescTxt, captionAchievementNameTxt, captionAchievementScoreTxt, captionLevelTxt, captionRewardAmountTxt, captionRewardCaptionTxt, itemsAchievementsScrollarea, layout, onClose }: AchievementsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="quest_main_window"
            name="quest_main_window"
            caption={t('inventory.achievements')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 389, height: 297, ...layout }}
        >
            <Region
                name="categories_cont"
                layout={{ position: 'absolute', left: 19, right: -1, top: 0, height: 10 }}
            />
            <Region
                name="categories_footer_cont"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37 }}
            >
                <Region
                    name="achievement_score_txt"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 23, height: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionAchievementScoreTxt ?? t('achievements.categories.score')}
                        textOptions={{ fill: '#444444', wordWrap: true, wordWrapWidth: 379, align: 'center' }}
                    />
                </Region>
            </Region>
            <AchievementsLayoutAchievementsHeaderCont {...achievementsHeaderCont} />
            <Region
                name="achievements_list"
                layout={{ position: 'absolute', left: 10, width: 367, top: 0, height: 100, minWidth: 367, maxHeight: 245 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 367, top: 0, height: 10, maxHeight: 245 }}
                >
                    <Region
                        name="achievements_scrollarea"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsAchievementsScrollarea ?? (
                            <AchievementsLayoutAchievementsContItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for achievements_scrollarea - rendered by that list's ScrollArea */}
            </Region>
            <Border
                variant="0"
                name="achievement_cont"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 15, right: 14, top: 0, height: 129 }}
            >
                <Region
                    name="achievement_name_txt"
                    layout={{ position: 'absolute', left: 114, right: 8, top: 18, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementNameTxt ?? 'Achievement Name Placeholder'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 238 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="badge_image"
                    name="achievement_pic_bitmap"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', left: 10, width: 85, top: 12, height: 85 }}
                />
                <Region
                    name="achievement_desc_txt"
                    layout={{ position: 'absolute', left: 114, right: 8, top: 34, height: 47, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAchievementDescTxt ?? 'Achievement Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 238 }}
                    />
                </Region>
                <Region
                    name="reward_caption_txt"
                    layout={{ position: 'absolute', left: 113, width: 162, bottom: 38, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRewardCaptionTxt ?? t('achievements.details.reward')}
                </Region>
                <Region
                    name="reward_amount_txt"
                    layout={{ position: 'absolute', left: 164, width: 23, bottom: 38, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRewardAmountTxt ?? '200'}
                </Region>
                <Icon
                    variant="0"
                    name="currency_icon"
                    layout={{ position: 'absolute', left: 183, width: 23, bottom: 33, height: 26 }}
                />
                <Region
                    name="level_txt"
                    layout={{ position: 'absolute', left: 4, width: 95, top: 97, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLevelTxt ?? t('achievements.details.level')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
        </Frame>
    );
};

/** Named region `achievements_header_cont` of AchievementsLayout - configured through the parent's `achievementsHeaderCont` prop. */
export interface AchievementsLayoutAchievementsHeaderContProps {
    captionCategoryNameTxt?: string;
    captionCategoryProgressTxt?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    srcCategoryPicBitmap?: string;
}

export const AchievementsLayoutAchievementsHeaderCont = ({ captionCategoryNameTxt, captionCategoryProgressTxt, layout, onBackButton, srcCategoryPicBitmap }: AchievementsLayoutAchievementsHeaderContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_header_cont"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 75, ...layout }}
        >
            <Region
                backgroundColor="#8899a2"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 0 }}
            />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 387, top: 74, height: 1 }}
            />
            <ThemeImage
                name="category_pic_bitmap"
                src={srcCategoryPicBitmap}
                layout={{ position: 'absolute', left: 297, width: 84, top: 3, height: 72 }}
            />
            <Region
                name="category_name_txt"
                layout={{ position: 'absolute', left: 78, right: 25, top: 13, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCategoryNameTxt ?? 'Category Name Placeholder'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 286 }}
                />
            </Region>
            <Region
                name="category_progress_txt"
                layout={{ position: 'absolute', left: 78, right: 66, top: 40, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCategoryProgressTxt ?? t('achievements.details.categoryprogress')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 245 }}
                />
            </Region>
            <Region
                name="back_button"
                onPointerTap={onBackButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 14, width: 33, top: 21, height: 34 }}
            >
                <ThemeImage
                    src={layoutImage('icons_back.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `achievements_cont` of AchievementsLayout - pass real rows through its `items…` slot. */
export interface AchievementsLayoutAchievementsContItemProps {
    layout?: BoxLayout;
}

export const AchievementsLayoutAchievementsContItem = ({ layout }: AchievementsLayoutAchievementsContItemProps) => {
    return (
        <Region
            name="achievements_cont"
            layout={{ width: 367, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

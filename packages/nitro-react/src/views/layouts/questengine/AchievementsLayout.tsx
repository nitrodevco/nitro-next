import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `130_Achievements_xml` (layout "Achievements", 389x297) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsLayoutProps {
    achievementsHeaderCont?: AchievementsLayoutAchievementsHeaderContProps;
    achievementsList?: AchievementsLayoutAchievementsListProps;
    captionAchievementDescTxt?: string;
    captionAchievementNameTxt?: string;
    captionLevelTxt?: string;
    captionRewardAmountTxt?: string;
    captionRewardCaptionTxt?: string;
    categoriesCont?: AchievementsLayoutCategoriesContProps;
    categoriesFooterCont?: AchievementsLayoutCategoriesFooterContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AchievementsLayout = ({ achievementsHeaderCont, achievementsList, captionAchievementDescTxt, captionAchievementNameTxt, captionLevelTxt, captionRewardAmountTxt, captionRewardCaptionTxt, categoriesCont, categoriesFooterCont, layout, onClose }: AchievementsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="quest_main_window"
            name="quest_main_window"
            tags={[ 'FIT:achievements' ]}
            caption={t('inventory.achievements')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 389, height: 297, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <AchievementsLayoutCategoriesCont {...categoriesCont} />
                <AchievementsLayoutCategoriesFooterCont {...categoriesFooterCont} />
                <AchievementsLayoutAchievementsHeaderCont {...achievementsHeaderCont} />
                <AchievementsLayoutAchievementsList {...achievementsList} />
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
                        <ThemeText text={captionRewardCaptionTxt ?? t('achievements.details.reward')} />
                    </Region>
                    <Region
                        name="reward_amount_txt"
                        layout={{ position: 'absolute', left: 164, width: 23, bottom: 38, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionRewardAmountTxt ?? '200'} />
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
            </Region>
        </Frame>
    );
};

/** Named region `categories_cont` of AchievementsLayout - configured through the parent's `categoriesCont` prop. */
export interface AchievementsLayoutCategoriesContProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsLayoutCategoriesCont = ({ layout, tags }: AchievementsLayoutCategoriesContProps) => {
    return (
        <Region
            name="categories_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 19, right: -1, top: 0, height: 10, ...layout }}
        />
    );
};

/** Named region `categories_footer_cont` of AchievementsLayout - configured through the parent's `categoriesFooterCont` prop. */
export interface AchievementsLayoutCategoriesFooterContProps {
    captionAchievementScoreTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsLayoutCategoriesFooterCont = ({ captionAchievementScoreTxt, layout, tags }: AchievementsLayoutCategoriesFooterContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="categories_footer_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37, ...layout }}
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
    );
};

/** Named region `back_button` of AchievementsLayout - configured through the parent's `backButton` prop. */
export interface AchievementsLayoutBackButtonProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    tags?: string[];
}

export const AchievementsLayoutBackButton = ({ layout, onBackButton, tags }: AchievementsLayoutBackButtonProps) => {
    return (
        <Region
            name="back_button"
            tags={tags}
            onPointerTap={onBackButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 14, width: 33, top: 21, height: 34, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_back.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
            />
        </Region>
    );
};

/** Named region `achievements_header_cont` of AchievementsLayout - configured through the parent's `achievementsHeaderCont` prop. */
export interface AchievementsLayoutAchievementsHeaderContProps {
    backButton?: AchievementsLayoutBackButtonProps;
    captionCategoryNameTxt?: string;
    captionCategoryProgressTxt?: string;
    layout?: BoxLayout;
    srcCategoryPicBitmap?: string;
    tags?: string[];
}

export const AchievementsLayoutAchievementsHeaderCont = ({ backButton, captionCategoryNameTxt, captionCategoryProgressTxt, layout, srcCategoryPicBitmap, tags }: AchievementsLayoutAchievementsHeaderContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_header_cont"
            tags={tags}
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
            <AchievementsLayoutBackButton {...backButton} />
        </Region>
    );
};

/** Row template `achievements_cont` of AchievementsLayout - pass real rows through its `items…` slot. */
export interface AchievementsLayoutAchievementsContItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsLayoutAchievementsContItem = ({ layout, tags }: AchievementsLayoutAchievementsContItemProps) => {
    return (
        <Region
            name="achievements_cont"
            tags={tags}
            layout={{ width: 367, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `achievements_scrollarea` of AchievementsLayout - configured through the parent's `achievementsScrollarea` prop. */
export interface AchievementsLayoutAchievementsScrollareaProps {
    itemsAchievementsScrollarea?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsLayoutAchievementsScrollarea = ({ itemsAchievementsScrollarea, layout, tags }: AchievementsLayoutAchievementsScrollareaProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 367, top: 0, height: 10, maxHeight: 245, ...layout }}
        >
            <Region
                name="achievements_scrollarea"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsAchievementsScrollarea ?? (
                    <AchievementsLayoutAchievementsContItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `achievements_list` of AchievementsLayout - configured through the parent's `achievementsList` prop. */
export interface AchievementsLayoutAchievementsListProps {
    achievementsScrollarea?: AchievementsLayoutAchievementsScrollareaProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsLayoutAchievementsList = ({ achievementsScrollarea, layout, tags }: AchievementsLayoutAchievementsListProps) => {
    return (
        <Region
            name="achievements_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 367, top: 0, height: 100, minWidth: 367, maxHeight: 245, ...layout }}
        >
            <AchievementsLayoutAchievementsScrollarea {...achievementsScrollarea} />
            {/* <scrollbar_vertical> for achievements_scrollarea - rendered by that list's ScrollArea */}
        </Region>
    );
};

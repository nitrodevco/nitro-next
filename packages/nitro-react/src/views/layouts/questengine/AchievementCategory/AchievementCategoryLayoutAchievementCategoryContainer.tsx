import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `achievement_category_container` of AchievementCategoryLayout - configured through the parent's `achievementCategoryContainer` prop. */
export interface AchievementCategoryLayoutAchievementCategoryContainerProps {
    captionCompletionTxt?: string;
    captionHeaderTxt?: string;
    captionUnseenCount?: string;
    categoryRegion?: ReactNode;
    layout?: BoxLayout;
    onCategoryRegion?: () => void;
    srcCategoryBgAct?: string;
    srcCategoryBgActHover?: string;
    srcCategoryBgInact?: string;
    srcCategoryPicBitmap?: string;
    visibleCategoryBgAct?: boolean;
    visibleCategoryBgActHover?: boolean;
    visibleCategoryBgInact?: boolean;
}

export const AchievementCategoryLayoutAchievementCategoryContainer = ({ captionCompletionTxt, captionHeaderTxt, captionUnseenCount, categoryRegion, layout, onCategoryRegion, srcCategoryBgAct, srcCategoryBgActHover, srcCategoryBgInact, srcCategoryPicBitmap, visibleCategoryBgAct, visibleCategoryBgActHover, visibleCategoryBgInact }: AchievementCategoryLayoutAchievementCategoryContainerProps) => {
    return (
        <Region
            name="achievement_category_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {(visibleCategoryBgAct ?? false) && (
                <ThemeImage
                    name="category_bg_act"
                    src={srcCategoryBgAct ?? '${image.library.questing.url}achievement_background_active_1.png'}
                    layout={{ position: 'absolute', left: 0, width: 112, alignSelf: 'center', height: 105 }}
                />
            )}
            {(visibleCategoryBgActHover ?? false) && (
                <ThemeImage
                    name="category_bg_act_hover"
                    src={srcCategoryBgActHover ?? '${image.library.questing.url}achievement_background_active_2.png'}
                    layout={{ position: 'absolute', left: 0, width: 112, alignSelf: 'center', height: 105 }}
                />
            )}
            {(visibleCategoryBgInact ?? false) && (
                <ThemeImage
                    name="category_bg_inact"
                    src={srcCategoryBgInact ?? '${image.library.questing.url}achievement_category_bkg_empty_3.png'}
                    layout={{ position: 'absolute', left: 0, width: 110, alignSelf: 'center', height: 103 }}
                />
            )}
            <Region
                name="hover_container"
                layout={{ position: 'absolute', left: 1, width: 115, top: 1, height: 104, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderTxt ?? 'Decoration'}
                    name="header_txt"
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 65, top: 7, height: 17 }}
                />
                <ThemeImage
                    name="category_pic_bitmap"
                    src={srcCategoryPicBitmap}
                    layout={{ position: 'absolute', left: 12, width: 86, top: 27, height: 72 }}
                />
                <ThemeText
                    text={captionCompletionTxt ?? '1/10'}
                    textOptions={{ fill: '#ffffff' }}
                    name="completion_txt"
                    layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 30, top: 70, height: 14 }}
                />
            </Region>
            <Region
                name="category_region"
                onPointerTap={onCategoryRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 103 }}
            >
                {categoryRegion}
            </Region>
            <Border
                variant="7"
                name="unseen_count_border"
                tintColor="#de4537"
                layout={{ position: 'absolute', right: 23, width: 18, top: 27, height: 20 }}
            >
                <ThemeText
                    text={captionUnseenCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="unseen_count"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Border>
        </Region>
    );
};

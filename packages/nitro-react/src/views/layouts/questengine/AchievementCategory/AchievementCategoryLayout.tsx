import { BoxLayout, Region } from '#base/theme';

import { AchievementCategoryLayoutAchievementCategoryContainer, AchievementCategoryLayoutAchievementCategoryContainerProps } from './AchievementCategoryLayoutAchievementCategoryContainer';

/** Generated from `117_AchievementCategory_xml` (layout "AchievementCategory", 112x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementCategoryLayoutProps {
    achievementCategoryContainer?: AchievementCategoryLayoutAchievementCategoryContainerProps;
    layout?: BoxLayout;
}

export const AchievementCategoryLayout = ({ achievementCategoryContainer, layout }: AchievementCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 112, height: 105, ...layout }}>
            <AchievementCategoryLayoutAchievementCategoryContainer {...achievementCategoryContainer} />
        </Region>
    );
};

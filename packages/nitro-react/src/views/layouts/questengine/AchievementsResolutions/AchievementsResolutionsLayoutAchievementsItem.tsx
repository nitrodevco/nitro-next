import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `achievements` of AchievementsResolutionsLayout - pass real rows through its `items…` slot. */
export interface AchievementsResolutionsLayoutAchievementsItemProps {
    itemsAchievements?: ReactNode;
    layout?: BoxLayout;
}

export const AchievementsResolutionsLayoutAchievementsItem = ({ itemsAchievements, layout }: AchievementsResolutionsLayoutAchievementsItemProps) => {
    return (
        <Region
            name="achievements"
            layout={{ width: 290, height: 230, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 6, ...layout }}
        >
            {itemsAchievements}
        </Region>
    );
};
